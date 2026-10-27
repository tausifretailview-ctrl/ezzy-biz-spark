import { useEffect } from "react";
import "../landing.css";
import {
  IMG, LOGO, HIGH_PRIORITY, PHONE, TEL, MAIL, SITE, ADDRESS, GOOGLE_PROFILE, DIRECTIONS, waLink, webpSet, ORG_ID,
  NAVY, ROYAL, MUTED, SOFT, LINE, PALE, captureLeadSource, track,
} from "../site";
import { SEO_PAGES, type SeoPageData } from "./pages";

/* ------------------------------------------------------------------ *
 * Keyword landing page (e.g. /garment-shop-billing-software).
 * Same look as the home page, but one search intent per URL so Google
 * has a specific page to rank. Content lives in ./pages.ts.
 * ------------------------------------------------------------------ */

function Icon({ name, size, color }: { name: string; size: number; color?: string }) {
  return <i className={`ph-duotone ${name}`} style={{ fontSize: size, color }} aria-hidden="true" />;
}

/** Keeps <head> in step with the page when it is rendered in the browser (the prerendered HTML already has it). */
function useHead(page: SeoPageData) {
  useEffect(() => {
    const url = `${SITE}${page.path}`;
    document.title = page.title;
    const set = (selector: string, attr: string, value: string) => document.querySelector(selector)?.setAttribute(attr, value);
    set('meta[name="description"]', "content", page.description);
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:title"]', "content", page.title);
    set('meta[property="og:description"]', "content", page.description);
    set('meta[name="twitter:title"]', "content", page.title);
    set('meta[name="twitter:description"]', "content", page.description);
  }, [page]);
}

function jsonLd(page: SeoPageData) {
  const url = `${SITE}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Ezzy ERP",
        legalName: "Adtech ERP Solutions",
        url: `${SITE}/`,
        telephone: "+91-8424034844",
        email: MAIL,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": ORG_ID },
        primaryImageOfPage: `${SITE}${IMG}/${page.heroShot[0]}`,
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ezzy ERP", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: page.label, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };
}

export default function SeoPage({ page }: { page: SeoPageData }) {
  useHead(page);
  useEffect(() => {
    (window as Window & { hideAppBootSplash?: () => void }).hideAppBootSplash?.();
    captureLeadSource();
  }, []);

  const related = SEO_PAGES.filter((p) => p.path !== page.path);
  const waText = `Hi, I found Ezzy ERP while looking for ${page.label.toLowerCase()}. Please share a demo.`;

  return (
    <div className="ezzy-landing">
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
            {[["/#industries", "Industries"], ["/#modules", "Modules"], ["/#inside", "Software"], ["/#hardware", "Hardware"], ["/#mobile", "Mobile app"]].map(([href, label]) => (
              <a key={href} className="ezl-navlink" href={href} style={{ color: NAVY, whiteSpace: "nowrap" }}>{label}</a>
            ))}
            <a href="/#demo" className="ezl-btn" style={{ padding: "11px 22px" }}>
              <Icon name="ph-calendar-check" size={18} /><span className="ezl-cta-label">Book free demo</span><span className="ezl-cta-short" style={{ display: "none" }}>Demo</span>
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* hero */}
        <section style={{ position: "relative", background: NAVY, color: "#fff", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
          <div className="ezl-wrap" style={{ position: "relative" }}>
            <nav aria-label="Breadcrumb" style={{ paddingTop: 28, fontSize: 14, color: "rgba(255,255,255,.62)" }}>
              <a href="/" style={{ color: "rgba(255,255,255,.8)" }}>Ezzy ERP</a> <span aria-hidden="true">›</span> <span>{page.label}</span>
            </nav>
            <div className="ezl-grid ezl-auto-330" style={{ alignItems: "center", padding: "30px 0 64px" }}>
              <div>
                <span className="ezl-hero-eyebrow" style={{ display: "inline-flex", fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "#60A5FA", border: "1px solid rgba(96,165,250,.4)", borderRadius: 999, padding: "7px 15px" }}>{page.eyebrow}</span>
                <h1 className="ezl-h1" style={{ fontSize: "clamp(34px,4vw,58px)" }}>{page.h1}</h1>
                {page.intro.map((p, i) => (
                  <p key={i} style={{ margin: "20px 0 0", fontSize: 19, maxWidth: "52ch", color: "rgba(255,255,255,.8)" }}>{p}</p>
                ))}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
                  <a href="/#demo" className="ezl-btn ezl-btn-lg"><Icon name="ph-calendar-check" size={20} />Book a free demo</a>
                  <a href={waLink(waText)} target="_blank" rel="noopener" className="ezl-btn-ghost" onClick={() => track("whatsapp_click", { location: page.path })}><Icon name="ph-whatsapp-logo" size={20} />WhatsApp {PHONE}</a>
                </div>
              </div>
              <figure style={{ margin: 0 }}>
                <img src={`${IMG}/${page.heroShot[0]}`} srcSet={webpSet(`${IMG}/${page.heroShot[0]}`)} sizes="(max-width: 820px) 92vw, 600px" width={1366} height={700} {...HIGH_PRIORITY} alt={page.heroShot[1]} style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, boxShadow: "0 30px 70px rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.14)" }} />
              </figure>
            </div>
          </div>
        </section>

        {page.sections.map((sec, i) => (
          <section key={sec.h2} className="ezl-sec" style={{ paddingBottom: 20 }}>
            <h2 className="ezl-h2" style={{ maxWidth: "26ch" }}>{sec.h2}</h2>
            {sec.paras?.map((p, j) => (
              <p key={j} className="ezl-lead" style={{ margin: "18px 0 0", maxWidth: "70ch" }}>{p}</p>
            ))}
            {sec.points && (
              <div className="ezl-grid ezl-auto-270" style={{ marginTop: 34 }}>
                {sec.points.map(([title, text]) => (
                  <div key={title} className="ezl-card ezl-card-sm">
                    <h3 style={{ margin: 0, fontSize: 21 }}>{title}</h3>
                    <p style={{ margin: "8px 0 0", fontSize: 16, color: MUTED }}>{text}</p>
                  </div>
                ))}
              </div>
            )}
            {sec.shot && (
              <figure style={{ margin: "36px 0 0", maxWidth: 980 }}>
                <img src={`${IMG}/${sec.shot[0]}`} srcSet={webpSet(`${IMG}/${sec.shot[0]}`)} sizes="(max-width: 1030px) 92vw, 980px" width={1366} height={700} alt={sec.shot[1]} loading="lazy" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, border: `1px solid ${LINE}` }} />
              </figure>
            )}
            {i === 0 && (
              <p style={{ margin: "30px 0 0", fontSize: 17 }}>
                <a href="/#modules">See all 12 modules</a> · <a href="/#inside">Look inside the software</a> · <a href="/#hardware">Printers and scanners</a>
              </p>
            )}
          </section>
        ))}

        {/* faq */}
        <section className="ezl-sec">
          <h2 className="ezl-h2">Questions shop owners ask us</h2>
          <div style={{ marginTop: 28, display: "grid", gap: 12, maxWidth: 900 }}>
            {page.faqs.map(([q, a]) => (
              <details key={q} style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: "16px 20px", background: "#fff" }}>
                <summary style={{ cursor: "pointer", fontSize: 19, fontWeight: 600 }}>{q}</summary>
                <p style={{ margin: "10px 0 0", fontSize: 16.5, color: MUTED }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* related */}
        <section className="ezl-sec" style={{ paddingTop: 30 }}>
          <p className="ezl-eyebrow">Also see</p>
          <div className="ezl-grid ezl-auto-270">
            {related.map((p) => (
              <a key={p.path} href={p.path} className="ezl-card ezl-card-sm" style={{ color: NAVY, textDecoration: "none" }}>
                <span style={{ fontSize: 19, fontWeight: 600 }}>{p.label}</span>
                <span style={{ display: "block", marginTop: 6, fontSize: 15, color: SOFT }}>{p.eyebrow}</span>
              </a>
            ))}
          </div>
        </section>

        {/* closing cta */}
        <section style={{ background: PALE, marginTop: 50 }}>
          <div className="ezl-wrap" style={{ padding: "60px 24px", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 className="ezl-h2" style={{ fontSize: "clamp(28px,3vw,42px)" }}>See it on your own products.</h2>
              <p style={{ margin: "12px 0 0", fontSize: 18, color: MUTED, maxWidth: "48ch" }}>A free demo of the billing screen your shop would use, with your items and labels.</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="/#demo" className="ezl-btn ezl-btn-lg"><Icon name="ph-calendar-check" size={20} />Book a free demo</a>
              <a href={TEL} className="ezl-btn ezl-btn-lg" style={{ background: "#fff", color: ROYAL, border: `1px solid ${LINE}` }} onClick={() => track("phone_click", { location: page.path })}><Icon name="ph-phone-call" size={20} />{PHONE}</a>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(page)).replace(/</g, "\\u003c") }} />
    </div>
  );
}
