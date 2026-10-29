import { LOGO, PHONE, TEL, MAIL, ADDRESS, GOOGLE_PROFILE, DIRECTIONS, waLink, NAVY, LINE, track } from "../site";
import { SEO_PAGES } from "./pages";
import { BLOG_PATH } from "../blog/posts";

/* ------------------------------------------------------------------ *
 * Header, footer and floating call/WhatsApp buttons shared by the
 * keyword pages (./SeoPage.tsx) and the blog (../blog/).
 * ------------------------------------------------------------------ */

export function Icon({ name, size, color }: { name: string; size: number; color?: string }) {
  return <i className={`ph-duotone ${name}`} style={{ fontSize: size, color }} aria-hidden="true" />;
}

export function SiteHeader() {
  return (
    <>
      {/* contact strip */}
      <div className="ezl-ct" style={{ background: NAVY, color: "rgba(255,255,255,.86)", fontSize: 13, letterSpacing: ".08em" }}>
        <div className="ezl-wrap" style={{ padding: "9px 24px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name="ph-seal-check" size={16} color="#60A5FA" />
            ISO certified · 2,000+ shops billing on Ezzy ERP
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
            <a href={`mailto:${MAIL}`} className="ezl-ct-mail" style={{ color: "rgba(255,255,255,.86)" }}>{MAIL}</a>
            <a href={TEL} style={{ color: "#fff", fontVariantNumeric: "tabular-nums" }}>{PHONE}</a>
          </span>
        </div>
      </div>

      {/* header */}
      <header className="ezl-header" style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(255,255,255,.93)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${LINE}` }}>
        <div className="ezl-wrap" style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: 26 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src={LOGO} width={620} height={115} alt="EzzyERP home" style={{ height: 38, width: "auto", mixBlendMode: "multiply" }} />
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: "auto", fontSize: 15.5 }}>
            {[["/#industries", "Industries"], ["/#modules", "Modules"], ["/#inside", "Software"], ["/#hardware", "Hardware"], ["/#mobile", "Mobile app"], [BLOG_PATH, "Blog"]].map(([href, label]) => (
              <a key={href} className="ezl-navlink" href={href} style={{ color: NAVY, whiteSpace: "nowrap" }}>{label}</a>
            ))}
            <a href="/#demo" className="ezl-btn" style={{ padding: "11px 22px" }}>
              <Icon name="ph-calendar-check" size={18} /><span className="ezl-cta-label">Book free demo</span><span className="ezl-cta-short" style={{ display: "none" }}>Demo</span>
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="ezl-footer" style={{ background: NAVY, color: "rgba(255,255,255,.8)", padding: "48px 0 30px" }}>
      <div className="ezl-wrap">
        <div className="ezl-grid ezl-auto-200" style={{ alignItems: "start" }}>
          <div>
            <a href="/" style={{ display: "inline-flex", background: "#fff", borderRadius: 8, padding: "9px 14px" }}>
              <img src={LOGO} width={620} height={115} loading="lazy" alt="EzzyERP" style={{ height: 30, width: "auto" }} />
            </a>
            <p style={{ margin: "16px 0 0", fontSize: 15, maxWidth: "30ch" }}>Billing, inventory, barcode and GST software for retail, wholesale and distribution.</p>
          </div>
          <div>
            <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 14 }}>Solutions</div>
            <div style={{ display: "grid", gap: 9, fontSize: 15 }}>
              {SEO_PAGES.map((p) => (
                <a key={p.path} href={p.path} style={{ color: "rgba(255,255,255,.85)" }}>{p.label}</a>
              ))}
              <a href={BLOG_PATH} style={{ color: "rgba(255,255,255,.85)" }}>Blog: guides for shop owners</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 14 }}>Talk to us</div>
            <div style={{ display: "grid", gap: 9, fontSize: 15 }}>
              <a href={TEL} style={{ color: "#fff", fontVariantNumeric: "tabular-nums", fontSize: 18 }}>{PHONE}</a>
              <a href={`mailto:${MAIL}`} style={{ color: "rgba(255,255,255,.85)" }}>{MAIL}</a>
              <a href={GOOGLE_PROFILE} target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,.85)", fontSize: 14, maxWidth: "28ch" }}>
                <address style={{ fontStyle: "normal" }}>{ADDRESS}</address>
              </a>
              <a href={DIRECTIONS} target="_blank" rel="noopener" style={{ color: "#60A5FA", fontSize: 14 }}>Get directions →</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 36, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.16)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,.55)" }}>
          <span>© 2026 EzzyERP · Adtech ERP Solutions, Navi Mumbai</span>
          <a href="/privacy-policy" style={{ color: "rgba(255,255,255,.7)" }}>Privacy policy</a>
        </div>
      </div>
    </footer>
  );
}

/** Floating "Call now" (left) and WhatsApp (right) buttons. */
export function Floats({ waText }: { waText: string }) {
  return (
    <>
      <div className="ezl-floats ezl-floats-left">
        <a href={TEL} aria-label="Call Ezzy ERP" className="ezl-btn ezl-callnow" onClick={() => track("phone_click", { location: "float" })}>
          <Icon name="ph-phone-call" size={20} /><span className="ezl-float-label">Call now</span>
        </a>
      </div>
      <div className="ezl-floats">
        <a href={waLink(waText)} target="_blank" rel="noopener" aria-label="Chat with Ezzy ERP on WhatsApp" className="ezl-btn ezl-wa" onClick={() => track("whatsapp_click", { location: "float" })}>
          <Icon name="ph-whatsapp-logo" size={22} /><span className="ezl-float-label">WhatsApp</span>
        </a>
      </div>
    </>
  );
}
