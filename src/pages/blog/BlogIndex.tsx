import { useEffect } from "react";
import "../landing.css";
import { IMG, SITE, ORG_ID, webpSet, NAVY, MUTED, SOFT, LINE, captureLeadSource } from "../site";
import { SiteHeader, SiteFooter, Floats } from "../seo/SiteChrome";
import { useHead } from "./BlogPostPage";
import { BLOG_PATH, BLOG_HEAD, BLOG_POSTS } from "./posts";

/* /blog — list of articles from ./posts.ts. */

const WA_TEXT = "Hi, I was reading the Ezzy ERP blog. Please share a demo.";

function jsonLd() {
  const url = `${SITE}${BLOG_PATH}`;
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    url,
    name: "Ezzy ERP Blog",
    description: BLOG_HEAD.description,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    blogPost: BLOG_POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.h1, url: `${SITE}${p.path}`, datePublished: p.published })),
  };
}

export default function BlogIndex() {
  useHead(BLOG_PATH, BLOG_HEAD.title, BLOG_HEAD.description);
  useEffect(() => {
    (window as Window & { hideAppBootSplash?: () => void }).hideAppBootSplash?.();
    captureLeadSource();
  }, []);

  return (
    <div className="ezzy-landing">
      <SiteHeader />

      <main>
        <section style={{ background: NAVY, color: "#fff" }}>
          <div className="ezl-wrap" style={{ padding: "28px 24px 56px" }}>
            <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "rgba(255,255,255,.62)" }}>
              <a href="/" style={{ color: "rgba(255,255,255,.8)" }}>Ezzy ERP</a> <span aria-hidden="true">›</span> <span>Blog</span>
            </nav>
            <h1 className="ezl-h1" style={{ fontSize: "clamp(34px,4vw,56px)", marginTop: 22 }}>Guides for Indian shop owners</h1>
            <p style={{ margin: "18px 0 0", fontSize: 19, maxWidth: "56ch", color: "rgba(255,255,255,.8)" }}>
              Plain answers on GST, barcode labels, stock and billing, from the team that sets up counters for garment, footwear and retail shops every week.
            </p>
          </div>
        </section>

        <section className="ezl-sec">
          <div className="ezl-grid ezl-auto-330">
            {BLOG_POSTS.map((p) => (
              <a key={p.path} href={p.path} className="ezl-card" style={{ color: NAVY, textDecoration: "none", padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <img src={`${IMG}/${p.heroShot[0]}`} srcSet={webpSet(`${IMG}/${p.heroShot[0]}`)} sizes="(max-width: 820px) 92vw, 400px" width={1366} height={700} alt="" loading="lazy" style={{ width: "100%", height: "auto", aspectRatio: "1366 / 700", objectFit: "cover", objectPosition: "top", display: "block", borderBottom: `1px solid ${LINE}` }} />
                <span style={{ padding: "20px 22px 24px", display: "block" }}>
                  <span style={{ display: "block", fontSize: 21, fontWeight: 600, lineHeight: 1.3 }}>{p.h1}</span>
                  <span style={{ display: "block", marginTop: 10, fontSize: 15.5, color: MUTED }}>{p.description}</span>
                  <span style={{ display: "block", marginTop: 12, fontSize: 14, color: SOFT }}>{p.readMinutes} min read</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <Floats waText={WA_TEXT} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
    </div>
  );
}
