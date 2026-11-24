import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

/*
 * Work Report (staff daily reports) — the only way in to its tables.
 *
 * The website's database key is public (every visitor's browser has it), so the
 * work_report_users, work_reports and wr_masters tables accept nothing from it
 * (migration 20261124120000_lock_down_public_tables.sql). Everything goes through
 * this function, which uses the service role and checks who is asking:
 *
 * - "login" checks the password and returns a session token (HMAC-signed, 12 hours).
 * - Every other action needs that token, and the server decides from it what the
 *   person may do: employees see and edit only their own reports, admins see all,
 *   and only admins delete reports, add employees or change masters.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const SESSION_HOURS = 12;
const enc = new TextEncoder();
const hex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
const b64url = (s: string) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromB64url = (s: string) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));

/* ---------- passwords ---------- */

// PBKDF2 for passwords set from now on: "pbkdf2$<iterations>$<salt>$<hash>".
const PBKDF2_ITERATIONS = 210_000;

async function pbkdf2(password: string, saltHex: string, iterations: number): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const salt = new Uint8Array(saltHex.match(/../g)!.map((h) => parseInt(h, 16)));
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256));
}

async function hashPassword(password: string): Promise<string> {
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)).buffer);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${salt}$${await pbkdf2(password, salt, PBKDF2_ITERATIONS)}`;
}

function sameText(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Checks a password against either format; `legacy` marks the old salted SHA-256 hashes. */
async function verifyPassword(password: string, stored: string): Promise<{ ok: boolean; legacy: boolean }> {
  if (stored.startsWith("pbkdf2$")) {
    const [, iter, salt, expected] = stored.split("$");
    if (!iter || !salt || !expected) return { ok: false, legacy: false };
    return { ok: sameText(await pbkdf2(password, salt, Number(iter)), expected), legacy: false };
  }
  const [saltHex, expected] = stored.split(":");
  if (!saltHex || !expected) return { ok: false, legacy: true };
  const actual = hex(await crypto.subtle.digest("SHA-256", enc.encode(saltHex + password)));
  return { ok: sameText(actual, expected), legacy: true };
}

/* ---------- session tokens ---------- */

type Session = { uid: string; name: string; role: string; exp: number };

async function hmacKey(): Promise<CryptoKey> {
  // The service role key never leaves the server, so it can sign the sessions too.
  return crypto.subtle.importKey("raw", enc.encode(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function signSession(s: Omit<Session, "exp">): Promise<string> {
  const payload = b64url(JSON.stringify({ ...s, exp: Date.now() + SESSION_HOURS * 3600_000 }));
  const sig = hex(await crypto.subtle.sign("HMAC", await hmacKey(), enc.encode(payload)));
  return `${payload}.${sig}`;
}

async function readSession(token: unknown): Promise<Session | null> {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = hex(await crypto.subtle.sign("HMAC", await hmacKey(), enc.encode(payload)));
  if (!sameText(sig, expected)) return null;
  try {
    const s = JSON.parse(fromB64url(payload)) as Session;
    return s.exp > Date.now() ? s : null;
  } catch {
    return null;
  }
}

/* ---------- data rules ---------- */

const REPORT_FIELDS = [
  "emp_id", "emp_name", "report_date", "task", "status", "priority", "progress", "time_spent", "assigned_senior",
  "client_name", "remarks", "customer_name", "problem_type", "call_type", "time_consumed", "work_status",
] as const;
const MASTER_TYPES = ["customer", "problem_type", "call_type", "status"];

function pickReport(input: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const k of REPORT_FIELDS) if (k in input) out[k] = input[k];
  return out;
}

/** Text for a PostgREST ilike pattern inside or(): commas, brackets and wildcards would change the filter. */
const searchText = (s: unknown) => String(s ?? "").replace(/[,()%*\\"]/g, " ").trim().slice(0, 80);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const body = await req.json();
    const { action } = body;

    if (action === "login") {
      const { user_id, password } = body;
      if (!user_id || !password) return json({ error: "User ID and password are required" }, 400);
      const { data: user } = await db.from("work_report_users").select("*").eq("user_id", user_id).maybeSingle();
      const check = user ? await verifyPassword(password, user.password_hash) : { ok: false, legacy: false };
      if (!user || !check.ok) return json({ error: "Invalid User ID or Password" }, 401);
      // Move old SHA-256 hashes to PBKDF2 as people log in.
      if (check.legacy) await db.from("work_report_users").update({ password_hash: await hashPassword(password) }).eq("id", user.id);
      const token = await signSession({ uid: user.user_id, name: user.name, role: user.role });
      return json({ user: { userId: user.user_id, name: user.name, role: user.role, department: user.department }, token });
    }

    const session = await readSession(body.token);
    const isAdmin = session?.role === "admin";

    if (action === "register") {
      // Only an admin adds employees. The very first account (empty table) may be created without one.
      if (!isAdmin) {
        const { count } = await db.from("work_report_users").select("id", { count: "exact", head: true });
        if ((count ?? 1) > 0) return json({ error: "Only an admin can add employees" }, 403);
      }
      const { user_id, password, name, role, department } = body;
      if (!user_id || !password || !name) return json({ error: "User ID, name, and password are required" }, 400);
      const { error } = await db.from("work_report_users").insert({
        user_id, name, password_hash: await hashPassword(password),
        role: role === "admin" ? "admin" : "employee", department: department || null,
      });
      if (error?.code === "23505") return json({ error: "User ID already exists" }, 409);
      if (error) throw error;
      return json({ success: true }, 201);
    }

    if (!session) return json({ error: "Please log in again" }, 401);

    switch (action) {
      case "list_reports": {
        const f = body.filters ?? {};
        let q = db.from("work_reports").select("*").order("report_date", { ascending: false });
        if (!isAdmin) q = q.eq("emp_id", session.uid);
        if (f.dateFrom) q = q.gte("report_date", f.dateFrom);
        if (f.dateTo) q = q.lte("report_date", f.dateTo);
        if (f.status && f.status !== "All") q = q.eq("status", f.status);
        for (const k of ["priority", "customer_name", "problem_type", "call_type", "work_status"]) if (f[k]) q = q.eq(k, f[k]);
        const s = searchText(f.search);
        if (s) q = q.or(`task.ilike.%${s}%,emp_name.ilike.%${s}%,customer_name.ilike.%${s}%`);
        const { data, error } = await q;
        if (error) throw error;
        return json({ data });
      }

      case "save_report": {
        const report = pickReport(body.report ?? {});
        if (!isAdmin) {
          // Employees file reports under their own name only.
          report.emp_id = session.uid;
          report.emp_name = session.name;
        }
        if (body.id) {
          if (!isAdmin) {
            const { data: existing } = await db.from("work_reports").select("emp_id").eq("id", body.id).maybeSingle();
            if (!existing || existing.emp_id !== session.uid) return json({ error: "You can only edit your own reports" }, 403);
          }
          const { error } = await db.from("work_reports").update(report).eq("id", body.id);
          if (error) throw error;
        } else {
          const { error } = await db.from("work_reports").insert(report);
          if (error) throw error;
        }
        return json({ success: true });
      }

      case "delete_report": {
        if (!isAdmin) return json({ error: "Only an admin can delete reports" }, 403);
        const { error } = await db.from("work_reports").delete().eq("id", body.id);
        if (error) throw error;
        return json({ success: true });
      }

      case "list_users": {
        if (!isAdmin) return json({ error: "Only an admin can see employees" }, 403);
        const { data, error } = await db.from("work_report_users").select("id, user_id, name, role, department, created_at").order("name");
        if (error) throw error;
        return json({ data });
      }

      case "list_masters": {
        let q = db.from("wr_masters").select("*").order("sort_order").order("label");
        if (body.master_type) q = q.eq("master_type", body.master_type);
        if (!body.include_inactive) q = q.eq("is_active", true);
        const { data, error } = await q;
        if (error) throw error;
        return json({ data });
      }

      case "add_master": {
        const m = body.master ?? {};
        // Anyone logged in may add a customer while filing a report; other lists are admin-only.
        if (!MASTER_TYPES.includes(m.master_type) || (!isAdmin && m.master_type !== "customer")) {
          return json({ error: "Only an admin can change this list" }, 403);
        }
        const label = String(m.label ?? "").trim().slice(0, 200);
        if (!label) return json({ error: "Label is required" }, 400);
        const { data, error } = await db.from("wr_masters")
          .insert({ master_type: m.master_type, label, sort_order: Number(m.sort_order) || 0, created_by: session.uid })
          .select().single();
        if (error) throw error;
        return json({ data });
      }

      case "update_master":
      case "delete_master": {
        if (!isAdmin) return json({ error: "Only an admin can change this list" }, 403);
        if (action === "delete_master") {
          const { error } = await db.from("wr_masters").delete().eq("id", body.id);
          if (error) throw error;
        } else {
          const patch: Record<string, unknown> = {};
          if (typeof body.label === "string") patch.label = body.label.trim().slice(0, 200);
          if (typeof body.is_active === "boolean") patch.is_active = body.is_active;
          if (typeof body.sort_order === "number") patch.sort_order = body.sort_order;
          const { error } = await db.from("wr_masters").update(patch).eq("id", body.id);
          if (error) throw error;
        }
        return json({ success: true });
      }
    }

    return json({ error: "Invalid action" }, 400);
  } catch (err) {
    console.error("Error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
