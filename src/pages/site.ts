/* Contact details, brand colours and lead-source helpers shared by the
 * landing page and the keyword pages under src/pages/seo/. */

export const IMG = "/landing";
export const PHONE = "+91 84240 34844";
export const TEL = "tel:+918424034844";
export const MAIL = "info@ezzyerp.in";
export const SITE = "https://ezzyerp.in";
// Same wording as the Google Business Profile, so search engines match the two.
export const STREET = "Shop No.2, Mittal Tower, Sector Number 1 Rd, Sector 1, Kopar Khairane";
export const ADDRESS = `${STREET}, Navi Mumbai, Maharashtra 400709`;
export const GOOGLE_PROFILE = "https://share.google/uam8NxEqb6fB6Bhy4";
export const INSTAGRAM = "https://www.instagram.com/ezzyerp/";
export const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
export const WA_NUMBER = "918424034844";
export const WA_TEXT = "Hi, I'm interested in Ezzy ERP. Please share a demo.";
export const waLink = (text = WA_TEXT) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const ORG_ID = `${SITE}/#organization`;

export const NAVY = "#0F172A";
export const ROYAL = "#2563EB";
export const MUTED = "#44536e";
export const SOFT = "#66748c";
export const LINE = "#e6eaf2";
export const PALE = "#f5f7fb";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
export type LeadSource = Partial<Record<(typeof UTM_KEYS)[number] | "referrer" | "landing_page", string>>;

/** Remembers where the visitor came from (first touch in this tab) so the demo request can be attributed. */
export function captureLeadSource(): LeadSource {
  try {
    const saved = sessionStorage.getItem("ezl-source");
    if (saved) return JSON.parse(saved);
    const params = new URLSearchParams(window.location.search);
    const src: LeadSource = {};
    UTM_KEYS.forEach((k) => { const v = params.get(k); if (v) src[k] = v.slice(0, 120); });
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) src.referrer = document.referrer.slice(0, 300);
    src.landing_page = (window.location.pathname + window.location.search).slice(0, 300);
    sessionStorage.setItem("ezl-source", JSON.stringify(src));
    return src;
  } catch {
    return {};
  }
}

/** Sends a conversion event to Google Analytics / Tag Manager when either is installed. */
export function track(event: string, params: Record<string, unknown> = {}) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") w.gtag("event", event, params);
  else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params });
}
