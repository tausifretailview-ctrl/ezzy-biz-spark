import { useRef, type MouseEvent } from "react";
import { APP_LOGIN, LOGO, PHONE, TEL, MAIL, ADDRESS, GOOGLE_PROFILE, DIRECTIONS, waLink, NAVY, LINE, track } from "../site";
import { SEO_PAGES, PRODUCT_PAGES, SERVICE_PAGES } from "./pages";
import { BLOG_PATH, BLOG_POSTS } from "../blog/posts";

/* ------------------------------------------------------------------ *
 * Header, footer and floating call/WhatsApp buttons shared by the
 * keyword pages (./SeoPage.tsx) and the blog (../blog/).
 * ------------------------------------------------------------------ */

export function Icon({ name, size, color }: { name: string; size: number; color?: string }) {
  return <i className={`ph-duotone ${name}`} style={{ fontSize: size, color }} aria-hidden="true" />;
}

/** "Blogs" item for the main menu: links to /blog and opens a list of every post on hover or keyboard focus.
 *  Like the other menu links it is hidden on phones and small tablets (landing.css), where MobileMenu takes over. */
export function BlogMenu() {
  return (
    <div className="ezl-navlink ezl-navdrop">
      <a href={BLOG_PATH} aria-haspopup="true" style={{ color: NAVY, whiteSpace: "nowrap" }}>
        Blogs
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      <div className="ezl-navdrop-panel">
        <div className="ezl-navdrop-inner">
          <div className="ezl-navdrop-grid">
            {BLOG_POSTS.map((p) => (
              <a key={p.path} href={p.path} lang={p.lang}>{p.label}</a>
            ))}
          </div>
          <a href={BLOG_PATH} className="ezl-navdrop-all">All guides for shop owners →</a>
        </div>
      </div>
    </div>
  );
}

/** The main menu's section links. `home` is true on the landing page, where they are in-page anchors. */
export const navLinks = (home = false): [href: string, label: string][] =>
  ([["top", "Home"], ["industries", "Industries"], ["modules", "Modules"], ["inside", "Software"], ["hardware", "Hardware"], ["mobile", "Mobile app"]] as const)
    .map(([id, label]) => [home ? `#${id}` : id === "top" ? "/" : `/#${id}`, label]);

/** "Services" in the main menu: the custom development pages, starting from custom software. */
export const SERVICES_LINK: [href: string, label: string] = [SERVICE_PAGES[0].path, "Services"];

/** The menu for phones and tablets, where the row of menu links does not fit (landing.css shows it at 1080px and
 *  below). Built on <details> so it opens before the page's JavaScript has loaded. */
export function MobileMenu({ home = false }: { home?: boolean }) {
  const menu = useRef<HTMLDetailsElement>(null);
  // An in-page link (#modules) doesn't reload the page, so close the menu by hand.
  const closeOnLink = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a")) menu.current?.removeAttribute("open"); };
  const chevron = <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return (
    <details className="ezl-mnav" ref={menu}>
      <summary aria-label="Menu">
        <svg className="ezl-mnav-open" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <svg className="ezl-mnav-close" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </summary>
      <div className="ezl-mnav-panel" onClick={closeOnLink}>
        {navLinks(home).map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        <details className="ezl-mnav-sub">
          <summary>Solutions{chevron}</summary>
          {PRODUCT_PAGES.map((p) => <a key={p.path} href={p.path}>{p.label}</a>)}
        </details>
        <details className="ezl-mnav-sub">
          <summary>Services{chevron}</summary>
          {SERVICE_PAGES.map((p) => <a key={p.path} href={p.path}>{p.label}</a>)}
        </details>
        <details className="ezl-mnav-sub" open>
          <summary>Blogs{chevron}</summary>
          <a href={BLOG_PATH} style={{ fontWeight: 600, color: "#1D4ED8" }}>All guides for shop owners →</a>
          {BLOG_POSTS.map((p) => <a key={p.path} href={p.path} lang={p.lang}>{p.label}</a>)}
        </details>
        <a href={APP_LOGIN} rel="noopener" onClick={() => track("login_click", { location: "menu" })}>Customer login</a>
      </div>
    </details>
  );
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
            <a href={APP_LOGIN} rel="noopener" style={{ color: "#60A5FA" }} onClick={() => track("login_click", { location: "top" })}>Customer login</a>
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
            {[...navLinks(), SERVICES_LINK].map(([href, label]) => (
              <a key={href} className="ezl-navlink" href={href} style={{ color: NAVY, whiteSpace: "nowrap" }}>{label}</a>
            ))}
            <BlogMenu />
            <a href="/#demo" className="ezl-btn" style={{ padding: "11px 22px" }}>
              <Icon name="ph-calendar-check" size={18} /><span className="ezl-cta-label">Book free demo</span><span className="ezl-cta-short" style={{ display: "none" }}>Demo</span>
            </a>
            <MobileMenu />
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
        <div className="ezl-grid ezl-auto-200 ezl-foot3" style={{ alignItems: "start" }}>
          <div>
            <a href="/" style={{ display: "inline-flex", background: "#fff", borderRadius: 8, padding: "9px 14px" }}>
              <img src={LOGO} width={620} height={115} loading="lazy" alt="EzzyERP" style={{ height: 30, width: "auto" }} />
            </a>
            <p style={{ margin: "16px 0 0", fontSize: 15, maxWidth: "30ch" }}>Billing, inventory, barcode and GST software for retail, wholesale and distribution.</p>
          </div>
          <div className="ezl-foot-wide">
            <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 14 }}>Solutions</div>
            <div className="ezl-foot-links" style={{ display: "grid", gap: 9, fontSize: 15 }}>
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
          <span style={{ display: "flex", gap: 18 }}>
            <a href={APP_LOGIN} rel="noopener" style={{ color: "rgba(255,255,255,.7)" }}>Customer login</a>
            <a href="/privacy-policy" style={{ color: "rgba(255,255,255,.7)" }}>Privacy policy</a>
          </span>
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
