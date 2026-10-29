import { Fragment, useEffect } from "react";
import "../landing.css";
import { IMG, HIGH_PRIORITY, PHONE, SITE, ORG_ID, LOGO, waLink, webpSet, NAVY, MUTED, SOFT, LINE, PALE, captureLeadSource, track } from "../site";
import { SEO_PAGES } from "../seo/pages";
import { Icon, SiteHeader, SiteFooter, Floats } from "../seo/SiteChrome";
import { BLOG_PATH, BLOG_POSTS, type BlogPost } from "./posts";

/* ------------------------------------------------------------------ *
 * One blog article (e.g. /blog/gst-on-clothes-above-2500).
 * Content lives in ./posts.ts; the index is ./BlogIndex.tsx.
 * ------------------------------------------------------------------ */

/** Sets title, description, canonical and social tags in the browser (the prerendered HTML already has them). */
export function useHead(path: string, title: string, description: string) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    document.title = title;
    const set = (selector: string, attr: string, value: string) => document.querySelector(selector)?.setAttribute(attr, value);
    set('meta[name="description"]', "content", description);
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[name="twitter:title"]', "content", title);
    set('meta[name="twitter:description"]', "content", description);
  }, [path, title, description]);
}

/** Renders text with [label](/path) links. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 3 === 1 ? <a key={i} href={parts[i + 1]}>{part}</a> : i % 3 === 2 ? null : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function jsonLd(post: BlogPost) {
  const url = `${SITE}${post.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Ezzy ERP",
        legalName: "Adtech ERP Solutions",
        url: `${SITE}/`,
        logo: `${SITE}${LOGO}`,
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        headline: post.h1,
        description: post.description,
        image: `${SITE}${IMG}/${post.heroShot[0]}`,
        datePublished: post.published,
        dateModified: post.updated,
        inLanguage: "en-IN",
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": `${SITE}${BLOG_PATH}#blog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ezzy ERP", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}${BLOG_PATH}` },
          { "@type": "ListItem", position: 3, name: post.label, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };
}

const prose = { margin: "18px 0 0", fontSize: 18, lineHeight: 1.7, color: MUTED, maxWidth: "70ch" } as const;

export default function BlogPostPage({ post }: { post: BlogPost }) {
  useHead(post.path, post.title, post.description);
  useEffect(() => {
    (window as Window & { hideAppBootSplash?: () => void }).hideAppBootSplash?.();
    captureLeadSource();
  }, []);

  const waText = `Hi, I read your article "${post.label}" on the Ezzy ERP website. Please share a demo.`;
  const products = SEO_PAGES.filter((p) => post.related.includes(p.path));
  const more = BLOG_POSTS.filter((p) => p.path !== post.path);

  return (
    <div className="ezzy-landing">
      <SiteHeader />

      <main>
        <article>
          <header style={{ background: NAVY, color: "#fff" }}>
            <div className="ezl-wrap" style={{ padding: "28px 24px 56px", maxWidth: 900 }}>
              <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "rgba(255,255,255,.62)" }}>
                <a href="/" style={{ color: "rgba(255,255,255,.8)" }}>Ezzy ERP</a> <span aria-hidden="true">›</span>{" "}
                <a href={BLOG_PATH} style={{ color: "rgba(255,255,255,.8)" }}>Blog</a>
              </nav>
              <h1 className="ezl-h1" style={{ fontSize: "clamp(30px,3.6vw,50px)", marginTop: 22 }}>{post.h1}</h1>
              <p style={{ margin: "18px 0 0", fontSize: 15, color: "rgba(255,255,255,.7)" }}>
                By the Ezzy ERP team · <time dateTime={post.updated}>{longDate(post.updated)}</time> · {post.readMinutes} min read
              </p>
            </div>
          </header>

          <div className="ezl-wrap" style={{ padding: "40px 24px 0", maxWidth: 900 }}>
            {post.intro.map((p, i) => (
              <p key={i} style={{ ...prose, fontSize: 19.5, color: NAVY }}><Rich text={p} /></p>
            ))}
            <figure style={{ margin: "34px 0 0" }}>
              <img src={`${IMG}/${post.heroShot[0]}`} srcSet={webpSet(`${IMG}/${post.heroShot[0]}`)} sizes="(max-width: 900px) 92vw, 852px" width={1366} height={700} {...HIGH_PRIORITY} alt={post.heroShot[1]} style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, border: `1px solid ${LINE}` }} />
            </figure>

            {post.body.map((block) => (
              <section key={block.h2} style={{ marginTop: 48 }}>
                <h2 style={{ margin: 0, fontSize: "clamp(24px,2.4vw,32px)", lineHeight: 1.2 }}>{block.h2}</h2>
                {block.paras?.map((p, i) => <p key={i} style={prose}><Rich text={p} /></p>)}
                {block.table && (
                  <div style={{ marginTop: 22, overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16.5 }}>
                      <thead>
                        <tr>{block.table.head.map((h) => <th key={h} style={{ textAlign: "left", padding: "12px 14px", background: PALE, borderBottom: `2px solid ${LINE}` }}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {block.table.rows.map((row, i) => (
                          <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: "12px 14px", borderBottom: `1px solid ${LINE}`, color: j === 0 ? NAVY : MUTED }}>{cell}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {block.list && (
                  <ul style={{ ...prose, paddingLeft: 22 }}>
                    {block.list.map((item, i) => <li key={i} style={{ marginTop: 8 }}><Rich text={item} /></li>)}
                  </ul>
                )}
                {block.note && (
                  <p style={{ margin: "22px 0 0", padding: "16px 20px", background: PALE, borderLeft: "4px solid #2563EB", borderRadius: 8, fontSize: 16.5, color: MUTED, maxWidth: "70ch" }}>
                    <Rich text={block.note} />
                  </p>
                )}
                {block.shot && (
                  <figure style={{ margin: "28px 0 0" }}>
                    <img src={`${IMG}/${block.shot[0]}`} srcSet={webpSet(`${IMG}/${block.shot[0]}`)} sizes="(max-width: 900px) 92vw, 852px" width={1366} height={700} alt={block.shot[1]} loading="lazy" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, border: `1px solid ${LINE}` }} />
                  </figure>
                )}
              </section>
            ))}

            <section style={{ marginTop: 56 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(24px,2.4vw,32px)" }}>Frequently asked questions</h2>
              <div style={{ marginTop: 22, display: "grid", gap: 12 }}>
                {post.faqs.map(([q, a]) => (
                  <details key={q} style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: "16px 20px", background: "#fff" }}>
                    <summary style={{ cursor: "pointer", fontSize: 18, fontWeight: 600 }}>{q}</summary>
                    <p style={{ margin: "10px 0 0", fontSize: 16.5, color: MUTED }}>{a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </article>

        {/* call to action */}
        <section className="ezl-wrap" style={{ padding: "50px 24px 0", maxWidth: 900 }}>
          <div style={{ background: PALE, border: `1px solid ${LINE}`, borderRadius: 14, padding: "28px 26px" }}>
            <h2 style={{ margin: 0, fontSize: 26 }}>Want your billing to do this for you?</h2>
            <p style={{ margin: "10px 0 0", fontSize: 17, color: MUTED }}>See Ezzy ERP on your own products in a free demo. Call or WhatsApp {PHONE}.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
              <a href="/#demo" className="ezl-btn ezl-btn-lg"><Icon name="ph-calendar-check" size={20} />Book a free demo</a>
              <a href={waLink(waText)} target="_blank" rel="noopener" className="ezl-btn ezl-btn-lg ezl-wa" onClick={() => track("whatsapp_click", { location: post.path })}><Icon name="ph-whatsapp-logo" size={20} />WhatsApp us</a>
            </div>
            {products.length > 0 && (
              <p style={{ margin: "20px 0 0", fontSize: 16 }}>
                {products.map((p, i) => <Fragment key={p.path}>{i > 0 && " · "}<a href={p.path}>{p.label}</a></Fragment>)}
              </p>
            )}
          </div>
        </section>

        {/* more posts */}
        <section className="ezl-sec" style={{ paddingTop: 50 }}>
          <p className="ezl-eyebrow">More guides for shop owners</p>
          <div className="ezl-grid ezl-auto-270">
            {more.map((p) => (
              <a key={p.path} href={p.path} className="ezl-card ezl-card-sm" style={{ color: NAVY, textDecoration: "none" }}>
                <span style={{ fontSize: 19, fontWeight: 600 }}>{p.label}</span>
                <span style={{ display: "block", marginTop: 6, fontSize: 15, color: SOFT }}>{p.readMinutes} min read</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <Floats waText={waText} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(post)).replace(/</g, "\\u003c") }} />
    </div>
  );
}
