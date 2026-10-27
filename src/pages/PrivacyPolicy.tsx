import { useEffect } from "react";
import "./landing.css";
import { LOGO, PHONE, TEL, MAIL, SITE, ADDRESS, NAVY, MUTED, LINE, PRIVACY_PATH, PRIVACY_HEAD } from "./site";

/* ------------------------------------------------------------------ *
 * /privacy-policy — what the website collects through the demo form
 * and why. Linked from the form and the footers.
 * ------------------------------------------------------------------ */

const SECTIONS: [string, string[]][] = [
  ["Who we are", [
    `Ezzy ERP is billing and inventory software made by Adtech ERP Solutions, ${ADDRESS}. This policy covers the website ezzyerp.in.`,
  ]],
  ["What we collect", [
    "When you book a demo, we receive the details you type into the form: your name, mobile number, shop or firm name, city, what you sell, and any note you add.",
    "We also note which page or advert brought you to the site, so we know which of our pages help shops find us.",
    "When you call, email or WhatsApp us, we receive whatever you choose to share in that conversation.",
  ]],
  ["How we use it", [
    "Only to contact you about the demo you asked for and to answer your questions about Ezzy ERP.",
    "We don't sell or rent your details to anyone.",
  ]],
  ["Where it is kept", [
    "Demo requests are stored in a secure cloud database that only our team can open.",
    "This website doesn't use advertising or tracking cookies.",
  ]],
  ["Your choices", [
    `To see, correct or delete the details you gave us, email ${MAIL} or call ${PHONE}, and we will do it.`,
  ]],
];

export default function PrivacyPolicy() {
  useEffect(() => {
    (window as Window & { hideAppBootSplash?: () => void }).hideAppBootSplash?.();
    const url = `${SITE}${PRIVACY_PATH}`;
    document.title = PRIVACY_HEAD.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", PRIVACY_HEAD.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, []);

  return (
    <div className="ezzy-landing">
      <header className="ezl-header" style={{ background: "#fff", borderBottom: `1px solid ${LINE}` }}>
        <div className="ezl-wrap" style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: 26 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src={LOGO} alt="EzzyERP home" width={620} height={115} style={{ height: 38, width: "auto", mixBlendMode: "multiply" }} />
          </a>
          <a href="/#demo" className="ezl-btn" style={{ padding: "11px 22px", marginLeft: "auto" }}>Book free demo</a>
        </div>
      </header>

      <main className="ezl-wrap" style={{ maxWidth: 760, padding: "56px 24px 72px" }}>
        <h1 className="ezl-h2" style={{ fontSize: "clamp(32px,4vw,46px)" }}>Privacy policy</h1>
        <p style={{ margin: "12px 0 0", color: MUTED }}>Last updated 27 October 2026</p>
        {SECTIONS.map(([heading, paras]) => (
          <div key={heading} style={{ marginTop: 34 }}>
            <h2 style={{ margin: 0, fontSize: 22, color: NAVY }}>{heading}</h2>
            {paras.map((p) => (
              <p key={p} style={{ margin: "10px 0 0", fontSize: 17, lineHeight: 1.6, color: MUTED }}>{p}</p>
            ))}
          </div>
        ))}
      </main>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,.7)", padding: "26px 0", fontSize: 13 }}>
        <div className="ezl-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between" }}>
          <span>© 2026 EzzyERP · Adtech ERP Solutions, Navi Mumbai</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a href={TEL} style={{ color: "#fff" }}>{PHONE}</a>
            <a href={`mailto:${MAIL}`} style={{ color: "rgba(255,255,255,.85)" }}>{MAIL}</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
