import { useRef, useState } from "react";
import { NAVY, ROYAL, MUTED, SOFT, LINE, PALE, track } from "../site";

/* ------------------------------------------------------------------ *
 * GST calculator for clothes and footwear, shown on the GST posts.
 * Search Console shows people typing sums ("2500+18%", "2625", "under
 * 2000?") into Google; a rate table answers those in the search result
 * itself, a calculator gives them a reason to open the page.
 *
 * The rule is the one the articles state: 5% when the value of a piece
 * (or pair) before GST is ₹2,500 or less, 18% above it, checked after
 * any discount given on the bill.
 * ------------------------------------------------------------------ */

const LIMIT = 2500;
/** The highest GST-inclusive price that still has a value of ₹2,500 at 5%. */
const LIMIT_INCLUSIVE = LIMIT * 1.05;

export type GstResult = { rate: 5 | 18; value: number; gst: number; total: number; oddZone: boolean };

/** Works out the slab for one piece. `price` is the tag price, `discount` a percentage taken off on the bill. */
export function gstOnPiece(price: number, discount: number, inclusive: boolean): GstResult | null {
  if (!Number.isFinite(price) || price <= 0) return null;
  const off = Number.isFinite(discount) ? Math.min(Math.max(discount, 0), 100) : 0;
  const net = price * (1 - off / 100);
  if (net <= 0) return null;
  if (!inclusive) {
    const rate = net <= LIMIT ? 5 : 18;
    const gst = (net * rate) / 100;
    return { rate, value: net, gst, total: net + gst, oddZone: false };
  }
  const rate = net <= LIMIT_INCLUSIVE ? 5 : 18;
  const value = net / (1 + rate / 100);
  // Just above ₹2,625 the value at 18% falls back under ₹2,500; the articles tell shops to agree a rule with their CA.
  return { rate, value, gst: net - value, total: net, oddZone: rate === 18 && value <= LIMIT };
}

const TEXT = {
  en: {
    h2: (unit: string) => `GST calculator: 5% or 18% on your ${unit}?`,
    lead: (unit: string) => `Enter the price of one ${unit}. The slab is checked on its value after discount, not on the bill total.`,
    price: (unit: string) => `Price of one ${unit} (₹)`,
    discount: "Discount on the bill (%)",
    mode: "The price is",
    inclusive: "MRP, GST included",
    exclusive: "Before GST",
    rate: "GST rate",
    value: "Value before GST",
    gst: "GST",
    total: "Customer pays",
    empty: "Enter a price to see the GST.",
    odd: "This price sits just above ₹2,625, where the value before tax at 18% comes out under ₹2,500. Shops treat this band differently, so agree a rule with your CA.",
    note: "Rates as notified from 22 September 2025. Confirm the HSN code and rate of each product with your CA.",
    cta: "Ezzy ERP picks the right slab on every bill line, after discount.",
    demo: "Book a free demo",
  },
  hi: {
    h2: () => "GST कैलकुलेटर: आपके पीस पर 5% या 18%?",
    lead: () => "एक पीस की कीमत डालें। स्लैब डिस्काउंट के बाद की कीमत से तय होता है, पूरे बिल से नहीं।",
    price: () => "एक पीस की कीमत (₹)",
    discount: "बिल पर डिस्काउंट (%)",
    mode: "यह कीमत",
    inclusive: "MRP है, GST शामिल",
    exclusive: "GST से पहले की है",
    rate: "GST रेट",
    value: "GST से पहले की कीमत",
    gst: "GST",
    total: "ग्राहक देगा",
    empty: "GST देखने के लिए कीमत डालें।",
    odd: "यह कीमत ₹2,625 से थोड़ी ऊपर है, जहाँ 18% निकालने पर कीमत फिर ₹2,500 से कम आती है। इस रेंज के लिए अपने CA से नियम तय करें।",
    note: "रेट 22 सितंबर 2025 से लागू। हर प्रोडक्ट का HSN कोड और रेट अपने CA से कन्फ़र्म करें।",
    cta: "Ezzy ERP हर बिल लाइन पर, डिस्काउंट के बाद, सही स्लैब अपने आप लगाता है।",
    demo: "फ्री डेमो बुक करें",
  },
};

const money = (n: number) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const field = { width: "100%", padding: "12px 14px", fontSize: 18, border: `1px solid #cbd5e1`, borderRadius: 8, background: "#fff", color: NAVY, font: "inherit" } as const;
const label = { display: "block", fontSize: 14.5, fontWeight: 600, color: NAVY, marginBottom: 6 } as const;

export default function GstCalculator({ unit, lang, productPath }: { unit: "piece" | "pair"; lang?: "hi"; productPath: string }) {
  const t = TEXT[lang ?? "en"];
  const [price, setPrice] = useState("1999");
  const [discount, setDiscount] = useState("");
  const [inclusive, setInclusive] = useState(true);
  const used = useRef(false);

  const result = gstOnPiece(parseFloat(price), parseFloat(discount || "0"), inclusive);
  const touch = () => {
    if (used.current) return;
    used.current = true;
    track("gst_calculator_used", { unit });
  };

  return (
    <section aria-labelledby="gst-calculator" style={{ marginTop: 34, background: PALE, border: `1px solid ${LINE}`, borderRadius: 14, padding: "26px 24px" }}>
      <h2 id="gst-calculator" style={{ margin: 0, fontSize: "clamp(22px,2.2vw,28px)", lineHeight: 1.2 }}>{t.h2(unit)}</h2>
      <p style={{ margin: "8px 0 0", fontSize: 16.5, color: MUTED }}>{t.lead(unit)}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginTop: 20 }}>
        <label>
          <span style={label}>{t.price(unit)}</span>
          <input type="number" inputMode="decimal" min="0" step="any" value={price} onChange={(e) => { setPrice(e.target.value); touch(); }} style={field} />
        </label>
        <label>
          <span style={label}>{t.discount}</span>
          <input type="number" inputMode="decimal" min="0" max="100" step="any" placeholder="0" value={discount} onChange={(e) => { setDiscount(e.target.value); touch(); }} style={field} />
        </label>
        <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
          <legend style={{ ...label, padding: 0 }}>{t.mode}</legend>
          {([[true, t.inclusive], [false, t.exclusive]] as const).map(([value, text]) => (
            <label key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: NAVY, padding: "5px 0", cursor: "pointer" }}>
              <input type="radio" name="gst-price-mode" checked={inclusive === value} onChange={() => { setInclusive(value); touch(); }} style={{ width: 18, height: 18, accentColor: ROYAL }} />
              {text}
            </label>
          ))}
        </fieldset>
      </div>

      <div aria-live="polite" style={{ marginTop: 20, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10, padding: "18px 20px" }}>
        {result ? (
          <>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px 20px" }}>
              {([[t.rate, `${result.rate}%`, true], [t.value, money(result.value), false], [t.gst, money(result.gst), false], [t.total, money(result.total), false]] as const).map(([name, value, big]) => (
                <div key={name}>
                  <dt style={{ fontSize: 14, color: SOFT }}>{name}</dt>
                  <dd style={{ margin: "2px 0 0", fontSize: big ? 30 : 21, fontWeight: 700, color: big ? ROYAL : NAVY, fontVariantNumeric: "tabular-nums" }}>{value}</dd>
                </div>
              ))}
            </dl>
            {result.oddZone && <p style={{ margin: "14px 0 0", fontSize: 15.5, color: "#92400e" }}>{t.odd}</p>}
          </>
        ) : (
          <p style={{ margin: 0, fontSize: 16.5, color: MUTED }}>{t.empty}</p>
        )}
      </div>

      <p style={{ margin: "14px 0 0", fontSize: 14.5, color: SOFT }}>{t.note}</p>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: NAVY }}>
        <a href={productPath}>{t.cta}</a>{" "}
        <a href="/#demo" style={{ fontWeight: 600, whiteSpace: "nowrap" }} onClick={() => track("demo_click", { location: "gst_calculator" })}>{t.demo} →</a>
      </p>
    </section>
  );
}
