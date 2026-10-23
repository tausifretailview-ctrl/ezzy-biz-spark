import { useEffect, useRef, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import "./landing.css";

/* ------------------------------------------------------------------ *
 * Ezzy ERP — public marketing landing page.
 *
 * Mount at /home as a PUBLIC route (no ProtectedRoute / OrgLayout).
 * Images live in public/landing/ — see IMG below.
 * ------------------------------------------------------------------ */

const IMG = "/landing";
const PHONE = "+91 84240 34844";
const TEL = "tel:+918424034844";
const MAIL = "info@ezzyerp.in";
const SITE = "https://ezzyerp.in";
// Same wording as the Google Business Profile, so search engines match the two.
const STREET = "Shop No.2, Mittal Tower, Sector Number 1 Rd, Sector 1, Kopar Khairane";
const ADDRESS = `${STREET}, Navi Mumbai, Maharashtra 400709`;
const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const WA_NUMBER = "918424034844";
const WA_TEXT = "Hi, I'm interested in Ezzy ERP. Please share a demo.";
const waLink = (text = WA_TEXT) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

/** Social profiles shown in the footer. The last field marks Ezzy ERP's own brand accounts, which are also
 *  listed as sameAs in the schema; the others belong to the separate "Software Services" business. */
const SOCIAL: [icon: string, label: string, href: string, brand?: boolean][] = [
  ["ph-instagram-logo", "Instagram", "https://www.instagram.com/ezzyerp/", true],
  ["ph-facebook-logo", "Facebook", "https://www.facebook.com/Softwareservicesonline"],
  // ["ph-youtube-logo", "YouTube", "https://www.youtube.com/@…"],
  // ["ph-linkedin-logo", "LinkedIn", "https://www.linkedin.com/company/…"],
];

const NAVY = "#0F172A";
const ROYAL = "#2563EB";
const MUTED = "#44536e";
const SOFT = "#66748c";
const LINE = "#e6eaf2";
const PALE = "#f5f7fb";

type Slide = {
  eyebrow: string;
  head: React.ReactNode;
  body: string;
  ctaHref: string;
  ctaIcon: string;
  ctaLabel: string;
  altHref: string;
  altIcon?: string;
  altLabel: string;
  img: string;
  alt: string;
  badgeLabel: string;
  badgeValue: React.ReactNode;
  floatDur: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Billing · Barcoding · Accounting",
    head: (
      <>
        Smart Billing.
        <br />
        Seamless Inventory.
        <br />
        <span style={{ color: "#60A5FA" }}>Easy Barcode Management.</span>
      </>
    ),
    body: "Complete ERP for retail, wholesale and distribution — garments, footwear, electronics and departmental stores. Software, printers and onboarding from one team.",
    ctaHref: "#demo",
    ctaIcon: "ph-calendar-check",
    ctaLabel: "Book a free demo",
    altHref: TEL,
    altIcon: "ph-phone-call",
    altLabel: PHONE,
    img: `${IMG}/shot-dashboard.jpg`,
    alt: "Ezzy ERP dashboard — sales, purchase, stock value and receivables",
    badgeLabel: "Bill printed in",
    badgeValue: (
      <>
        4<span style={{ fontSize: 15 }}> sec</span>
      </>
    ),
    floatDur: "5.5s",
  },
  {
    eyebrow: "Cloud · Secure · 24×7",
    head: (
      <>
        Your whole shop,
        <br />
        <span style={{ color: "#60A5FA" }}>on one login.</span>
      </>
    ),
    body: "POS, purchase, stock, GST, ledgers and insights in one system — with per-staff rights, cloud backup and support on call and WhatsApp whenever you are billing.",
    ctaHref: "#modules",
    ctaIcon: "ph-squares-four",
    ctaLabel: "Explore the modules",
    altHref: "#demo",
    altLabel: "Book a demo",
    img: `${IMG}/shot-insights.jpg`,
    alt: "Ezzy ERP business insights — revenue, gross profit and margin against the prior period",
    badgeLabel: "Support",
    badgeValue: "24×7",
    floatDur: "6s",
  },
];

const MARQUEE = [
  "POS Billing", "Size & Colour Matrix", "Barcode Labels", "Purchase Bills",
  "GST Register", "Customer Ledger", "Business Insights", "WhatsApp Invoices",
  "Field Sales App",
];

const INDUSTRIES = [
  {
    icon: "ph-t-shirt", tileBg: "#dbe7ff", tileFg: "#2563EB",
    title: "Garments & textiles",
    sub: "Boutiques, saree shops, kids wear, readymade wholesale",
    points: ["Size & colour matrix entry", "Design number (D.No) labels", "Brand and size-wise stock"],
  },
  {
    icon: "ph-sneaker", tileBg: "#ffe6d6", tileFg: "#D9480F",
    title: "Footwear",
    sub: "Showrooms, multi-brand outlets, footwear wholesale",
    points: ["Article & size-run stock", "MRP-mode POS pricing", "Reorder & discount schemes"],
  },
  {
    icon: "ph-device-mobile-camera", tileBg: "#ece3ff", tileFg: "#7C3AED",
    title: "Mobiles & electronics",
    sub: "Mobile counters, electronics showrooms, appliance dealers",
    points: ["IMEI / serial number tracking", "EMI & mixed payment billing", "Warranty-ready invoices"],
  },
  {
    icon: "ph-shopping-cart-simple", tileBg: "#d8f5e6", tileFg: "#059669",
    title: "Departmental stores",
    sub: "Supermarkets, kirana, cosmetics, stationery",
    points: ["Fast barcode counter billing", "Batch & low-stock alerts", "Daily cash report & credit"],
  },
];

const MODULES = [
  ["ph-cash-register", "#2563EB", "POS Billing", "Scan, bill, print. Cash, UPI, card, credit, mix-pay and hold bills on function keys."],
  ["ph-barcode", "#0E7490", "Barcode & Labels", "Auto-generate or scan barcodes, then print 38×25, 40×25 2-up and 80mm thermal labels."],
  ["ph-package", "#D9480F", "Inventory", "Live stock by product, variant, size and colour, with settlement and adjustments."],
  ["ph-shopping-bag-open", "#7C3AED", "Purchase", "Purchase bills with size-grid review, inline calculator, DC purchase and returns."],
  ["ph-receipt", "#059669", "Sales & Invoicing", "Quotations, sale orders, invoices, delivery challans, returns and credit notes."],
  ["ph-calculator", "#B45309", "GST & Accounting", "GST register, trial balance, ledgers and Tally-style bill-by-bill settlement."],
  ["ph-users-three", "#DB2777", "Customer Ledger", "Party balances, advances, credit notes and statements you can send in one tap."],
  ["ph-chart-line-up", "#0891B2", "Business Insights", "Executive summary, profitability, stock health, sales trends, reorder analysis."],
  ["ph-whatsapp-logo", "#16A34A", "WhatsApp Invoices", "Send the bill, the statement and payment reminders from the billing screen."],
  ["ph-lock-key", "#4F46E5", "Users & Rights", "Menu-level permissions per staff — hide profit, lock settings, allow only POS."],
  ["ph-cloud-arrow-up", "#0284C7", "Backup & Recycle Bin", "Cloud backup, deletion reasons and a recycle bin — a wrong entry is never the end."],
  ["ph-buildings", "#BE185D", "Multi-branch", "Switch between firms and branches on one login, each with its own books."],
] as const;

const SHOTS = [
  {
    tab: "Dashboard", file: "shot-dashboard.jpg",
    alt: "Ezzy ERP dashboard with sales, purchase, inventory and financial overview cards",
    cap: "Dashboard — total sales, invoices, sold quantity, stock value, receivables and cash collection for the selected month.",
  },
  {
    tab: "POS Billing", file: "shot-pos.jpg",
    alt: "Ezzy ERP POS billing screen with barcode field, size and colour columns and function-key payment modes",
    cap: "POS Billing — barcode field, customer lookup, size and colour columns, and payment modes on F1–F12.",
  },
  {
    tab: "Purchase Entry", file: "shot-purchase.jpg",
    alt: "Ezzy ERP purchase bill entry with size grid, barcode column, purchase and sale rate, GST and print-barcodes action",
    cap: "Purchase Entry — supplier bill with a size grid, auto barcodes, purchase and sale rate, GST per line, and Print Barcodes in one click.",
  },
  {
    tab: "Customers", file: "shot-customers.jpg",
    alt: "Ezzy ERP customer master with VIP, regular, at-risk and lost segments and lifetime sales per customer",
    cap: "Customer Master — lifetime-sales segments (VIP, regular, at risk, lost) with mobile, advance, discount and last sale date.",
  },
  {
    tab: "Accounts", file: "shot-accounts.jpg",
    alt: "Ezzy ERP accounts management showing customer ledger, outstanding, credit and net receivable",
    cap: "Accounts Management — customer and supplier ledgers, outstanding, advances, credit notes and net receivable across all parties.",
  },
  {
    tab: "GL Reports", file: "shot-gl.jpg",
    alt: "Ezzy ERP accounting reports with GL trial balance, Tally groups and ledger drill-down",
    cap: "Accounting Reports — GL trial balance, P&L and balance sheet on posted journals, with Tally export and line-level drill-down.",
  },
  {
    tab: "Business Insights", file: "shot-insights.jpg",
    alt: "Ezzy ERP business insights with revenue, gross profit and margin against the prior period",
    cap: "Business Insights — revenue, gross profit and margin against the prior period, with profit concentration by SKU.",
  },
];

const HARDWARE = [
  ["hw-barcode-printer.jpg", "TSC TE244 barcode label printer", "Barcode printer", "TSC TE244", "Thermal transfer label printing for garment tags, size and MRP labels."],
  ["hw-thermal-printer.jpg", "80mm thermal receipt printer with printed bill", "Receipt printer", "80mm thermal", "Auto-cut counter bills with your logo, GST details and a UPI QR code."],
  ["hw-scanner.jpg", "Handheld barcode scanner", "Scanner", "1D / 2D handheld", "Reads worn garment tags and phone-screen QR codes without a re-scan."],
] as const;

const APP_SCREENS = [
  ["app-home.jpg", "Home", "Home screen — revenue today, gross profit, today's sale, purchase, profit, payment received, customer and supplier outstanding", "Revenue, gross profit, outstanding and a 7-day sales chart — synced from the counter."],
  ["app-newsale.jpg", "New sale", "New sale screen — walk-in customer, search name or barcode, scan, fast picks and bill total", "Bill from the phone — the camera stays armed, fast picks for top sellers, cash / UPI / card / later."],
  ["app-reports.jpg", "Reports", "Reports screen — quick access to size stock, today's sales, customer balance and supplier balance", "Cashier, item-wise, customer-wise and salesman-wise sale — with quick-access tiles on top."],
  ["app-reports2.jpg", "Stock & profit", "Reports screen — top selling products, item-wise stock, dead stock analytics, net profit, stock report and size-wise stock", "Top sellers, dead stock by days idle, net profit with COGS and margin, size-wise stock."],
] as const;

const WHY = [
  ["ph-cursor-click", "#93C5FD", "Staff learn it in a day", "Function keys, one-screen billing and trainers on the phone in your language."],
  ["ph-lightning", "#FCD34D", "Fast on a busy counter", "Tuned for festival rush — search, scan and print without the wait."],
  ["ph-shield-check", "#6EE7B7", "Your data stays yours", "Cloud backup, per-user rights and a recycle bin with deletion reasons."],
  ["ph-scales", "#FDA4AF", "Books that tally", "Bill-by-bill settlement, advances and credit notes that match your ledger."],
  ["ph-trend-up", "#A5B4FC", "It grows with the shop", "One counter to many branches on the same login and the same books."],
  ["ph-headset", "#67E8F9", "24×7 support", "Call or WhatsApp — a real person, including on the days you bill most."],
] as const;

const QUOTES = [
  ["Size and colour entry used to take my whole evening. Now the purchase bill and the labels are done before I close the shutter.", "Readymade garment retailer"],
  ["Two boys at the counter during the festival rush and not one bill stuck. The barcode reads first time, every time.", "Footwear showroom owner"],
  ["I can see the day's sale and who owes me from my phone, sitting at home. That alone was worth the switch.", "Distributor, mobiles & electronics"],
] as const;

const FAQS = [
  ["What is Ezzy ERP?", "Ezzy ERP is billing, POS, barcode, inventory, GST and accounting software for retail, wholesale and distribution businesses in India. It runs in the cloud with an Android app for owners and field sales."],
  ["Which businesses is Ezzy ERP made for?", "Garment and textile shops, boutiques and saree shops, footwear showrooms, mobile and electronics stores, and departmental stores such as supermarkets, kirana, cosmetics and stationery — plus wholesalers and distributors in those trades."],
  ["Does Ezzy ERP handle size and colour stock for garments?", "Yes. Purchase entry has a size grid, stock is tracked by product, size and colour, and you can print design number (D.No), size and MRP barcode labels straight from the purchase bill."],
  ["Is Ezzy ERP GST ready?", "Yes. Every bill line carries GST, and you get a GST register, ledgers, trial balance, P&L and balance sheet, with Tally-style bill-by-bill settlement and Tally export."],
  ["Can I send bills on WhatsApp?", "Yes. Bills, customer statements and payment reminders can be sent on WhatsApp from the billing screen."],
  ["Do you supply barcode printers and scanners?", "Yes. We supply and install barcode label printers, 80mm thermal receipt printers and barcode scanners with the licence, so labels print and scan from day one."],
  ["Is there a mobile app?", "Yes. The Android app shows the owner today's sales, stock and dues, lets you bill from the phone, and gives salesmen a field app for orders and collections that works offline and syncs later."],
  ["Can I manage more than one shop or branch?", "Yes. Switch between firms and branches on one login, each with its own books, and give every staff member only the menus they need."],
  ["How do I get a demo?", `Fill in the free demo form on this page call or WhatsApp ${PHONE}. We show you the billing screen on your own products and labels, and train your staff on the phone in your language.`],
] as const;

const TRADES = ["Garments & textiles", "Footwear", "Mobiles & electronics", "Departmental / general store", "Wholesale / distribution", "Something else"];

/* ---------- structured data (JSON-LD for Google and AI assistants) ---------- */

const ORG_ID = `${SITE}/#organization`;
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Ezzy ERP",
      alternateName: "EzzyERP",
      legalName: "Adtech ERP Solutions",
      sameAs: SOCIAL.filter(([, , , brand]) => brand).map(([, , href]) => href),
      url: `${SITE}/`,
      logo: `${SITE}/app-icon.png`,
      image: `${SITE}/og-image.jpg`,
      email: MAIL,
      telephone: "+91-8424034844",
      address: { "@type": "PostalAddress", streetAddress: STREET, addressLocality: "Navi Mumbai", addressRegion: "Maharashtra", postalCode: "400709", addressCountry: "IN" },
      hasMap: MAP,
      areaServed: { "@type": "Country", name: "India" },
      contactPoint: [{ "@type": "ContactPoint", telephone: "+91-8424034844", contactType: "sales", areaServed: "IN", availableLanguage: ["English", "Hindi", "Marathi"] }],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Ezzy ERP",
      inLanguage: "en-IN",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "SoftwareApplication",
      name: "Ezzy ERP",
      url: `${SITE}/`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Retail POS, billing and inventory software",
      operatingSystem: "Web, Windows, Android",
      description: "Billing, POS, barcode, inventory, GST and accounting software for garment, footwear, electronics and departmental stores in India.",
      image: `${SITE}/landing/shot-pos.jpg`,
      screenshot: SHOTS.map((sh) => `${SITE}${IMG}/${sh.file}`),
      featureList: MODULES.map(([, , title]) => title),
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
};

/* ---------- lead source ---------- */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
type LeadSource = Partial<Record<(typeof UTM_KEYS)[number] | "referrer" | "landing_page", string>>;

/** Remembers where the visitor came from (first touch in this tab) so the demo request can be attributed. */
function captureLeadSource(): LeadSource {
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
function track(event: string, params: Record<string, unknown> = {}) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") w.gtag("event", event, params);
  else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params });
}

/* ---------- small pieces ---------- */

function Icon({ name, size, color, style }: { name: string; size: number; color?: string; style?: React.CSSProperties }) {
  return <i className={`ph-duotone ${name}`} style={{ fontSize: size, color, ...style }} aria-hidden="true" />;
}

/** Scroll-reveal wrapper. Never leaves content permanently hidden. */
function Reveal({ children, as: Tag = "div", className = "", style, ...rest }: any) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    const failsafe = window.setTimeout(() => { setSeen(true); io.disconnect(); }, 2600);
    return () => { io.disconnect(); window.clearTimeout(failsafe); };
  }, []);
  return (
    <Tag ref={ref} className={`ezl-reveal ${seen ? "is-in" : ""} ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/** Counts 0 → target once, then snaps to `final`. */
function CountUp({ target, final }: { target: number; final: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(final);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1100);
        if (p < 1) {
          setText(Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN") + "+");
          requestAnimationFrame(step);
        } else setText(final);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, final]);
  return <span ref={ref}>{text}</span>;
}

/* ---------- page ---------- */

export default function Landing() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shot, setShot] = useState(0);
  const [sent, setSent] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const source = useRef<LeadSource>({});

  // The app's boot splash covers every route until auth resolves — this page
  // never authenticates, so dismiss it immediately.
  useEffect(() => {
    (window as any).hideAppBootSplash?.();
    document.title = "Ezzy ERP — Billing, Inventory & GST Software for Garment & Retail Shops in India";
    source.current = captureLeadSource();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (n: number) => { setPaused(true); setSlide(((n % SLIDES.length) + SLIDES.length) % SLIDES.length); };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (k: string) => String(data.get(k) || "").trim() || null;
    const phone = field("phone");
    const lead = { name: field("name"), phone, shop: field("shop"), city: field("city"), trade: field("trade"), note: field("note") };
    const src = source.current;
    setSending(true);
    setFailed(null);

    // Save the lead with its source. If the source columns are not live in the
    // database yet, retry with the source folded into the note so the lead is
    // never lost to a schema mismatch.
    let { error } = await supabase.from("demo_requests").insert({ ...lead, ...src });
    if (error && Object.keys(src).length) {
      const tag = Object.entries(src).map(([k, v]) => `${k}=${v}`).join(" ");
      ({ error } = await supabase.from("demo_requests").insert({ ...lead, note: [lead.note, `[${tag}]`].filter(Boolean).join(" ") }));
    }
    setSending(false);

    if (error) {
      // Last resort: hand the details to WhatsApp so the visitor can still reach us.
      console.error("demo_requests insert failed", error);
      setFailed(waLink(`Hi, I'd like a free Ezzy ERP demo.\nName: ${lead.name ?? ""}\nMobile: ${phone ?? ""}\nShop: ${lead.shop ?? ""}\nCity: ${lead.city ?? ""}\nTrade: ${lead.trade ?? ""}\n${lead.note ?? ""}`));
      track("demo_request_failed");
      return;
    }

    track("generate_lead", { form: "demo", trade: lead.trade, ...src });
    setSent(phone || "your number");
  }

  const s = SLIDES[slide];

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
            <a href={`mailto:${MAIL}`} style={{ color: "rgba(255,255,255,.86)" }}>{MAIL}</a>
            <a href={TEL} style={{ color: "#fff", fontVariantNumeric: "tabular-nums" }}>{PHONE}</a>
          </span>
        </div>
      </div>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(255,255,255,.93)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${LINE}` }}>
        <div className="ezl-wrap" style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: 26 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src={`${IMG}/ezzy-logo-tight.jpg`} alt="EzzyERP — Smart Billing. Seamless Inventory. Easy Barcode Management." style={{ height: 38, width: "auto", mixBlendMode: "multiply" }} />
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: "auto", fontSize: 15.5 }}>
            {[["#industries", "Industries"], ["#modules", "Modules"], ["#inside", "Software"], ["#hardware", "Hardware"], ["#mobile", "Mobile app"]].map(([href, label]) => (
              <a key={href} className="ezl-navlink" href={href} style={{ color: NAVY, whiteSpace: "nowrap" }}>{label}</a>
            ))}
            <a href="#demo" className="ezl-btn" style={{ padding: "11px 22px" }}>
              <Icon name="ph-calendar-check" size={18} /><span className="ezl-cta-label">Book free demo</span><span className="ezl-cta-short" style={{ display: "none" }}>Demo</span>
            </a>
          </nav>
        </div>
      </header>

      {/* hero slider */}
      <section
        id="top"
        style={{ position: "relative", background: NAVY, color: "#fff", overflow: "hidden", scrollMarginTop: 70 }}
        onMouseEnter={() => setPaused(true)}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="ezl-orb-a" style={{ position: "absolute", top: -140, right: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,.42),transparent 66%)", filter: "blur(10px)" }} />
        <div className="ezl-orb-b" style={{ position: "absolute", bottom: -180, left: -100, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.3),transparent 68%)", filter: "blur(10px)" }} />

        <div className="ezl-wrap" style={{ position: "relative" }}>
          <div key={slide} className="ezl-grid ezl-auto-330 ezl-slide-in" style={{ alignItems: "center", padding: "72px 0 30px" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "#60A5FA", border: "1px solid rgba(96,165,250,.4)", borderRadius: 999, padding: "7px 15px" }}>{s.eyebrow}</span>
              <h1 className="ezl-h1">{s.head}</h1>
              <p style={{ margin: "24px 0 0", fontSize: 20, maxWidth: "44ch", color: "rgba(255,255,255,.78)" }}>{s.body}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
                <a href={s.ctaHref} className="ezl-btn ezl-btn-lg"><Icon name={s.ctaIcon} size={20} />{s.ctaLabel}</a>
                <a href={s.altHref} className="ezl-btn-ghost">{s.altIcon && <Icon name={s.altIcon} size={20} />}{s.altLabel}</a>
              </div>
            </div>
            <figure style={{ margin: 0, position: "relative" }}>
              <img src={s.img} alt={s.alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, boxShadow: "0 30px 70px rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.14)" }} />
              <div className="ezl-float ezl-hero-badge" style={{ position: "absolute", left: -24, bottom: 34, background: "#fff", color: NAVY, padding: "13px 17px", borderRadius: 12, boxShadow: "0 16px 40px rgba(0,0,0,.34)", animationDuration: s.floatDur }}>
                <div style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#5b6b86" }}>{s.badgeLabel}</div>
                <div style={{ fontSize: 29, fontWeight: 600, lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>{s.badgeValue}</div>
              </div>
            </figure>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "0 0 34px" }}>
            <button type="button" className="ezl-round" aria-label="Previous slide" onClick={() => go(slide - 1)}><Icon name="ph-arrow-left" size={20} /></button>
            <button type="button" className="ezl-round" aria-label="Next slide" onClick={() => go(slide + 1)}><Icon name="ph-arrow-right" size={20} /></button>
            <div style={{ display: "flex", gap: 10, marginLeft: 6 }}>
              {SLIDES.map((_, i) => (
                <button key={i} type="button" className="ezl-dot" data-on={i === slide ? "1" : "0"} aria-label={`Slide ${i + 1}`} onClick={() => go(i)} />
              ))}
            </div>
            <span style={{ marginLeft: "auto", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontVariantNumeric: "tabular-nums" }}>
              {`0${slide + 1} / 0${SLIDES.length}`}
            </span>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div style={{ background: "#16223c", borderTop: "1px solid rgba(255,255,255,.09)", overflow: "hidden", padding: "14px 0" }}>
        <div className="ezl-marquee-track" style={{ fontSize: 13.5, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.62)" }}>
          {[0, 1].map((copy) => (
            <span key={copy} style={{ display: "flex", gap: 32, paddingRight: 32 }} aria-hidden={copy === 1}>
              {MARQUEE.map((m) => (
                <span key={m} style={{ display: "flex", gap: 32 }}>
                  <span>{m}</span><span style={{ color: "#3B82F6" }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* stats */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "74px 24px 20px" }}>
        <div className="ezl-grid ezl-auto-210">
          <Reveal>
            <div className="ezl-num" style={{ color: ROYAL }}><CountUp target={2000} final="2,000+" /></div>
            <div style={{ marginTop: 10, fontSize: 15, color: MUTED, maxWidth: "22ch" }}>Shops, wholesalers and distributors running Ezzy ERP</div>
          </Reveal>
          <Reveal>
            <div className="ezl-num">24×7</div>
            <div style={{ marginTop: 10, fontSize: 15, color: MUTED, maxWidth: "22ch" }}>Support on call and WhatsApp, in your language</div>
          </Reveal>
          <Reveal>
            <div className="ezl-num">4</div>
            <div style={{ marginTop: 10, fontSize: 15, color: MUTED, maxWidth: "22ch" }}>Verticals: garments, footwear, electronics, departmental</div>
          </Reveal>
          <Reveal>
            <img src={`${IMG}/iso-certified-logo.jpg`} alt="ISO certified" style={{ height: 54, width: "auto", mixBlendMode: "multiply" }} />
            <div style={{ marginTop: 10, fontSize: 15, color: MUTED, maxWidth: "22ch" }}>ISO certified software house with real onboarding</div>
          </Reveal>
        </div>
      </section>

      {/* industries */}
      <section id="industries" className="ezl-sec" style={{ scrollMarginTop: 70 }}>
        <Reveal as="h2" className="ezl-h2" style={{ maxWidth: "20ch" }}>Built for the counter you stand behind.</Reveal>
        <Reveal as="p" className="ezl-lead">One billing, inventory and GST software, tuned per trade — because a saree shop, a shoe showroom and a mobile counter do not sell the same way.</Reveal>
        <div className="ezl-grid ezl-auto-270">
          {INDUSTRIES.map((ind) => (
            <Reveal key={ind.title} className="ezl-card">
              <div className="ezl-tile" style={{ background: ind.tileBg }}><Icon name={ind.icon} size={28} color={ind.tileFg} /></div>
              <h3 style={{ margin: "20px 0 6px", fontSize: 23, lineHeight: 1.15 }}>{ind.title}</h3>
              <p style={{ margin: "0 0 16px", fontSize: 14.5, color: SOFT }}>{ind.sub}</p>
              <div style={{ display: "grid", gap: 9, fontSize: 15 }}>
                {ind.points.map((p) => (
                  <span key={p} className="ezl-tick"><Icon name="ph-check-circle" size={19} color="#16A34A" style={{ flexShrink: 0 }} />{p}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* modules */}
      <section id="modules" className="ezl-sec" style={{ scrollMarginTop: 70 }}>
        <Reveal as="h2" className="ezl-h2" style={{ maxWidth: "22ch" }}>Everything the shop needs, in one login.</Reveal>
        <Reveal as="p" className="ezl-lead" style={{ maxWidth: "54ch" }}>Twelve working modules — not a feature list. Every one of these is a screen your staff will open today.</Reveal>
        <div className="ezl-grid ezl-auto-250">
          {MODULES.map(([icon, color, title, body]) => (
            <Reveal key={title} className="ezl-rowtop">
              <Icon name={icon} size={32} color={color} />
              <h3 style={{ margin: "14px 0 7px", fontSize: 20 }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 15, color: MUTED }}>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* inside the software */}
      <section id="inside" style={{ background: PALE, marginTop: 66, padding: "78px 0", scrollMarginTop: 70 }}>
        <div className="ezl-wrap">
          <Reveal as="p" className="ezl-eyebrow">Real screens</Reveal>
          <Reveal as="h2" className="ezl-h2" style={{ maxWidth: "20ch" }}>Look inside the software.</Reveal>
          <Reveal as="p" className="ezl-lead" style={{ margin: "18px 0 30px" }}>Seven screens from a live shop's books — captured as they are, not redrawn.</Reveal>

          <Reveal role="tablist" style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 24 }}>
            {SHOTS.map((sh, i) => (
              <button key={sh.tab} type="button" className="ezl-tab" data-on={i === shot ? "1" : "0"} onClick={() => setShot(i)}>{sh.tab}</button>
            ))}
          </Reveal>

          <Reveal as="figure" style={{ margin: 0 }}>
            <div style={{ background: NAVY, borderRadius: 14, padding: "11px 11px 0", boxShadow: "0 30px 66px rgba(15,23,42,.22)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "0 4px 10px" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
                <span style={{ marginLeft: 12, fontSize: 12.5, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.62)" }}>
                  {`EzzyERP — ${SHOTS[shot].tab}`}
                </span>
              </div>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1366/700", background: "#fff", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
                {SHOTS.map((sh, i) => (
                  <img
                    key={sh.file}
                    src={`${IMG}/${sh.file}`}
                    alt={sh.alt}
                    loading="lazy"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "center top", opacity: i === shot ? 1 : 0, transition: "opacity .45s ease" }}
                  />
                ))}
              </div>
            </div>
            <figcaption style={{ margin: "16px 0 0", fontSize: 14.5, color: SOFT, maxWidth: "70ch" }}>{SHOTS[shot].cap}</figcaption>
          </Reveal>
        </div>
      </section>

      {/* hardware */}
      <section id="hardware" className="ezl-sec" style={{ padding: "78px 24px 40px", scrollMarginTop: 70 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <Reveal as="h2" className="ezl-h2" style={{ maxWidth: "22ch" }}>Software, printers and scanners — one supplier.</Reveal>
            <Reveal as="p" className="ezl-lead" style={{ margin: "18px 0 0" }}>We supply and install the counter hardware with the licence, so the barcode you print scans on day one.</Reveal>
          </div>
          <Reveal as="a" href="#demo" className="ezl-btn" style={{ flexShrink: 0 }}>Get a hardware quote</Reveal>
        </div>

        <Reveal as="figure" style={{ margin: "46px 0 0", borderRadius: 12, overflow: "hidden", boxShadow: "0 26px 60px rgba(15,23,42,.18)" }}>
          <img src={`${IMG}/pos-hero.jpg`} alt="Complete Ezzy ERP POS solution — barcode scanner, touch terminal running the POS billing screen, cash drawer, Epson receipt printer with a printed bill, TSC barcode printer with a T-shirt label, billing rolls and barcode label rolls" style={{ width: "100%", height: "auto", display: "block" }} />
        </Reveal>

        <div className="ezl-grid ezl-auto-228" style={{ marginTop: 24 }}>
          {HARDWARE.map(([file, alt, kicker, title, body]) => (
            <Reveal key={file} as="figure" className="ezl-card ezl-card-sm" style={{ margin: 0 }}>
              <div style={{ aspectRatio: "1/1", borderRadius: 8, overflow: "hidden", background: PALE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={`${IMG}/${file}`} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
              </div>
              <figcaption style={{ marginTop: 16 }}>
                <div className="ezl-kicker">{kicker}</div>
                <div style={{ fontSize: 20, marginTop: 4 }}>{title}</div>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: SOFT }}>{body}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* mobile app */}
      <section id="mobile" className="ezl-sec" style={{ padding: "78px 24px 40px", scrollMarginTop: 70 }}>
        <div className="ezl-grid ezl-auto-320" style={{ alignItems: "center" }}>
          <div>
            <Reveal as="p" className="ezl-eyebrow">Android app</Reveal>
            <Reveal as="h2" className="ezl-h2" style={{ fontSize: "clamp(30px,3.4vw,48px)", lineHeight: 1.06, maxWidth: "20ch" }}>Your shop in your pocket.</Reveal>
            <Reveal as="p" className="ezl-lead" style={{ margin: "20px 0 0", maxWidth: "44ch" }}>Owners watch the counter from anywhere. Salesmen take orders and collect outstanding in the market — offline, then synced.</Reveal>
            <div style={{ marginTop: 28, display: "grid", gap: 2 }}>
              {[
                ["ph-chart-donut", "#7C3AED", "Owner dashboard", " — today's sales, stock and dues, read-only and safe to share."],
                ["ph-map-pin-area", "#D9480F", "Field sales app", " — new orders, customer visits and outstanding on the road."],
                ["ph-wifi-slash", "#059669", "Works without network", " — an offline indicator, background sync when the signal returns."],
              ].map(([icon, color, strong, rest]) => (
                <Reveal key={strong} style={{ display: "flex", gap: 14, padding: "18px 0", borderTop: `1px solid ${LINE}` }}>
                  <Icon name={icon} size={26} color={color} style={{ flexShrink: 0 }} />
                  <div><strong style={{ fontWeight: 600 }}>{strong}</strong>{rest}</div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 18 }}>
            <div className="ezl-float-slow ezl-phone" style={{ width: 186, flexShrink: 0, background: NAVY, borderRadius: 30, padding: 8, boxShadow: "0 20px 46px rgba(15,23,42,.24)" }}>
              <img src={`${IMG}/app-newsale.jpg`} alt="EzzyERP mobile app — New sale screen with barcode search, fast picks and cash, UPI, card, later payment buttons" style={{ width: "100%", height: "auto", display: "block", borderRadius: 23 }} />
            </div>
            <div className="ezl-phone" style={{ width: 230, flexShrink: 0, background: NAVY, borderRadius: 34, padding: 9, boxShadow: "0 28px 64px rgba(15,23,42,.32)" }}>
              <img src={`${IMG}/app-home.jpg`} alt="EzzyERP mobile app home — revenue today, gross profit, customer and supplier outstanding, and a seven-day sales chart" style={{ width: "100%", height: "auto", display: "block", borderRadius: 26 }} />
            </div>
          </Reveal>
        </div>

        <div style={{ marginTop: 64 }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "baseline", justifyContent: "space-between", paddingBottom: 14, borderBottom: `2px solid ${NAVY}` }}>
            <h3 style={{ margin: 0, fontSize: 25 }}>Mobile app screens</h3>
            <span style={{ fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", color: SOFT }}>Live screens from the Android app</span>
          </Reveal>
          <div className="ezl-grid ezl-appgrid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 28, marginTop: 34 }}>
            {APP_SCREENS.map(([file, title, alt, body]) => (
              <Reveal key={file} as="figure" style={{ margin: 0 }}>
                <div style={{ background: NAVY, borderRadius: 28, padding: 8, boxShadow: "0 18px 40px rgba(15,23,42,.16)" }}>
                  <img src={`${IMG}/${file}`} alt={alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block", borderRadius: 21 }} />
                </div>
                <figcaption style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>{title}</div>
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: SOFT }}>{body}</p>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* why */}
      <section style={{ background: NAVY, color: "#fff", marginTop: 66, padding: "78px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="ezl-wrap" style={{ position: "relative" }}>
          <Reveal as="h2" className="ezl-h2" style={{ maxWidth: "20ch", color: "#fff" }}>Why shopkeepers stay with Ezzy ERP.</Reveal>
          <div className="ezl-grid ezl-auto-255" style={{ marginTop: 42 }}>
            {WHY.map(([icon, color, title, body]) => (
              <Reveal key={title} style={{ padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.2)" }}>
                <Icon name={icon} size={30} color={color} />
                <h3 style={{ margin: "13px 0 7px", fontSize: 20, color: "#fff" }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,.8)" }}>{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials — placeholder quotes, replace with approved ones */}
      <section className="ezl-sec" style={{ padding: "78px 24px 40px" }}>
        <Reveal as="h2" className="ezl-h2" style={{ margin: "0 0 44px", maxWidth: "20ch" }}>From the counter.</Reveal>
        <div className="ezl-grid ezl-auto-275">
          {QUOTES.map(([quote, who]) => (
            <Reveal key={who} as="blockquote" style={{ margin: 0, background: PALE, borderRadius: 12, padding: 30 }}>
              <Icon name="ph-quotes" size={30} color="#3B82F6" />
              <p style={{ margin: "14px 0 0", fontSize: 20, fontStyle: "italic", lineHeight: 1.45 }}>{quote}</p>
              <footer style={{ marginTop: 18, fontSize: 13.5, letterSpacing: ".06em", textTransform: "uppercase", color: SOFT }}>{who}</footer>
            </Reveal>
          ))}
        </div>
      </section>

      {/* faq */}
      <section id="faq" className="ezl-sec" style={{ padding: "78px 24px 20px", scrollMarginTop: 70 }}>
        <Reveal as="p" className="ezl-eyebrow">FAQ</Reveal>
        <Reveal as="h2" className="ezl-h2" style={{ maxWidth: "22ch" }}>Questions shop owners ask us.</Reveal>
        <div style={{ marginTop: 34, borderTop: `1px solid ${LINE}` }}>
          {FAQS.map(([q, a]) => (
            <details key={q} className="ezl-faq">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* demo */}
      <section id="demo" className="ezl-sec" style={{ padding: "78px 24px 90px", scrollMarginTop: 70 }}>
        <div className="ezl-grid ezl-auto-330" style={{ alignItems: "start" }}>
          <div>
            <Reveal as="p" className="ezl-eyebrow">Free demo · no obligation</Reveal>
            <Reveal as="h2" className="ezl-h2" style={{ fontSize: "clamp(34px,4vw,58px)", lineHeight: 1.03, maxWidth: "18ch" }}>Ready to grow your business?</Reveal>
            <Reveal as="p" className="ezl-lead" style={{ margin: "20px 0 0", maxWidth: "40ch" }}>Tell us what you sell. We will show you the exact billing screen your shop would use — on your products, with your labels.</Reveal>
            <Reveal style={{ marginTop: 32, display: "grid", gap: 16 }}>
              {[
                [TEL, "ph-phone-call", "#2563EB", "Call", PHONE],
                [waLink(), "ph-whatsapp-logo", "#16A34A", "WhatsApp", PHONE],
                [`mailto:${MAIL}`, "ph-envelope-simple", "#DB2777", "Email", MAIL],
              ].map(([href, icon, color, label, value]) => (
                <a key={label} href={href} {...(href.startsWith("https://wa.me") ? { target: "_blank", rel: "noopener", onClick: () => track("whatsapp_click", { location: "demo" }) } : {})} style={{ display: "flex", gap: 14, alignItems: "center", color: NAVY, textDecoration: "none" }}>
                  <Icon name={icon} size={30} color={color} />
                  <span>
                    <span style={{ display: "block", fontSize: 11.5, letterSpacing: ".16em", textTransform: "uppercase", color: SOFT }}>{label}</span>
                    <span style={{ fontSize: 22, fontVariantNumeric: "tabular-nums" }}>{value}</span>
                  </span>
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal as="form" onSubmit={onSubmit} style={{ display: "grid", gap: 18, background: PALE, borderRadius: 12, padding: 34 }}>
            <div className="ezl-grid ezl-auto-170">
              <div className="ezl-field"><label htmlFor="ez-name">Your name</label><input className="ezl-input" id="ez-name" name="name" type="text" required placeholder="Full name" /></div>
              <div className="ezl-field"><label htmlFor="ez-phone">Mobile number</label><input className="ezl-input" id="ez-phone" name="phone" type="tel" required pattern="[0-9+ ]{10,15}" placeholder="10-digit mobile" /></div>
            </div>
            <div className="ezl-grid ezl-auto-170">
              <div className="ezl-field"><label htmlFor="ez-shop">Shop / firm name</label><input className="ezl-input" id="ez-shop" name="shop" type="text" placeholder="As printed on the bill" /></div>
              <div className="ezl-field"><label htmlFor="ez-city">City</label><input className="ezl-input" id="ez-city" name="city" type="text" placeholder="City" /></div>
            </div>
            <div className="ezl-field">
              <label htmlFor="ez-trade">What do you sell?</label>
              <select className="ezl-input" id="ez-trade" name="trade">
                {TRADES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="ezl-field"><label htmlFor="ez-note">Anything we should know?</label><input className="ezl-input" id="ez-note" name="note" type="text" placeholder="Counters, branches, current software…" /></div>
            <button type="submit" className="ezl-submit" disabled={!!sent || sending}>{sent ? "Thank you — we will call you" : sending ? "Sending…" : "Book my free demo"}</button>
            {failed ? (
              <p style={{ margin: 0, fontSize: 14, color: "#b42318" }}>
                We could not save your request. <a href={failed} target="_blank" rel="noopener" style={{ color: "#16A34A", fontWeight: 600 }}>Send it on WhatsApp instead</a> or call {PHONE}.
              </p>
            ) : (
              <p style={{ margin: 0, fontSize: 14, color: sent ? "#1a49b8" : SOFT, minHeight: 20 }}>
                {sent ? `Request noted. Our team will call ${sent} today.` : "We use your number only to call you about the demo."}
                {sent && <> Want to talk now? <a href={waLink()} target="_blank" rel="noopener" style={{ color: "#16A34A", fontWeight: 600 }}>WhatsApp us</a>.</>}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: NAVY, color: "rgba(255,255,255,.8)", padding: "56px 0 32px" }}>
        <div className="ezl-wrap">
          <div className="ezl-grid ezl-auto-200" style={{ alignItems: "start" }}>
            <div>
              <span style={{ display: "inline-flex", background: "#fff", borderRadius: 8, padding: "9px 14px" }}>
                <img src={`${IMG}/ezzy-logo-tight.jpg`} alt="EzzyERP" style={{ height: 30, width: "auto" }} />
              </span>
              <p style={{ margin: "16px 0 0", fontSize: 15, maxWidth: "30ch" }}>Smart Billing. Seamless Inventory. Easy Barcode Management. ERP for retail, wholesale and distribution.</p>
              <div style={{ display: "flex", gap: 18, marginTop: 20, fontSize: 12.5, color: "rgba(255,255,255,.62)" }}>
                {[["ph-cloud", "Cloud based"], ["ph-lock-key", "Secure"], ["ph-headset", "24×7"]].map(([icon, label]) => (
                  <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name={icon} size={17} color="#60A5FA" />{label}</span>
                ))}
              </div>
              {SOCIAL.length > 0 && (
                <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
                  {SOCIAL.map(([icon, label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noopener me" aria-label={`Ezzy ERP on ${label}`} style={{ color: "#fff" }}><Icon name={icon} size={24} /></a>
                  ))}
                </div>
              )}
            </div>
            {[
              ["Trades", [["#industries", "Garments & textiles"], ["#industries", "Footwear"], ["#industries", "Mobiles & electronics"], ["#industries", "Departmental stores"]]],
              ["Product", [["#modules", "Modules"], ["#inside", "Screenshots"], ["#hardware", "Hardware"], ["#mobile", "Android app"], ["#faq", "FAQ"]]],
            ].map(([heading, links]: any) => (
              <div key={heading}>
                <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 14 }}>{heading}</div>
                <div style={{ display: "grid", gap: 9, fontSize: 15 }}>
                  {links.map(([href, label]: [string, string], i: number) => (
                    <a key={`${label}-${i}`} href={href} style={{ color: "rgba(255,255,255,.85)" }}>{label}</a>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 14 }}>Talk to us</div>
              <div style={{ display: "grid", gap: 9, fontSize: 15 }}>
                <a href={TEL} style={{ color: "#fff", fontVariantNumeric: "tabular-nums", fontSize: 18 }}>{PHONE}</a>
                <a href={`mailto:${MAIL}`} style={{ color: "rgba(255,255,255,.85)" }}>{MAIL}</a>
                <a href={waLink()} target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,.85)" }}>WhatsApp us</a>
                <a href={MAP} target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,.85)", fontSize: 14, maxWidth: "28ch" }}>
                  <address style={{ fontStyle: "normal" }}>{ADDRESS}</address>
                </a>
                <a href={DIRECTIONS} target="_blank" rel="noopener" style={{ color: "#60A5FA", fontSize: 14 }} onClick={() => track("directions_click", { location: "footer" })}>Get directions →</a>
                <a href="#demo" className="ezl-btn" style={{ padding: "11px 20px", marginTop: 8, justifySelf: "start" }}>Book free demo</a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 42, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.16)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,.55)" }}>
            <span>© 2026 EzzyERP · Adtech ERP Solutions, Navi Mumbai</span>
            <span>Made for Indian retail counters</span>
          </div>
        </div>
      </footer>

      <div className="ezl-floats">
        <a href={waLink()} target="_blank" rel="noopener" aria-label="Chat with Ezzy ERP on WhatsApp" className="ezl-btn ezl-wa" onClick={() => track("whatsapp_click", { location: "float" })}>
          <Icon name="ph-whatsapp-logo" size={22} /><span className="ezl-float-label">WhatsApp</span>
        </a>
        <a href={TEL} aria-label="Call Ezzy ERP" className="ezl-btn ezl-callnow" onClick={() => track("phone_click", { location: "float" })}>
          <Icon name="ph-phone-call" size={20} /><span className="ezl-float-label">Call now</span>
        </a>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }} />
    </div>
  );
}
