import { useState, type FormEvent } from "react";
import { PHONE, PALE, SOFT, captureLeadSource, track, waLink } from "../site";
import { SAVE_WAIT_MS, saveLead, settleWithin, startWhatsAppChat } from "../leads";
import { SERVICE_PAGES } from "./pages";

/* ------------------------------------------------------------------ *
 * Project enquiry form on the custom development pages
 * (/custom-software-development and friends).
 *
 * It saves to the same demo_requests table as the home page's demo
 * form, with `trade` set to the service ("Custom software", "Mobile
 * app", "E-commerce"), so these leads sit in the same list and can be
 * told apart. Like the demo form it then opens a WhatsApp chat with
 * our number, the details already typed, so an enquiry reaches the
 * team even if the save fails.
 * ------------------------------------------------------------------ */

const NEEDS = [...SERVICE_PAGES.map((page) => page.service!.name), "Not sure yet"];

export default function EnquiryForm({ service }: { service: string }) {
  const [sent, setSent] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [waSent, setWaSent] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (k: string) => String(data.get(k) || "").trim() || null;
    const phone = field("phone");
    const lead = { name: field("name"), phone, shop: field("company"), city: field("city"), trade: field("need"), note: field("note") };
    // Which page or advert brought the visitor (first touch in this tab).
    const src = captureLeadSource();
    setSending(true);
    setFailed(null);

    const waText = [
      "Hi Ezzy ERP, I have a development requirement.",
      `Name: ${lead.name ?? ""}`,
      `Mobile: ${phone ?? ""}`,
      lead.shop && `Company: ${lead.shop}`,
      lead.city && `City: ${lead.city}`,
      lead.trade && `I need: ${lead.trade}`,
      lead.note && `Requirement: ${lead.note}`,
    ].filter(Boolean).join("\n");
    const waUrl = waLink(waText);
    const chat = startWhatsAppChat(waText);

    const finish = (saved: boolean) => {
      setSending(false);
      if (!saved) {
        setFailed(waUrl);
        track("demo_request_failed", { form: "enquiry" });
        return;
      }
      track("generate_lead", { form: "enquiry", trade: lead.trade, ...src });
      setSent(phone || "your number");
      setWaSent(waUrl);
    };

    // Save first, then straight into the WhatsApp chat (whether or not the save worked).
    // A slow save does not hold WhatsApp back: it finishes in the background.
    const saving = saveLead(lead, src);
    const early = await settleWithin(saving, SAVE_WAIT_MS);
    if (early !== null) finish(early);
    chat.go();
    if (early === null) finish(await saving);
  }

  return (
    <form onSubmit={onSubmit} className="ezl-form" style={{ display: "grid", gap: 18, background: PALE, borderRadius: 12, padding: 34 }}>
      <div className="ezl-grid ezl-auto-170">
        <div className="ezl-field"><label htmlFor="eq-name">Your name</label><input className="ezl-input" id="eq-name" maxLength={120} name="name" type="text" required placeholder="Full name" /></div>
        <div className="ezl-field"><label htmlFor="eq-phone">Mobile number</label><input className="ezl-input" id="eq-phone" name="phone" type="tel" required pattern="[0-9+ ]{10,15}" placeholder="10-digit mobile" /></div>
      </div>
      <div className="ezl-grid ezl-auto-170">
        <div className="ezl-field"><label htmlFor="eq-company">Company name</label><input className="ezl-input" id="eq-company" maxLength={160} name="company" type="text" placeholder="Company or firm" /></div>
        <div className="ezl-field"><label htmlFor="eq-city">City</label><input className="ezl-input" id="eq-city" maxLength={80} name="city" type="text" placeholder="City" /></div>
      </div>
      <div className="ezl-field">
        <label htmlFor="eq-need">What do you need?</label>
        <select className="ezl-input" id="eq-need" name="need" defaultValue={service}>
          {NEEDS.map((need) => <option key={need}>{need}</option>)}
        </select>
      </div>
      <div className="ezl-field">
        <label htmlFor="eq-note">Tell us about the requirement</label>
        <textarea className="ezl-input" id="eq-note" maxLength={1500} name="note" rows={3} placeholder="What the software or app should do, and who will use it" style={{ resize: "vertical", minHeight: 84 }} />
      </div>
      <button type="submit" className="ezl-submit" disabled={!!sent || sending}>{sent ? "Thank you — we will call you" : sending ? "Sending…" : "Send my enquiry"}</button>
      {failed ? (
        <p style={{ margin: 0, fontSize: 14, color: "#b42318" }}>
          We could not save your enquiry here. <a href={failed} target="_blank" rel="noopener" style={{ color: "#16A34A", fontWeight: 600 }}>Send it on WhatsApp instead</a> or call {PHONE}.
        </p>
      ) : (
        <p style={{ margin: 0, fontSize: 14, color: sent ? "#1a49b8" : SOFT, minHeight: 20 }}>
          {sent ? `Enquiry noted. Our team will call ${sent}.` : "We use your number only to call you about this enquiry."}
          {!sent && <> <a href="/privacy-policy" style={{ textDecoration: "underline" }}>Privacy policy</a></>}
          {sent && <> WhatsApp did not open? <a href={waSent ?? waLink()} target="_blank" rel="noopener" style={{ color: "#16A34A", fontWeight: 600 }}>Send your enquiry on WhatsApp</a>.</>}
        </p>
      )}
    </form>
  );
}
