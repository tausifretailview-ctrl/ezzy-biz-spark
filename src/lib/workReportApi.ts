import { supabase } from "@/integrations/supabase/client";

/*
 * Work Report talks to its tables only through the work-report-auth function
 * (supabase/functions/work-report-auth). The function checks the session token
 * it issued at login and decides what each person may see and change.
 */

let sessionToken: string | null = null;

/** Set on login, cleared on logout (WorkReportContext). Kept in memory only, as the user is. */
export function setWorkReportToken(token: string | null) {
  sessionToken = token;
}

/** Calls the function with the session token. Throws with the function's own message on refusal. */
export async function workReportCall<T = unknown>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await supabase.functions.invoke("work-report-auth", {
    body: { action, token: sessionToken, ...payload },
  });
  if (data?.error) throw new Error(data.error);
  if (error) {
    // A refusal arrives as an HTTP error; its body holds the reason.
    const reason = await (error as { context?: Response }).context?.json?.().catch(() => null);
    throw new Error(reason?.error || error.message || "Request failed");
  }
  return data as T;
}
