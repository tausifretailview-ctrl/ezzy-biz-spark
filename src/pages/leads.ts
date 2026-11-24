/* ------------------------------------------------------------------ *
 * Demo bookings and project enquiries: saving the lead, then taking
 * the visitor straight into a WhatsApp chat with our number, the
 * details already typed. Used by the home page's demo form and the
 * service pages' enquiry form (seo/EnquiryForm.tsx).
 * ------------------------------------------------------------------ */

import { WA_NUMBER, waLink, type LeadSource } from "./site";

export type Lead = {
  name: string | null;
  phone: string | null;
  shop: string | null;
  city: string | null;
  trade: string | null;
  note: string | null;
};

/** Saves the lead with its source. Resolves true when it was stored. */
export async function saveLead(lead: Lead, src: LeadSource): Promise<boolean> {
  try {
    // Loaded on submit so the database client stays out of the page's first download.
    const { supabase } = await import("@/integrations/supabase/client");
    let { error } = await supabase.from("demo_requests").insert({ ...lead, ...src });
    if (error && Object.keys(src).length) {
      // Source columns missing in the database: keep the lead, with its source in the note.
      const tag = Object.entries(src).map(([k, v]) => `${k}=${v}`).join(" ");
      ({ error } = await supabase.from("demo_requests").insert({ ...lead, note: [lead.note, `[${tag}]`].filter(Boolean).join(" ") }));
    }
    if (error) console.error("demo_requests insert failed", error);
    return !error;
  } catch (err) {
    console.error("demo_requests insert failed", err);
    return false;
  }
}

export type WhatsAppPlatform = "android" | "mobile" | "desktop";

/** Android, other phones and tablets (iPhone, iPad), or a computer. */
export function whatsAppPlatform(userAgent: string, maxTouchPoints = 0): WhatsAppPlatform {
  if (/Android/i.test(userAgent)) return "android";
  // iPadOS reports itself as a Mac; the touch screen gives it away.
  if (/iPhone|iPad|iPod|Mobi/i.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1)) return "mobile";
  return "desktop";
}

/**
 * The address that opens a chat with our number, `text` already typed:
 * - Android: an intent link, which opens the WhatsApp (or WhatsApp Business) app itself,
 *   and falls back to wa.me when neither is installed;
 * - iPhone and other phones: wa.me, which iOS hands to the WhatsApp app;
 * - computers: WhatsApp Web's chat screen, instead of wa.me's "Continue to chat" page.
 */
export function whatsAppChatUrl(platform: WhatsAppPlatform, text: string): string {
  const fallback = waLink(text);
  if (platform === "android") {
    return `intent://send?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}#Intent;scheme=whatsapp;S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
  }
  if (platform === "desktop") return `https://web.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}`;
  return fallback;
}

/**
 * Call inside the submit handler, before any await. On a computer it opens the chat's tab now,
 * because browsers block tabs opened later; phones open WhatsApp from this page instead, which
 * is what lets the app open directly rather than WhatsApp's web page.
 * Call `go()` once the lead is saved, within a few seconds of the click: phones only hand a
 * link to an app while the tap is recent.
 */
export function startWhatsAppChat(text: string): { go: () => void } {
  const platform = whatsAppPlatform(navigator.userAgent, navigator.maxTouchPoints || 0);
  const url = whatsAppChatUrl(platform, text);
  const tab = platform === "desktop" ? window.open("", "_blank") : null;
  if (tab) tab.opener = null;
  return {
    go() {
      if (tab && !tab.closed) tab.location.href = url;
      else window.location.href = url;
    },
  };
}

/** How long a submit waits for the save before opening WhatsApp anyway (the save carries on). */
export const SAVE_WAIT_MS = 2500;

/** Resolves with the save's result, or with null if it is still running after `ms`. */
export function settleWithin<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([promise, new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))]);
}
