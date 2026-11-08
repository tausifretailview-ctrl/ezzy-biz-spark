/* Blog posts: one article per question a shop owner types into Google.
 * Each post is prerendered at build time (src/entry-server.tsx) and listed
 * in public/sitemap.xml. Newest first.
 *
 * Same rules as the keyword pages (../seo/pages.ts): no prices, no client
 * names, and no claims about Ezzy ERP that the landing page does not make.
 * Tax facts must be ones a shop owner can check with their CA. */

export const BLOG_PATH = "/blog";
export const BLOG_HEAD = {
  title: "Ezzy ERP Blog — GST, Barcode and Stock Guides for Indian Shops",
  description: "Practical guides for garment, footwear and retail shop owners in India: GST on clothes, barcode label sizes, size and colour stock, and more.",
};

/** Paragraphs, list items and notes may contain links written as [text](/path). */
export type BlogBlock = {
  h2: string;
  paras?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  shot?: [file: string, alt: string];
  /** A short boxed note under the section. */
  note?: string;
};

export type BlogPost = {
  path: string;
  /** Short title for cards and breadcrumbs. */
  label: string;
  title: string;
  description: string;
  h1: string;
  /** ISO dates, shown on the page and used in the schema and sitemap. */
  published: string;
  updated: string;
  readMinutes: number;
  intro: string[];
  heroShot: [file: string, alt: string];
  body: BlogBlock[];
  faqs: [q: string, a: string][];
  /** Keyword pages this post points readers to. */
  related: string[];
  /** Set for a post written in Hindi; posts are English by default. */
  lang?: "hi";
};

export const BLOG_POSTS: BlogPost[] = [
  {
    path: "/blog/kapdon-par-gst-2026",
    lang: "hi",
    label: "कपड़ों पर GST 2026: ₹2,500 तक 5%, ऊपर 18%",
    title: "कपड़ों पर कितना GST लगता है 2026? ₹2,500 तक 5%, उससे ऊपर 18% | Ezzy ERP",
    description: "2026 में कपड़ों पर GST: एक पीस ₹2,500 या उससे कम में बिके तो 5%, उससे ज़्यादा में बिके तो 18%. HSN कोड, उदाहरण, डिस्काउंट और MRP के नियम आसान हिंदी में।",
    h1: "कपड़ों पर कितना GST लगता है 2026: ₹2,500 तक 5%, उससे ऊपर 18%",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMinutes: 5,
    intro: [
      "सीधा जवाब: 2026 में कपड़ों पर GST 5% है, अगर एक पीस ₹2,500 या उससे कम में बिकता है। अगर पीस ₹2,500 से ज़्यादा में बिकता है, तो GST 18% है। रेट हर पीस के हिसाब से तय होता है, पूरे बिल के हिसाब से नहीं। जूते-चप्पल पर भी ₹2,500 प्रति जोड़ी का यही नियम है।",
      "यह नियम 22 सितंबर 2025 से लागू है। इससे पहले सीमा ₹1,000 थी: ₹1,000 तक 5% और उससे ऊपर 12%.",
      "Read in English: [GST on clothes 2026](/blog/gst-on-clothes-above-2500)",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP बिलिंग स्क्रीन जिसमें हर लाइन पर अलग GST रेट है"],
    body: [
      {
        h2: "कपड़ों पर GST रेट एक नज़र में",
        table: {
          head: ["क्या बेचते हैं", "HSN चैप्टर", "₹2,500 तक", "₹2,500 से ऊपर"],
          rows: [
            ["बुने हुए (knitted) कपड़े: टी-शर्ट, इनरवियर, स्वेटर", "61", "5%", "18%"],
            ["शर्ट, पैंट, कुर्ता, सूट, ब्लेज़र", "62", "5%", "18%"],
            ["बेडशीट, पर्दे, तौलिये", "63", "5%", "18%"],
            ["जूते-चप्पल (प्रति जोड़ी)", "64", "5%", "18%"],
          ],
        },
        note: "कपड़ा (फ़ैब्रिक), धागा और कुछ ख़ास चीज़ों के रेट अलग हैं। हर प्रोडक्ट का HSN कोड और रेट एक बार अपने CA से ज़रूर कन्फ़र्म करें।",
      },
      {
        h2: "उदाहरण",
        paras: ["नीचे दी गई कीमतें GST से पहले की, प्रति पीस बिक्री कीमत हैं।"],
        table: {
          head: ["आइटम", "बिक्री कीमत", "GST रेट", "GST"],
          rows: [
            ["कॉटन शर्ट", "₹1,200", "5%", "₹60"],
            ["जींस", "₹2,400", "5%", "₹120"],
            ["₹2,800 का कुर्ता, 20% छूट पर", "₹2,240", "5%", "₹112"],
            ["ब्लेज़र", "₹3,200", "18%", "₹576"],
            ["शेरवानी", "₹8,000", "18%", "₹1,440"],
          ],
        },
      },
      {
        h2: "रेट हर पीस पर लगता है, पूरे बिल पर नहीं",
        paras: [
          "अगर ग्राहक ₹900 वाली चार शर्ट ख़रीदता है, तो बिल ₹3,600 का होने पर भी हर शर्ट पर 5% GST लगेगा। अगर कोई ₹3,200 का एक ब्लेज़र ख़रीदता है, तो उस ब्लेज़र पर 18% लगेगा, भले ही बाकी बिल में मोज़े और रुमाल 5% वाले हों।",
          "इसलिए एक ही बिल में दो GST रेट हो सकते हैं। आपका बिलिंग सॉफ्टवेयर हर लाइन पर उस पीस की कीमत से रेट तय करे, पूरे बिल पर एक रेट न लगाए।",
        ],
      },
      {
        h2: "डिस्काउंट से रेट कैसे बदलता है",
        paras: [
          "GST उस कीमत पर लगता है जिस पर आप पीस असल में बेचते हैं। अगर डिस्काउंट बिल पर ही, बिक्री के समय दिया गया है, तो स्लैब डिस्काउंट के बाद की कीमत से तय होता है।",
          "₹2,800 का कुर्ता 20% छूट पर ₹2,240 में बिकता है, तो उस पर 5% लगेगा, 18% नहीं। सेल के समय यह हर बिल पर फ़र्क़ डालता है।",
        ],
        list: [
          "डिस्काउंट बिल पर उसी आइटम के सामने दिखाएं।",
          "बिल के बाद नकद में दिया गया डिस्काउंट GST कम नहीं करता।",
          "बाद में मिलने वाली स्कीम या साल के आख़िर का डिस्काउंट GST क्रेडिट नोट से एडजस्ट होता है। देखें: [1 नवंबर 2026 से GST बदलाव](/blog/gst-changes-november-2026) (अंग्रेज़ी में).",
        ],
      },
      {
        h2: "जब MRP में GST शामिल हो",
        paras: [
          "ज़्यादातर कपड़े ऐसी MRP पर बिकते हैं जिसमें टैक्स शामिल होता है। स्लैब देखने के लिए पहले कीमत से GST निकालें।",
          "5% पर, ₹2,625 तक की MRP (GST सहित) वाले पीस की कीमत GST से पहले ₹2,500 तक आती है (₹2,625 ÷ 1.05), इसलिए वह 5% में रहता है। इससे ऊपर की MRP पर 18% लगता है।",
          "₹2,625 से थोड़ी ऊपर की MRP पर हिसाब उलझ जाता है, क्योंकि 18% निकालने पर कीमत फिर ₹2,500 से कम आती है। इस रेंज के लिए अपने CA से नियम तय करें, या इस रेंज में टैग कीमत रखने से बचें।",
        ],
      },
      {
        h2: "बिलिंग सॉफ्टवेयर में सही सेटिंग",
        list: [
          "हर प्रोडक्ट पर अपना HSN कोड और GST रेट हो, ताकि एक बिल में 5% और 18% दोनों आइटम आ सकें।",
          "रेट हर पीस की बिक्री कीमत से, लाइन डिस्काउंट के बाद, ₹2,500 के नियम से तय हो।",
          "MRP में GST शामिल वाली बिलिंग हो।",
          "महीने के आख़िर में GST रजिस्टर में बिक्री 5% और 18% में अलग-अलग दिखे।",
        ],
        paras: [
          "[Ezzy ERP गारमेंट बिलिंग सॉफ्टवेयर](/garment-shop-billing-software) में यह सब अपने आप होता है: हर लाइन पर GST रेट, साइज़-कलर स्टॉक, बारकोड टैग और WhatsApp पर बिल। जूतों की दुकान के लिए देखें [फ़ुटवियर बिलिंग सॉफ्टवेयर](/footwear-shop-billing-software).",
        ],
        shot: ["shot-gl.jpg", "Ezzy ERP में GST रिपोर्टिंग के लिए लेजर स्क्रीन"],
      },
    ],
    faqs: [
      ["कपड़ों पर कितना GST लगता है 2026 में?", "₹2,500 या उससे कम में बिकने वाले पीस पर 5% और ₹2,500 से ज़्यादा में बिकने वाले पीस पर 18% GST लगता है। यह 22 सितंबर 2025 से लागू है।"],
      ["₹2,500 की सीमा पूरे बिल पर है या हर पीस पर?", "हर पीस पर। एक ही बिल में कुछ आइटम 5% और कुछ 18% वाले हो सकते हैं।"],
      ["क्या डिस्काउंट से GST रेट बदलता है?", "हाँ, अगर डिस्काउंट बिक्री के समय बिल पर दिया गया हो। स्लैब डिस्काउंट के बाद की कीमत से तय होता है।"],
      ["क्या ₹1,000 से ऊपर के कपड़ों पर अब भी 12% GST है?", "नहीं। 22 सितंबर 2025 से कपड़ों का 12% स्लैब हट गया है। अब ₹2,500 तक 5% और उससे ऊपर 18% है।"],
      ["जूतों पर कितना GST है?", "₹2,500 प्रति जोड़ी तक 5% और उससे ऊपर 18%."],
    ],
    related: ["/garment-shop-billing-software", "/footwear-shop-billing-software"],
  },
  {
    path: "/blog/gst-on-footwear-2026",
    label: "GST on footwear 2026: 5% up to ₹2,500 a pair",
    title: "GST on Footwear 2026: 5% up to ₹2,500 per Pair, 18% Above (HSN 64) | Ezzy ERP",
    description: "GST on shoes, sandals and slippers in 2026: 5% up to ₹2,500 per pair and 18% above. HSN 64, examples, MRP-inclusive pricing, discounts and how footwear shops should bill it.",
    h1: "GST on footwear in 2026: 5% up to ₹2,500 a pair, 18% above",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMinutes: 4,
    intro: [
      "Quick answer: GST on footwear in 2026 is 5% when a pair sells for ₹2,500 or less, and 18% when it sells for more. The rate is decided for each pair, after any discount on the bill.",
      "This applies since 22 September 2025. Before that, footwear up to ₹1,000 a pair carried 12% and above that 18%, so most everyday chappals, sandals and school shoes are now cheaper to bill.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen used at a footwear counter"],
    body: [
      {
        h2: "Footwear GST at a glance",
        table: {
          head: ["Selling price per pair", "GST", "HSN"],
          rows: [
            ["Up to ₹2,500", "5%", "Chapter 64"],
            ["Above ₹2,500", "18%", "Chapter 64"],
          ],
        },
        note: "Parts of footwear and some special items can have other rates. Confirm the HSN code of each product with your CA.",
      },
      {
        h2: "Examples",
        paras: ["Prices below are the selling price per pair before GST."],
        table: {
          head: ["Item", "Selling price", "GST rate", "GST"],
          rows: [
            ["Rubber slippers", "₹250", "5%", "₹12.50"],
            ["School shoes", "₹900", "5%", "₹45"],
            ["Sports shoes", "₹2,400", "5%", "₹120"],
            ["Branded sneakers tagged ₹3,000, sold at 20% off", "₹2,400", "5%", "₹120"],
            ["Leather formal shoes", "₹4,500", "18%", "₹810"],
          ],
        },
      },
      {
        h2: "MRP, discounts and schemes",
        list: [
          "Footwear is sold at MRP with GST inside the price. At 5%, an MRP of up to ₹2,625 keeps the value within ₹2,500 (₹2,625 ÷ 1.05).",
          "A discount shown on the bill at the time of sale lowers the value the slab is checked on, so a ₹3,000 pair sold at ₹2,400 is taxed at 5%.",
          "Brand schemes and year-end discounts given later are settled by GST credit note; see [GST changes from 1 November 2026](/blog/gst-changes-november-2026).",
          "The same rules apply to clothing; see [GST on clothes 2026](/blog/gst-on-clothes-above-2500).",
        ],
      },
      {
        h2: "Bill it right at the counter",
        paras: [
          "A footwear bill often mixes a ₹300 pair of slippers with a ₹4,000 pair of shoes. Each line needs its own rate. [Ezzy ERP footwear billing software](/footwear-shop-billing-software) keeps a GST rate on every bill line, bills at MRP with GST inside the price, tracks stock by article and size, and prints a label for every box. Read our guide to [footwear stock by size run](/blog/footwear-stock-management-size-run) for the stock side.",
        ],
        shot: ["shot-purchase.jpg", "Ezzy ERP purchase entry with a size grid for footwear articles"],
      },
    ],
    faqs: [
      ["What is the GST on footwear in 2026?", "5% for footwear sold at ₹2,500 or less per pair, and 18% above ₹2,500 per pair, from 22 September 2025."],
      ["What is the GST on shoes above ₹1,000?", "If the pair sells for ₹2,500 or less, 5%. The old 12% rate for footwear above ₹1,000 no longer applies."],
      ["What is the HSN code for footwear?", "Footwear falls under HSN chapter 64. Use the full code for each product as advised by your CA."],
      ["Does a discount change the GST on footwear?", "Yes, when the discount is on the bill at the time of sale. The slab is checked on the price after the discount."],
    ],
    related: ["/footwear-shop-billing-software", "/garment-shop-billing-software"],
  },
  {
    path: "/blog/gst-changes-november-2026",
    label: "GST changes from 1 November 2026",
    title: "GST Changes from 1 November 2026: Discounts, Credit Notes, Refunds, Scrap | Ezzy ERP",
    description: "What changed in GST from 1 November 2026 for shops, wholesalers and manufacturers: post-sale discounts by credit note, faster refunds, scrap registration and TDS, and what comes next.",
    h1: "GST changes from 1 November 2026: what shops, wholesalers and manufacturers need to know",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMinutes: 6,
    intro: [
      "A set of GST changes came into force on 1 November 2026, with more planned for 1 January and 1 April 2027. Most of them are about how discounts, credit notes and refunds work, which touches almost every trader who gives or receives schemes, and every manufacturer who sells scrap.",
      "Here is a plain summary of what changed, who it affects, and what to do in your billing. It is a guide, not legal advice: confirm the details for your business with your CA.",
    ],
    heroShot: ["shot-gl.jpg", "Ezzy ERP general ledger with debit, credit and running balance"],
    body: [
      {
        h2: "1. Discounts after the sale: a credit note is now enough",
        paras: [
          "Until October 2026, a discount given after the sale (a year-end scheme, a turnover discount, a rate difference) reduced the taxable value only if it was agreed before the sale and linked to specific invoices. Many brand and distributor schemes failed that test, so GST stayed on the full invoice value.",
          "From 1 November 2026, those two conditions are gone. A post-sale discount reduces the taxable value when the supplier issues a GST credit note and the buyer reverses the input tax credit on it.",
        ],
        note: "Example: a distributor sells goods for ₹1,00,000 + 18% GST and later gives a 5% scheme of ₹5,000. It issues a credit note for ₹5,000 + ₹900 GST, and the buyer reverses ₹900 of input tax credit.",
        list: [
          "If you give schemes: issue proper GST credit notes, not plain discount letters or cash adjustments.",
          "If you receive schemes: reverse the input tax credit shown on the supplier's credit note in your return.",
          "If you are above the e-invoice limit, credit notes need an IRN too. See our [e-invoice limit guide](/blog/e-invoice-limit-2026).",
        ],
      },
      {
        h2: "2. Refunds get faster",
        paras: [
          "The time for the department to acknowledge a refund application or point out deficiencies has been cut from 15 days to 10 days, and automated, risk-based processing of refunds is being rolled out for new claims. Exporters and businesses with an inverted duty structure (input taxed higher than output, common in textiles and some manufacturing) are the main gainers, including refunds of credit on input services availed from 1 November 2026.",
        ],
      },
      {
        h2: "3. Scrap and waste: registration and 2% TDS",
        paras: [
          "Suppliers of metal scrap, plastic waste, tyre waste, used cooking oil and e-waste now have to register for GST, and reverse charge applies when unregistered persons sell some of these to registered buyers.",
          "Registered buyers of these goods must deduct 2% GST TDS on purchases from registered sellers above ₹2.5 lakh per contract, file the TDS return and register as a tax deductor. Manufacturers who sell production scrap, and units that buy it, should check both sides of this rule with their CA.",
        ],
      },
      {
        h2: "4. Smaller changes worth knowing",
        list: [
          "Delivery through e-commerce operators is now taxed at 5% without input tax credit, with the operator paying the tax in most cases.",
          "Retreaded tractor tyres move from 18% to 5%, and psyllium (isabgol) seeds are exempt.",
          "Draft new GSTR-1, GSTR-1A and IFF forms were released for comment; the revised forms are planned from 1 April 2027.",
        ],
      },
      {
        h2: "5. What is coming next",
        list: [
          "From 1 January 2027: e-invoicing extends to certain reverse-charge purchases from unregistered persons and to import of services, for businesses that are already under e-invoicing.",
          "Approved in principle: an optional annual-return, quarterly-payment scheme for businesses up to ₹5 crore that sell only to unregistered customers (most retail shops fall here), and a late fee waiver for small taxpayers who file within the month.",
          "Planned for 1 April 2027: changes to e-way bill provisions, a higher prosecution threshold, and the new return forms. See our [e-way bill rules guide](/blog/e-way-bill-rules-2026) for the rules as they stand today.",
        ],
        note: "Dates for the approved-in-principle items have not been notified yet. Watch for notifications before you change how you file.",
      },
      {
        h2: "What to set up in your billing software",
        paras: [
          "Most of these changes land on credit notes and returns, so the safest place to handle them is the software you bill from. [Ezzy ERP](/billing-software-for-manufacturers) issues GST credit notes against the sale, generates the e-invoice IRN where you need one, and prepares the GSTR-1 file and GSTR-3B figures with the credit notes already in them. Shops get the same from [Ezzy ERP for garment shops](/garment-shop-billing-software).",
        ],
      },
    ],
    faqs: [
      ["What changed in GST on 1 November 2026?", "Post-sale discounts no longer need a prior agreement or invoice-wise linking; a GST credit note plus input tax credit reversal by the buyer is enough. Refund timelines were shortened, scrap and waste suppliers must register, and buyers of scrap must deduct 2% TDS above ₹2.5 lakh per contract."],
      ["Do I need a credit note for a year-end discount?", "Yes. To reduce GST on a discount given after the sale, the supplier must issue a GST credit note, and the buyer must reverse the input tax credit on it."],
      ["Does the new discount rule apply to discounts on the bill?", "No. A discount shown on the invoice at the time of sale already reduces the taxable value. The change is about discounts given later."],
      ["Are GST return forms changing?", "Draft GSTR-1, GSTR-1A and IFF forms were released for comment in November 2026. The revised forms are planned from 1 April 2027."],
    ],
    related: ["/billing-software-for-manufacturers", "/wholesale-billing-software"],
  },
  {
    path: "/blog/e-invoice-limit-2026",
    label: "E-invoice limit 2026: ₹5 crore and the 30-day rule",
    title: "E-Invoice Limit 2026: ₹5 Crore Turnover, 30-Day Rule & Who Must Comply | Ezzy ERP",
    description: "Who must issue GST e-invoices in 2026: the ₹5 crore turnover limit, which documents need an IRN, the 30-day reporting rule for ₹10 crore+ businesses, exemptions and what happens if you miss it.",
    h1: "E-invoice limit in 2026: the ₹5 crore rule, the 30-day rule and who must comply",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMinutes: 6,
    intro: [
      "E-invoicing is now part of daily billing for most growing manufacturers, wholesalers and distributors in India. The rules are short, but two details trip people up: the turnover limit is checked on every year since 2017-18, and bigger businesses get only 30 days to report an invoice.",
      "Here is what applies in 2026, and how to make e-invoicing part of your normal billing instead of a second job on the portal.",
    ],
    heroShot: ["shot-accounts.jpg", "Ezzy ERP accounts screen with customer ledger, outstanding and net receivable"],
    body: [
      {
        h2: "Who must issue e-invoices",
        paras: [
          "A registered business must issue e-invoices if its aggregate turnover crossed ₹5 crore in any financial year from 2017-18 onwards. Aggregate turnover is counted for the whole PAN, across all GST registrations in all states.",
          "Once you cross the limit in any one year, e-invoicing applies from then on, even if turnover later falls.",
        ],
        table: {
          head: ["Turnover (any year since 2017-18)", "E-invoice", "30-day reporting limit"],
          rows: [
            ["Up to ₹5 crore", "Not required", "Not applicable"],
            ["Above ₹5 crore, below ₹10 crore", "Required for covered documents", "Not applied at present"],
            ["₹10 crore and above", "Required for covered documents", "Report within 30 days of the document date"],
          ],
        },
      },
      {
        h2: "Which documents need an IRN",
        list: [
          "Tax invoices for sales to registered businesses (B2B).",
          "Exports and supplies to SEZ units.",
          "Credit notes and debit notes on those sales. This matters more now that post-sale discounts are settled by credit note; see [GST changes from 1 November 2026](/blog/gst-changes-november-2026).",
        ],
        paras: [
          "Ordinary bills to consumers (B2C) do not need an IRN. A shop that sells only to walk-in customers is outside e-invoicing even above ₹5 crore, but its B2B sales to other businesses are covered.",
        ],
      },
      {
        h2: "The 30-day rule for ₹10 crore+ businesses",
        paras: [
          "Since 1 April 2025, businesses with aggregate turnover of ₹10 crore or more cannot report an invoice, credit note or debit note to the Invoice Registration Portal once it is more than 30 days old. The portal simply rejects it.",
          "In practice this means e-invoices must be generated as you bill, not collected at month end. A bill left without an IRN for a month cannot be fixed later.",
        ],
      },
      {
        h2: "Who is exempt",
        paras: [
          "Some classes are exempt regardless of turnover, including banks, insurance companies, NBFCs and other specified financial institutions, goods transport agencies, passenger transport services, specified cinema admissions, and SEZ units. The exemption is for the entity, so check yours with your CA.",
        ],
      },
      {
        h2: "What happens if you miss it",
        list: [
          "An invoice that should have had an IRN is not a valid tax invoice under the GST rules, which puts your buyer's input tax credit at risk. Buyers notice this quickly.",
          "Penalties can apply under the GST Act.",
          "Filing GSTR-1 does not fix a missing IRN.",
        ],
      },
      {
        h2: "Make it part of billing",
        paras: [
          "The simplest way to stay inside the rules is to generate the IRN from the same bill you print. In [Ezzy ERP e-invoice software](/e-invoice-software) you make the GST invoice as usual and generate the e-invoice from it; the IRN, acknowledgement number and signed QR code are saved on the bill and printed on it. An e-invoice report shows any B2B bill still without an IRN, and you can cancel an IRN from the same screen within the time the rules allow (24 hours on the portal).",
          "Manufacturers get quotations, sale orders, challans, e-way bills and GST returns in the same system. See [billing software for manufacturers](/billing-software-for-manufacturers).",
        ],
      },
    ],
    faqs: [
      ["What is the e-invoice limit in 2026?", "₹5 crore aggregate turnover in any financial year from 2017-18 onwards, counted across all GST registrations on the same PAN."],
      ["Do retailers need e-invoices?", "Not for bills to consumers (B2C). A retailer above ₹5 crore must still issue e-invoices for sales to registered businesses."],
      ["What is the 30-day rule for e-invoices?", "Businesses with turnover of ₹10 crore or more must report invoices, credit notes and debit notes to the portal within 30 days of the document date. Older documents are rejected."],
      ["Can an e-invoice be cancelled?", "Yes, within 24 hours of generating the IRN on the portal. After that, issue a credit note instead."],
      ["Can my billing software generate the IRN?", "Yes. Ezzy ERP generates the IRN and signed QR code from the sale bill and prints them on the invoice."],
    ],
    related: ["/e-invoice-software", "/billing-software-for-manufacturers"],
  },
  {
    path: "/blog/e-way-bill-rules-2026",
    label: "E-way bill rules 2026: limit, validity, extension",
    title: "E-Way Bill Rules 2026: ₹50,000 Limit, Validity, 180-Day & Extension Rules | Ezzy ERP",
    description: "E-way bill rules for manufacturers and wholesalers in 2026: when you need one, the ₹50,000 limit and state limits, validity by distance, the 180-day and 360-day rules, job work and penalties.",
    h1: "E-way bill rules in 2026: limit, validity, extension and common mistakes",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMinutes: 6,
    intro: [
      "Every manufacturer, wholesaler and distributor who dispatches goods by road deals with e-way bills. The rules have not changed much in 2026, but the limits introduced from 1 January 2025 still catch people out, and a truck stopped without a valid e-way bill can mean detained goods and a penalty.",
      "Here are the rules that apply today, in the order you meet them when goods leave your godown.",
    ],
    heroShot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with sales, invoices, stock value and receivables"],
    body: [
      {
        h2: "When you need an e-way bill",
        paras: [
          "An e-way bill is needed when goods worth more than ₹50,000 move in one consignment, whether for a sale, a stock transfer between your own branches, a return or job work. The value is taken from the invoice, bill or delivery challan, including GST.",
          "States can set their own limit for movement within the state. Maharashtra, for example, uses ₹1 lakh for intra-state movement. Check the limit for each state you dispatch from.",
        ],
        note: "Goods sent to a job worker in another state need an e-way bill whatever their value.",
      },
      {
        h2: "Part A and Part B",
        list: [
          "Part A: the document (invoice, challan or bill), GSTIN of the buyer, place of delivery, HSN code, value and reason for transport.",
          "Part B: the vehicle number or transport document. The e-way bill is valid for movement only once Part B is filled.",
          "If you hand goods to a transporter, you can fill Part A and let the transporter fill Part B with their GSTIN or transporter ID.",
        ],
      },
      {
        h2: "How long an e-way bill is valid",
        table: {
          head: ["Cargo", "Validity"],
          rows: [
            ["Regular cargo", "1 day for up to 200 km, plus 1 day for every further 200 km or part of it"],
            ["Over-dimensional cargo", "1 day for up to 20 km, plus 1 day for every further 20 km or part of it"],
          ],
        },
        paras: [
          "A day ends at midnight of the following day, counted from when Part B is first entered. A 450 km trip of regular cargo gets 3 days.",
        ],
      },
      {
        h2: "The 180-day and 360-day limits",
        list: [
          "Since 1 January 2025, you can generate an e-way bill only for documents dated within the last 180 days. Old challans and invoices cannot be used.",
          "An e-way bill can be extended, but only up to 360 days from the date it was first generated.",
          "Extension is allowed from 8 hours before to 8 hours after expiry, with the reason, such as a breakdown or a transhipment.",
        ],
      },
      {
        h2: "Cancelling and correcting",
        paras: [
          "An e-way bill can be cancelled within 24 hours of generation if the goods have not moved or the details are wrong, and it has not been verified on the way. Part A cannot be edited; cancel and generate a new one instead. The vehicle number in Part B can be updated during the journey, for example when goods change trucks.",
        ],
      },
      {
        h2: "Mistakes that lead to detained goods",
        list: [
          "Moving goods before Part B is filled, so the e-way bill is not yet valid.",
          "Vehicle changed on the way without updating Part B.",
          "E-way bill expired because the extension was not done in the 8-hour window.",
          "Invoice value, quantity or HSN code on the e-way bill not matching the invoice in the truck.",
          "Splitting one consignment into many small bills to stay under the limit.",
        ],
        note: "Changes to e-way bill provisions are planned from 1 April 2027 along with other GST amendments. See [GST changes from 1 November 2026](/blog/gst-changes-november-2026) for what has been announced.",
      },
      {
        h2: "Make e-way bills from the same bill",
        paras: [
          "Typing the same invoice into the e-way bill portal is where mismatches start. With [Ezzy ERP for manufacturers](/billing-software-for-manufacturers) you make the e-way bill for goods you dispatch along with the GST invoice and e-invoice, from the same entry, so the value, HSN and GSTIN always match. Wholesalers get the same in [wholesale billing software](/wholesale-billing-software).",
        ],
      },
    ],
    faqs: [
      ["What is the e-way bill limit in 2026?", "₹50,000 per consignment for inter-state movement. States set their own limit for movement within the state; Maharashtra uses ₹1 lakh."],
      ["How long is an e-way bill valid?", "For regular cargo, 1 day for every 200 km or part of it. For over-dimensional cargo, 1 day for every 20 km or part of it."],
      ["Can I make an e-way bill for an old invoice?", "Only if the invoice or challan is dated within the last 180 days."],
      ["How many times can an e-way bill be extended?", "It can be extended within 8 hours before or after expiry, up to a total of 360 days from when it was first generated."],
      ["Is an e-way bill needed for job work?", "Yes, for goods sent to a job worker in another state an e-way bill is needed whatever the value. Within the state, the normal limit applies."],
    ],
    related: ["/billing-software-for-manufacturers", "/wholesale-billing-software"],
  },
  {
    path: "/blog/wedding-season-sale-checklist-garment-shop",
    label: "Wedding season checklist for garment and footwear shops",
    title: "Wedding Season Sale Checklist for Garment & Footwear Shops (2026) | Ezzy ERP",
    description: "Get your clothing or footwear shop ready for the wedding season: stock by size, GST on wedding wear above ₹2,500, faster billing, alterations, exchanges and WhatsApp offers.",
    h1: "Wedding season checklist for garment and footwear shops",
    published: "2026-11-08",
    updated: "2026-11-08",
    readMinutes: 5,
    intro: [
      "After Diwali, the wedding season brings some of the biggest bills of the year: sherwanis, lehengas, sarees, suits, and footwear for the whole family. It also brings the most mistakes, because the bills are larger, the counter is crowded and many pieces cross the ₹2,500 GST line.",
      "Use this checklist to get stock, billing and staff ready before the rush.",
    ],
    heroShot: ["shot-customers.jpg", "Ezzy ERP customer list with lifetime sale and visit history"],
    body: [
      {
        h2: "1. Stock: buy by size, not by design",
        list: [
          "Check last wedding season's size-wise sales for ethnic wear, suits and footwear, and buy the sizes that sold, not full size sets.",
          "Clear broken size sets and slow pieces from the festive season first; see [how to find dead stock](/blog/dead-stock-in-garment-shop).",
          "Tag every new piece before it reaches the rack, with size, colour and MRP. Our [label size guide](/blog/garment-barcode-label-size) helps you pick the right tag.",
        ],
      },
      {
        h2: "2. GST: most wedding wear is above ₹2,500",
        paras: [
          "Clothing and footwear sold above ₹2,500 a piece (or a pair) carry 18% GST; up to ₹2,500 they carry 5%. A wedding bill often mixes both, and a discount can move a piece from one slab to the other. Make sure your software picks the rate per line after the discount. Our [GST on clothes guide](/blog/gst-on-clothes-above-2500) explains the rule with examples.",
        ],
      },
      {
        h2: "3. Billing: keep the counter moving",
        list: [
          "Scan tags instead of typing items, and use hold bills so one family's long bill does not block the queue.",
          "Accept split payments (part UPI, part card, part cash) on one bill.",
          "Take advances for orders and alterations against the customer's name, so the balance is clear at delivery.",
          "Print a clear exchange policy on the bill, and do exchanges on the billing screen so the size goes back into stock.",
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with hold bills and mixed payment modes"],
      },
      {
        h2: "4. Customers: bring last year's buyers back",
        list: [
          "Send a WhatsApp message to customers who bought ethnic wear or wedding footwear last season.",
          "Offer something for the whole family's bill, not a flat discount on every piece.",
          "Send the bill on WhatsApp, so the customer can find it when they come back for an exchange.",
        ],
      },
      {
        h2: "5. Staff and hardware",
        list: [
          "Train extra staff on billing and exchanges a week before the rush.",
          "Keep spare receipt rolls, label rolls and a ribbon for the barcode printer.",
          "Give each staff member their own login, so every bill and discount has a name on it.",
        ],
      },
      {
        h2: "Software that is ready for the rush",
        paras: [
          "[Ezzy ERP garment billing software](/garment-shop-billing-software) and [footwear billing software](/footwear-shop-billing-software) give you one-scan billing, hold bills, split payments, per-line GST, exchanges, customer history and WhatsApp bills, with 24×7 support on the busiest days.",
        ],
      },
    ],
    faqs: [
      ["What GST applies to wedding wear?", "Clothing and footwear above ₹2,500 per piece or pair carry 18% GST, and items up to ₹2,500 carry 5%, decided per piece after any discount on the bill."],
      ["How should a garment shop prepare for the wedding season?", "Buy by size from last season's sales, tag every piece, set up fast billing with hold bills and split payments, and message past customers on WhatsApp."],
      ["How do I handle advances for wedding orders?", "Record the advance against the customer in your billing software, and adjust it in the final bill at delivery so the balance is always clear."],
    ],
    related: ["/garment-shop-billing-software", "/footwear-shop-billing-software"],
  },
  {
    path: "/blog/best-billing-software-for-garment-shop",
    label: "Best billing software for garment shops (2026)",
    title: "Best Billing Software for Garment Shops in India (2026 Buyer's Guide) | Ezzy ERP",
    description: "How to choose billing software for a garment or clothing shop in India: the 8 features that matter, free apps vs accounting software vs retail ERP, and questions to ask in a demo.",
    h1: "Best billing software for garment shops in India: a 2026 buyer's guide",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 7,
    intro: [
      "Search for garment billing software and you get dozens of names, all promising GST bills and inventory. The difference shows only after you have entered your first big purchase: can the software keep stock by size and colour, print the tags, and handle an exchange at the counter without a mess?",
      "This guide lists what a clothing shop actually needs, compares the three kinds of software shop owners usually pick from, and gives you questions to ask in any demo, including ours.",
    ],
    heroShot: ["shot-purchase.jpg", "Garment purchase entry in a size grid with barcode, rates and GST in Ezzy ERP"],
    body: [
      {
        h2: "The 8 features a garment shop really needs",
        list: [
          "Size and colour stock: one design in many sizes and colours, entered in a size grid, not as twenty separate items.",
          "Barcode tags from the purchase bill, with design number, size, colour and MRP, on 38×25 or 40×25 2-up labels.",
          "One-scan billing at the counter, with hold bills for rush hours.",
          "Exchanges and returns that put the right size back in stock.",
          "Per-line GST that applies 5% or 18% by the value of each piece. See our guide to [GST on clothes above ₹2,500](/blog/gst-on-clothes-above-2500).",
          "Customer history and credit (udhaar), with bills and reminders on WhatsApp.",
          "Reports a garment owner uses: size-wise stock and sales, dead stock, profit by item.",
          "Hardware and support from one team, so labels print and scan on day one.",
        ],
      },
      {
        h2: "Three kinds of software, and who each suits",
        table: {
          head: ["Type", "Examples", "Good for", "Where it falls short"],
          rows: [
            ["Free or low-cost GST billing apps", "Vyapar, myBillBook", "New or very small shops printing a few bills a day", "Size and colour stock, garment tags and exchanges usually need workarounds"],
            ["Accounting software", "Tally, BUSY", "Books, GST returns and your CA's work", "Built for accounts first; counter speed and size-wise stock take extra setup"],
            ["Garment retail software / ERP", "Ezzy ERP and other garment-focused systems", "Shops with stock in sizes and colours, tags and regular customers", "More to learn than a basic app, so ask for training"],
          ],
        },
        note: "Many shops run billing software at the counter and send data to Tally for their CA. Ezzy ERP has Tally export for this reason.",
      },
      {
        h2: "Questions to ask in any demo",
        list: [
          "Show me a purchase of one design in 4 colours and 6 sizes. How long does entry take?",
          "Print the tags from that purchase. Can I choose 38×25 or 40×25 2-up labels?",
          "Bill two pieces, one at ₹1,800 and one at ₹3,200. Does each line get the right GST?",
          "Do an exchange of M for L. Does stock update for both sizes?",
          "Show me size-wise stock and dead stock for last season.",
          "Who installs the barcode printer, and who answers the phone on a Diwali Sunday?",
        ],
      },
      {
        h2: "Where Ezzy ERP fits",
        paras: [
          "Ezzy ERP is [billing software for garment shops](/garment-shop-billing-software) built around the size and colour matrix: size-grid purchase entry, design number tags printed from the bill, one-scan billing and exchanges, per-line GST, customer credit on WhatsApp, and an Android app. We supply and set up TSC barcode printers, receipt printers and scanners, and support is on call and WhatsApp 24×7.",
          "It is used by more than 2,000 shops, wholesalers and distributors in India. Ask us the same demo questions above and judge for yourself.",
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with size and colour columns"],
      },
    ],
    faqs: [
      ["Which is the best billing software for a garment shop in India?", "The best one handles size and colour stock, prints barcode tags from the purchase bill, applies the right GST per piece and handles exchanges. Garment-focused software such as Ezzy ERP does all four; basic billing apps usually need workarounds."],
      ["Is Tally enough for a garment shop?", "Tally is excellent for accounts and GST returns, but most garment shops use separate billing software at the counter for size-wise stock, tags and fast billing, and export the data to Tally."],
      ["Can I use free billing software for a clothing shop?", "Yes, for a small shop that prints a few bills a day. Once you hold stock in many sizes and colours or print barcode tags, garment billing software saves time and stock mistakes."],
      ["Does Ezzy ERP give a free demo?", "Yes. Book on the website or call or WhatsApp +91 84240 34844, and we show the billing screen with your own products and labels."],
    ],
    related: ["/garment-shop-billing-software", "/billing-software-for-small-business"],
  },
  {
    path: "/blog/barcode-printer-for-garment-shop",
    label: "Which barcode printer to buy for a garment shop",
    title: "Barcode Printer for Garment Shop: How to Choose (TSC, TVS, Zebra) | Ezzy ERP",
    description: "Which barcode printer to buy for a clothing shop in India: 203 vs 300 dpi, thermal transfer vs direct thermal, 4-inch width for 2-up tags, ribbons, labels and setup tips.",
    h1: "Which barcode printer to buy for a garment shop (TSC, TVS, Zebra)",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 6,
    intro: [
      "A garment shop prints hundreds of tags after every purchase, so the barcode printer is the one piece of hardware you will use every week. The good news is that you do not need an expensive industrial machine. A 4-inch desktop label printer from a known brand does the job for most shops.",
      "Here is what to look for, how the common brands compare, and the mistakes that make tags fail to scan.",
    ],
    heroShot: ["pos-hero.jpg", "Counter setup with a TSC barcode printer printing a garment tag, scanner, receipt printer and label rolls"],
    body: [
      {
        h2: "What to look for",
        table: {
          head: ["Spec", "What a garment shop needs", "Why"],
          rows: [
            ["Print width", "4 inch (about 104 mm)", "Fits 2-up 38×25 or 40×25 rolls, so two tags print at each step"],
            ["Resolution", "203 dpi", "Sharp enough for Code 128 barcodes on clothing tags; 300 dpi only for very small labels"],
            ["Print method", "Thermal transfer (with ribbon), plus direct thermal", "Ribbon prints last the season and do not fade in sunlight"],
            ["Connection", "USB; Ethernet if two counters share it", "USB is simplest for one billing PC"],
            ["Support", "Service and spares in your city", "A printer down during a sale stops tagging"],
          ],
        },
      },
      {
        h2: "TSC, TVS and Zebra compared",
        paras: [
          "TSC desktop printers such as the TE244 are common in Indian garment shops: 4-inch, 203 dpi, thermal transfer and direct thermal, and simple to set up. This is the model we supply and set up with Ezzy ERP.",
          "TVS Electronics makes desktop label printers sold widely through Indian dealers, which makes local service easy to find.",
          "Zebra is a global brand with a strong range of desktop and industrial printers. Desktop models suit shops; industrial models suit warehouses printing thousands of labels a day.",
          "All three work with garment billing software that sends standard label formats. Pick the one with the best local service where you are.",
        ],
      },
      {
        h2: "Ribbons and labels",
        list: [
          "Use a wax ribbon with paper (chromo) labels; it is the cheapest and is enough for hang tags.",
          "Use wax-resin ribbon with polyester labels for stickers that get handled or rubbed.",
          "Buy ribbon a little wider than your label roll, and check that the ribbon's ink side matches your printer (inside or outside wound).",
          "Read our guide to [barcode label sizes for clothing tags](/blog/garment-barcode-label-size) before ordering rolls.",
        ],
      },
      {
        h2: "Mistakes that make tags fail to scan",
        list: [
          "Print darkness set too low, so bars are grey and broken.",
          "Barcode printed to the edge of the label with no blank space on the sides.",
          "Wrong label size set in the driver, so tags print across the gap between labels.",
          "Direct thermal labels left in a sunny window, which fade within weeks.",
        ],
        note: "When we install a printer with Ezzy ERP, we set the label size, darkness and layout and print test tags from a real purchase bill before we leave.",
      },
      {
        h2: "Print tags straight from the purchase bill",
        paras: [
          "The printer is only half the job. With [garment billing software](/garment-shop-billing-software) that prints from the purchase entry, the right number of tags for every size and colour comes out in one go, already linked to the item for one-scan billing. Footwear shops can do the same for every box with [footwear billing software](/footwear-shop-billing-software).",
        ],
        shot: ["shot-purchase.jpg", "Ezzy ERP purchase bill with a size grid and a Print Barcodes button"],
      },
    ],
    faqs: [
      ["Which barcode printer is best for a garment shop?", "A 4-inch, 203 dpi desktop thermal transfer printer from a brand with local service, such as TSC, TVS or Zebra. Ezzy ERP supplies and sets up the TSC TE244."],
      ["Do I need 300 dpi for clothing tags?", "No. 203 dpi prints clear Code 128 barcodes on 38×25 and larger tags. 300 dpi helps only for very small labels."],
      ["Thermal transfer or direct thermal for garments?", "Thermal transfer, with a ribbon. The print lasts through the season and does not fade with heat or sunlight."],
      ["Can one barcode printer serve two billing counters?", "Yes, with a network (Ethernet) printer or by sharing it from one PC. For most shops, printing tags happens at the purchase desk, not the counter."],
    ],
    related: ["/garment-shop-billing-software", "/footwear-shop-billing-software"],
  },
  {
    path: "/blog/footwear-stock-management-size-run",
    label: "Footwear stock by article and size run",
    title: "Footwear Stock Management by Article and Size Run: A Simple Method | Ezzy ERP",
    description: "How footwear shops in India can track stock by article, size and colour: size runs, box labels, MRP billing, size-wise reorders and dead stock, step by step.",
    h1: "Footwear shop stock by article and size run: a simple method",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 6,
    intro: [
      "In a footwear shop the stock problem is not how many pairs you have. It is whether you have a size 8 in black when the customer is standing at the counter. One article in eight sizes and three colours is twenty-four different stock items, and the size you run out of is the sale you lose.",
      "This method keeps footwear stock right by article and size run, without counting the shelves every week.",
    ],
    heroShot: ["shot-purchase.jpg", "Footwear purchase entry in a size grid with article, colour and sizes 6 to 11"],
    body: [
      {
        h2: "Step 1: Article number first",
        paras: [
          "Use the brand's article number (or your own) as the main item, with colour and size under it. Reports then read \"Article 7712, black: sizes 6 and 11 left\", which is what you need to reorder.",
        ],
      },
      {
        h2: "Step 2: Fix your size runs",
        table: {
          head: ["Category", "Typical size run"],
          rows: [
            ["Men's", "6 to 11 (UK/India)"],
            ["Women's", "3 to 8"],
            ["Kids", "By age or size number, e.g. 8C to 13C, 1 to 5"],
            ["Sports shoes", "Often include half sizes; set them up once"],
          ],
        },
        paras: ["Set each run once in your software and reuse it on every purchase."],
      },
      {
        h2: "Step 3: Enter purchases in a size grid and label every box",
        paras: [
          "Enter one row per article and colour, with a column for each size. Then print a label for every box with article, size, colour and MRP from the same entry. A box without a label is the box that gets billed wrong.",
          "See [which barcode printer to buy](/blog/barcode-printer-for-garment-shop) if you are setting one up.",
        ],
      },
      {
        h2: "Step 4: Bill at MRP, by scan",
        paras: [
          "Footwear is sold at MRP with GST inside the price. Scanning the box label brings up the right article, size and price, and takes that pair out of stock. Footwear up to ₹2,500 a pair carries 5% GST and above that 18%, so per-line GST matters here too; our [GST guide](/blog/gst-on-clothes-above-2500) explains how discounts affect the slab.",
          "Do size exchanges on the billing screen, so the returned pair goes back into stock in its size.",
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen used at a footwear counter"],
      },
      {
        h2: "Step 5: Reorder by size, not by article",
        list: [
          "Size-wise stock: which sizes are left in each article and colour.",
          "Size-wise sales: your real size curve. In most shops the middle sizes sell several times more than the ends of the run.",
          "Reorder the sizes that sell, instead of buying a full size run again.",
        ],
      },
      {
        h2: "Step 6: Clear broken size runs early",
        paras: [
          "An article left with only sizes 6 and 11 rarely sells at full price. Find broken runs and slow articles with a dead stock report every month, and move them to a discount rack before the season ends. Our guide on [finding dead stock](/blog/dead-stock-in-garment-shop) shows how.",
        ],
      },
      {
        h2: "Software that does this for you",
        paras: [
          "[Ezzy ERP footwear billing software](/footwear-shop-billing-software) has size-grid purchase entry, box labels from the purchase bill, MRP-mode billing, size exchanges, reorder and dead stock reports, and multi-branch stock, with printers and scanners supplied and set up by our team.",
        ],
      },
    ],
    faqs: [
      ["How do footwear shops manage stock size-wise?", "By keeping each article as one item with colour and size under it, entering purchases in a size grid, labelling every box and billing by scan. Stock by size then stays correct automatically."],
      ["What is a size run in footwear?", "The range of sizes an article comes in, for example 6 to 11 for men's shoes. Shops track stock and sales for each size in the run."],
      ["How do I know which footwear sizes to reorder?", "Use a size-wise sales report. It shows which sizes sell fastest for each article, so you reorder those sizes instead of a full run."],
      ["What is the GST on footwear?", "5% for footwear up to ₹2,500 per pair and 18% above it, from 22 September 2025. Confirm HSN codes with your CA."],
    ],
    related: ["/footwear-shop-billing-software", "/garment-shop-billing-software"],
  },
  {
    path: "/blog/dead-stock-in-garment-shop",
    label: "How to find and clear dead stock in a clothing shop",
    title: "Dead Stock in a Garment Shop: How to Find and Clear It Before the Season Ends | Ezzy ERP",
    description: "How clothing and footwear shops can find dead stock by days idle, why it builds up, and practical ways to clear it before the season ends without killing margins.",
    h1: "How to find dead stock in a clothing shop before the season ends",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 5,
    intro: [
      "Dead stock is the money you cannot see. A rack of last season's designs looks like stock, but it is cash you paid to suppliers that is not coming back until it sells. In fashion, every week it waits, it is worth less.",
      "The fix is to spot slow stock early, while it can still sell at a fair price. Here is how.",
    ],
    heroShot: ["shot-insights.jpg", "Ezzy ERP business insights with stock health and slow-moving items"],
    body: [
      {
        h2: "What counts as dead stock",
        paras: [
          "Use days since the last sale, not days since purchase. A practical rule for clothing: items with no sale in 60 days are slow, and items with no sale in 90 days are dead for this season. Footwear and basics can wait longer; fashion and festival wear cannot.",
        ],
      },
      {
        h2: "Why it builds up",
        list: [
          "Buying full size runs when only the middle sizes sell.",
          "Re-ordering a design because it sold well last year, without checking this year's sale.",
          "Untagged or wrongly tagged pieces that stock reports cannot see.",
          "Broken size and colour sets: one design left only in XXL or in one colour.",
        ],
      },
      {
        h2: "How to find it every month",
        list: [
          "Run a dead stock report by days idle (60 and 90 days), sorted by stock value.",
          "Check size-wise stock for broken sets in designs that are still selling.",
          "Walk the racks with the report and a barcode scanner, and pull the pieces out.",
          "Note the supplier and design of each dead item, so you buy less of it next time.",
        ],
        shot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with stock value and sales figures"],
      },
      {
        h2: "Ways to clear it",
        list: [
          "Move it to the front of the shop and change the display before discounting.",
          "Bundle offers: two slow pieces for the price of one and a half.",
          "Send a WhatsApp offer to regular customers who bought that brand or size before.",
          "Return or exchange with the supplier, if your terms allow, before the season ends.",
          "End-of-season sale. Remember GST is charged on the sale value after the discount; see our [GST on clothes guide](/blog/gst-on-clothes-above-2500).",
        ],
      },
      {
        h2: "Prevent it next season",
        paras: [
          "Plan purchases from your size-wise sales, not from memory. Our guide to [size and colour stock](/blog/size-and-colour-stock-management-garment-shop) explains how to read your size curve.",
          "[Ezzy ERP garment billing software](/garment-shop-billing-software) shows dead stock by days idle, size-wise stock and sales, and profit by item, and sends offers to customers on WhatsApp. Footwear shops get the same reports in [Ezzy ERP for footwear](/footwear-shop-billing-software).",
        ],
      },
    ],
    faqs: [
      ["What is dead stock in a garment shop?", "Clothing that has not sold for a long time, usually 90 days or more since the last sale, and is unlikely to sell at full price this season."],
      ["How do I find dead stock?", "Run a report of items with no sale in 60 or 90 days, sorted by stock value, then check them on the racks with a barcode scanner."],
      ["How can I clear dead stock without big losses?", "Act early: change the display, make bundle offers, message regular customers, return to suppliers where possible, and keep deep discounts for the end of season."],
      ["Can billing software show dead stock?", "Yes. Ezzy ERP has a dead stock report by days idle, along with size-wise stock and profit by item."],
    ],
    related: ["/garment-shop-billing-software", "/footwear-shop-billing-software"],
  },
  {
    path: "/blog/how-to-start-garment-shop-in-india",
    label: "How to start a readymade garment shop in India",
    title: "How to Start a Readymade Garment Shop in India: Licences, Stock and Software | Ezzy ERP",
    description: "Step-by-step guide to starting a clothing shop in India: choosing a niche and location, registrations (Shop Act, GST, Udyam), buying stock, setting up the counter and billing software.",
    h1: "How to start a readymade garment shop in India: licences, stock and software",
    published: "2026-10-31",
    updated: "2026-10-31",
    readMinutes: 7,
    intro: [
      "A readymade garment shop is one of the most common first businesses in India, and one of the most competitive. The shops that last are the ones that pick a clear customer, buy carefully, and know their stock and cash from day one.",
      "This guide walks through the steps in order, from choosing what to sell to billing your first customer.",
    ],
    heroShot: ["pos-hero.jpg", "A complete shop counter setup: billing screen, barcode scanner, receipt printer and barcode label printer"],
    body: [
      {
        h2: "1. Pick your niche and customer",
        paras: [
          "Decide who you are selling to before you choose a shop: men's casual wear, ladies' ethnic wear, kids wear, sarees, or a family store. A clear niche makes buying, display and marketing simpler, and helps you stand out from the shops around you.",
        ],
      },
      {
        h2: "2. Choose the location",
        list: [
          "Footfall of your target customer, not just total footfall.",
          "Nearby competition: a cluster of clothing shops can help if your niche is different.",
          "Rent you can pay from sales in a slow month, not a festival month.",
          "Space for trial rooms, display and a small stock room.",
        ],
      },
      {
        h2: "3. Registrations you will need",
        table: {
          head: ["Registration", "What it is"],
          rows: [
            ["Shop and Establishment registration", "Under your state's Shops and Establishments Act, from the local municipal or labour office"],
            ["GST registration", "Required once turnover crosses the limit for goods (₹40 lakh in most states); many shops register earlier to claim input tax credit and buy from GST suppliers"],
            ["Udyam (MSME) registration", "Free online registration that helps with bank loans and schemes"],
            ["Current account", "A bank account in the shop's name for UPI and card payments"],
            ["Trade licence", "Required by some municipal corporations; check locally"],
          ],
        },
        note: "Rules and limits vary by state and change from time to time. Check with your CA before you open.",
      },
      {
        h2: "4. Find suppliers and buy your first stock",
        paras: [
          "Most shops buy from wholesale markets and manufacturers' agents. Well-known hubs include Surat for sarees and dress material, Tiruppur for knitwear and T-shirts, Ludhiana for woollens, and the wholesale markets of Mumbai, Delhi and Kolkata for readymade garments.",
          "Buy less than you think for the first season. Buy the middle sizes deeper and the end sizes thinner, and keep cash for re-orders of what sells.",
        ],
      },
      {
        h2: "5. Set up the counter",
        list: [
          "A computer or tablet with billing software, or the Android app for a small start.",
          "An 80mm thermal receipt printer and a barcode scanner.",
          "A barcode label printer for tags; see [which barcode printer to buy](/blog/barcode-printer-for-garment-shop).",
          "UPI QR code and a card machine.",
        ],
      },
      {
        h2: "6. Get the GST and stock right from day one",
        paras: [
          "Clothing GST is 5% up to ₹2,500 a piece and 18% above it, decided per piece. Our [GST on clothes guide](/blog/gst-on-clothes-above-2500) explains how to bill it.",
          "Enter every purchase in a size grid and tag every piece before it goes on the rack. Our guide to [size and colour stock](/blog/size-and-colour-stock-management-garment-shop) shows the method.",
        ],
      },
      {
        h2: "7. Choose billing software that grows with you",
        paras: [
          "Pick software you will not have to change when you add a second counter or branch. [Ezzy ERP garment billing software](/garment-shop-billing-software) gives you size-colour stock, barcode tags, GST billing, customer credit on WhatsApp and an Android app, with hardware, setup and training from one team. Read our [buyer's guide](/blog/best-billing-software-for-garment-shop) for questions to ask in any demo.",
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen"],
      },
    ],
    faqs: [
      ["What licences do I need to start a clothing shop in India?", "Usually a Shop and Establishment registration, GST registration (compulsory above the turnover limit, often taken earlier), a current account, and optionally Udyam registration and a local trade licence. Check your state's rules with a CA."],
      ["Is GST registration compulsory for a garment shop?", "It is compulsory once turnover for goods crosses the limit, ₹40 lakh in most states. Many shops register earlier so they can claim input tax credit on purchases."],
      ["Where can I buy wholesale clothes for my shop?", "Common hubs include Surat (sarees, dress material), Tiruppur (knitwear), Ludhiana (woollens) and the wholesale markets of Mumbai, Delhi and Kolkata, as well as brand distributors."],
      ["Do I need billing software for a new garment shop?", "It is the easiest way to keep size-wise stock, GST and customer credit right from day one. Ezzy ERP offers a free demo with your own products."],
    ],
    related: ["/garment-shop-billing-software", "/billing-software-navi-mumbai"],
  },
  {
    path: "/blog/gst-on-clothes-above-2500",
    label: "GST on clothes: 5% up to ₹2,500, 18% above",
    title: "GST on Clothes 2026: 5% or 18%? Rate Above ₹2,500, HSN Codes & Examples | Ezzy ERP",
    description: "GST on clothes in 2026 is 5% if a piece sells for ₹2,500 or less and 18% above it. Rate table with HSN codes, worked examples for shirts, kurtas and blazers, and how discounts change the rate.",
    h1: "GST on clothes in 2026: 5% up to ₹2,500, 18% above, and how to bill it right",
    published: "2026-10-29",
    updated: "2026-11-08",
    readMinutes: 6,
    intro: [
      "Quick answer: GST on clothes in 2026 is 5% when a piece sells for ₹2,500 or less, and 18% when it sells for more. The rate is decided for each piece, after any discount on the bill. Footwear follows the same ₹2,500 rule per pair.",
      "This has applied since 22 September 2025. Before that the line was ₹1,000, with 5% below it and 12% above, so a shirt sold at ₹1,800 now carries 5% instead of 12%.",
      "The rule is simple to state but easy to get wrong at the counter, because the slab depends on the value of each piece, not the bill, and discounts can move a piece from one slab to the other. This guide explains how it works and how to set up your billing so every line gets the right rate.",
      "हिंदी में पढ़ें: [कपड़ों पर कितना GST लगता है 2026](/blog/kapdon-par-gst-2026)",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen where each bill line carries its own GST rate"],
    body: [
      {
        h2: "The GST rates on clothing at a glance",
        table: {
          head: ["What you sell", "HSN chapter", "Up to ₹2,500", "Above ₹2,500"],
          rows: [
            ["Knitted garments: T-shirts, innerwear, sweaters", "61", "5%", "18%"],
            ["Woven garments: shirts, trousers, kurtas, suits, blazers", "62", "5%", "18%"],
            ["Made-up textiles: bedsheets, curtains, towels", "63", "5%", "18%"],
            ["Footwear (per pair)", "64", "5%", "18%"],
          ],
        },
        note: "Rates as notified from 22 September 2025. Fabric, yarn and some specific items have their own rates, so confirm the HSN code and rate of each product with your CA.",
      },
      {
        h2: "Examples: shirts, kurtas and blazers",
        paras: ["Prices below are the selling price per piece before GST."],
        table: {
          head: ["Item", "Selling price", "GST rate", "GST"],
          rows: [
            ["Cotton shirt", "₹1,200", "5%", "₹60"],
            ["Jeans", "₹2,400", "5%", "₹120"],
            ["Kurta tagged ₹2,800, sold at 20% off", "₹2,240", "5%", "₹112"],
            ["Blazer", "₹3,200", "18%", "₹576"],
            ["Sherwani", "₹8,000", "18%", "₹1,440"],
          ],
        },
      },
      {
        h2: "The slab is decided per piece, not per bill",
        paras: [
          "A customer buying four shirts at ₹900 each pays 5% on every shirt, even though the bill total is ₹3,600. A customer buying one blazer at ₹3,200 pays 18% on that blazer, even if the rest of the bill is socks and handkerchiefs at 5%.",
          "So one bill can, and often will, carry two GST rates. Your billing software has to decide the rate line by line from the value of that piece, not apply one rate to the whole bill.",
        ],
      },
      {
        h2: "What a discount does to the slab",
        paras: [
          "GST is charged on the value at which you actually sell the piece. When a discount is given on the bill itself, at the time of sale, the slab is checked on the price after the discount.",
          "A kurta tagged at ₹2,800 and sold with 20% off goes for ₹2,240. At that value it falls in the 5% slab, not 18%. In a sale season this matters on every bill, so the rate must be worked out after the discount, line by line.",
        ],
        list: [
          "Show the discount on the invoice against the item, so the value that sets the slab is clear.",
          "Do not apply a bill-level discount and then use the tag price to decide the rate. That over-charges GST.",
          "Discounts given later, such as a year-end scheme from the brand, are settled by a GST credit note. See [GST changes from 1 November 2026](/blog/gst-changes-november-2026).",
        ],
      },
      {
        h2: "MRP that already includes GST",
        paras: [
          "Most clothing is sold at an MRP that includes tax. To find the value the slab is checked on, take the GST out of the price first.",
          "At 5%, a piece priced up to ₹2,625 including GST has a value of up to ₹2,500 (₹2,625 ÷ 1.05), so it stays in the 5% slab. Above that, the piece is taxed at 18%.",
          "Prices just above ₹2,625 create an odd zone: at 18% the value before tax comes out below ₹2,500 again. Shops and tax experts treat this zone differently, so agree a rule with your CA and set your software to follow it. Many shops simply avoid tag prices in this band.",
        ],
        note: "Example: a shirt with MRP ₹1,999 including GST. Value before tax = 1,999 ÷ 1.05 = ₹1,903.81. GST at 5% = ₹95.19.",
      },
      {
        h2: "How to set this up in your billing software",
        paras: [
          "Doing this by hand at a busy counter is where mistakes happen. Good [garment billing software](/garment-shop-billing-software) handles it for you:",
        ],
        list: [
          "Every product line carries its own HSN code and GST rate, so a bill can mix 5% and 18% items.",
          "The rate is picked from the selling value of each piece, after the line discount, using the ₹2,500 rule.",
          "MRP-inclusive pricing is supported, with GST worked out inside the price.",
          "The GST register and returns summary show sales split by rate at the end of the month, ready for your accountant.",
        ],
        shot: ["shot-gl.jpg", "Ezzy ERP accounts screen with ledgers used for GST reporting"],
      },
      {
        h2: "A quick checklist for your shop",
        list: [
          "Check the HSN code and rate of every product category with your CA, once.",
          "Re-check items tagged between ₹2,400 and ₹3,000, where the slab can change with a small discount.",
          "Train counter staff to give discounts on the bill line, not in cash after the bill.",
          "At month end, compare 5% and 18% sales in the GST register before filing.",
        ],
      },
    ],
    faqs: [
      ["What is the GST on clothes above ₹2,500?", "Readymade garments with a sale value above ₹2,500 per piece are taxed at 18% GST, from 22 September 2025. Pieces up to ₹2,500 are taxed at 5%."],
      ["Is the ₹2,500 limit per bill or per piece?", "Per piece. A bill can have some items at 5% and others at 18%, depending on the value of each piece."],
      ["Does a discount change the GST rate on clothes?", "Yes, when the discount is given on the invoice at the time of sale. The slab is checked on the value after the discount, so a ₹2,800 piece sold at ₹2,240 is taxed at 5%."],
      ["What was the GST on clothes before September 2025?", "5% for a piece up to ₹1,000 and 12% above ₹1,000."],
      ["Is GST on clothes above ₹1,000 still 12%?", "No. The 12% slab for clothing was removed from 22 September 2025. Clothes up to ₹2,500 per piece now carry 5%, and above ₹2,500 carry 18%."],
      ["What is the GST on shirts?", "5% if the shirt sells for ₹2,500 or less, and 18% if it sells for more. The same rule applies to T-shirts, trousers, kurtas and other readymade garments."],
      ["What is the HSN code for readymade garments?", "Knitted garments fall under HSN chapter 61 and woven garments under chapter 62. Made-up textiles such as bedsheets fall under chapter 63. Use the full code for each product as advised by your CA."],
      ["Can billing software apply 5% and 18% automatically?", "Yes. Garment billing software such as Ezzy ERP keeps a GST rate on every bill line, so one bill can carry both rates, and the GST register splits sales by rate for filing."],
    ],
    related: ["/garment-shop-billing-software", "/billing-software-for-small-business"],
  },
  {
    path: "/blog/garment-barcode-label-size",
    label: "Barcode label sizes for clothing tags",
    title: "Barcode Label Size for Clothing Tags: 38×25 vs 40×25 vs 50×25 mm | Ezzy ERP",
    description: "Which barcode label size to use for garment tags: 38×25, 40×25 or 50×25 mm, 1-up or 2-up rolls, paper or polyester, and what to print on each tag.",
    h1: "Barcode label sizes for clothing tags: 38×25 vs 40×25 vs 50×25 mm",
    published: "2026-10-29",
    updated: "2026-10-29",
    readMinutes: 5,
    intro: [
      "The label size you pick decides how much you can print on a tag, how fast your printer runs, and whether the barcode still scans after the garment has been tried on five times. Most garment shops in India use one of three sizes: 38×25 mm, 40×25 mm or 50×25 mm.",
      "Here is how they compare, which roll layout to buy, and what to print on each tag.",
    ],
    heroShot: ["pos-hero.jpg", "Counter setup with a TSC barcode printer printing a garment tag, barcode scanner, receipt printer and label rolls"],
    body: [
      {
        h2: "The three common sizes compared",
        paras: ["Sizes are width × height in millimetres. All three fit a standard 4-inch desktop barcode printer."],
        table: {
          head: ["Size", "Good for", "Fits comfortably"],
          rows: [
            ["38×25 mm", "Shirts, T-shirts, kids wear, most readymade", "Shop name, barcode, size, MRP"],
            ["40×25 mm", "The same items, with a little more room", "Adds design number (D.No) or colour"],
            ["50×25 mm", "Sarees, suits, brand-wise stock, wholesale", "Brand, D.No, size, colour, MRP and barcode"],
          ],
        },
      },
      {
        h2: "1-up or 2-up rolls?",
        paras: [
          "A 2-up roll has two labels side by side across the roll. With 38×25 or 40×25 labels, a 2-up roll uses the full width of a 4-inch printer and prints two tags at each step, so a purchase of 200 pieces prints in half the time.",
          "1-up rolls are easier when you print one or two tags at a time, for example to replace a torn tag. Most shops keep 2-up rolls for purchase entry and a small 1-up roll for reprints, or simply reprint a pair on a 2-up roll.",
        ],
      },
      {
        h2: "What to print on a garment tag",
        list: [
          "The barcode itself. Code 128 is the usual choice: it is compact and every scanner reads it.",
          "Size, in large type, so staff can find a size on the rack without scanning.",
          "MRP, with \"incl. of all taxes\".",
          "Design number (D.No) and colour, if you stock the same design in many colours.",
          "Shop name or brand, and the month of purchase as a short code if you want to spot old stock at a glance.",
        ],
        note: "Leave a few millimetres of blank space on both sides of the barcode. A barcode printed edge to edge is the most common reason a tag will not scan.",
      },
      {
        h2: "Paper or polyester, direct thermal or ribbon",
        paras: [
          "Chromo paper labels are the cheapest and work well for tags that stay on the hanger tag. For labels stuck on fabric or packets that get handled a lot, polyester labels last longer and do not tear.",
          "Direct thermal printing needs no ribbon but fades with heat and sunlight, so it suits short-life labels. Thermal transfer printing uses a wax or wax-resin ribbon and gives a sharp barcode that lasts the season, which is why most garment shops use it. Printers such as the TSC TE244 can do both.",
        ],
      },
      {
        h2: "Print tags straight from the purchase bill",
        paras: [
          "The slowest part of labelling is typing. If your software prints tags from the purchase bill, the quantity of each size and colour is already known, so the right number of tags comes out in one go, with the barcode already linked to the item.",
          "In [Ezzy ERP](/garment-shop-billing-software) you enter the purchase in a size grid and press Print Barcodes. The labels come out on 38×25 or 40×25 2-up rolls with the D.No, size, colour and MRP filled in, and the counter can bill with one scan.",
        ],
        shot: ["shot-purchase.jpg", "Ezzy ERP purchase bill with a size grid and a Print Barcodes button"],
      },
    ],
    faqs: [
      ["What is the best barcode label size for clothing?", "38×25 mm or 40×25 mm on a 2-up roll suits most readymade garments. Choose 50×25 mm when you need to print brand, design number, colour, size and MRP on one tag."],
      ["Which barcode type is used for garment tags?", "Code 128 is the most common. It packs an item code into a small width and is read by every barcode scanner."],
      ["Do I need a ribbon for my barcode printer?", "Only for thermal transfer printing, which gives long-lasting labels. Direct thermal labels need no ribbon but fade over time."],
      ["Which printer prints 2-up 38×25 labels?", "Any 4-inch desktop barcode printer, such as the TSC TE244. Ezzy ERP supplies and sets up the printer with your label format."],
    ],
    related: ["/garment-shop-billing-software", "/footwear-shop-billing-software"],
  },
  {
    path: "/blog/size-and-colour-stock-management-garment-shop",
    label: "Managing size and colour stock in a garment shop",
    title: "Size-wise Stock Management for Garment Shops: Size and Colour Made Simple | Ezzy ERP",
    description: "How to manage garment stock by size and colour: design numbers, size grids, tags from the purchase bill, size-wise reports, reorders and stock checks.",
    h1: "How to manage size and colour stock in a garment shop",
    published: "2026-10-29",
    updated: "2026-10-29",
    readMinutes: 6,
    intro: [
      "A clothing shop does not stock \"a shirt\". It stocks one design in five sizes and four colours, which is twenty different items on the rack. When stock is kept only by design, you find out that the medium in blue is finished when a customer asks for it.",
      "Size and colour stock management fixes that. It sounds like extra work, but with the right method it takes less time than counting by hand. Here is the method, step by step.",
    ],
    heroShot: ["shot-purchase.jpg", "Ezzy ERP purchase entry with a size grid for one design in several sizes"],
    body: [
      {
        h2: "Step 1: Give every design a number",
        paras: [
          "Start with a design number (D.No) for each style you buy, usually the one on the supplier's bill. Sizes and colours then hang under that design. This keeps reports readable: you see \"D.No 2047, blue, M: 3 left\" instead of a long list of unrelated item codes.",
        ],
      },
      {
        h2: "Step 2: Fix your size sets",
        paras: [
          "Most shops use only a handful of size sets. Set them up once and reuse them for every purchase.",
        ],
        table: {
          head: ["Category", "Typical size set"],
          rows: [
            ["Shirts, T-shirts, kurtas", "S, M, L, XL, XXL"],
            ["Trousers and jeans", "28, 30, 32, 34, 36, 38, 40"],
            ["Kids wear", "By age: 1-2, 2-3, 3-4 years and up"],
            ["Ladies' readymade", "S to XXL, or 32 to 44"],
            ["Free size (sarees, dupattas)", "One size, tracked by colour only"],
          ],
        },
      },
      {
        h2: "Step 3: Enter purchases in a size grid",
        paras: [
          "Enter each design and colour as one row, with a column for each size. A purchase of one design in four colours and five sizes becomes four rows instead of twenty lines, and the total quantity is checked against the supplier's bill before you save.",
        ],
      },
      {
        h2: "Step 4: Tag every piece from the same entry",
        paras: [
          "Print the barcode tags from the purchase entry, so each tag already carries the right design, size, colour and MRP. Tag pieces before they reach the rack. An untagged piece is the one that gets billed as the wrong size and breaks your stock.",
          "Not sure which tag to buy? Read our [guide to barcode label sizes for clothing tags](/blog/garment-barcode-label-size).",
        ],
      },
      {
        h2: "Step 5: Bill by scan, return by scan",
        paras: [
          "When every sale and return is scanned, stock by size stays correct without any extra work. Exchanges matter here: a customer swapping an M for an L must put the M back into stock and take the L out. Do the exchange on the billing screen, not as a cash adjustment.",
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with size and colour columns"],
      },
      {
        h2: "Step 6: Read three reports every week",
        list: [
          "Size-wise stock: which sizes are left in each design and colour. Reorder the sizes that sell, not the whole size set.",
          "Size-wise sales: over a season this shows your real size curve, for example that M and L sell twice as much as S and XXL. Use it to plan your next order.",
          "Dead stock by days idle: designs that have not sold in 60 or 90 days. Move them to the front, bundle them, or plan a sale before the season ends.",
        ],
      },
      {
        h2: "Step 7: Check stock one rack at a time",
        paras: [
          "A full stock count shuts the shop. Instead, check one rack or one brand each week with a scanner and compare it with the stock in your software. Differences show up early, while you still remember the bills that caused them.",
        ],
      },
      {
        h2: "Where software helps",
        paras: [
          "All of this can be done in a register, but it takes hours. [Ezzy ERP](/garment-shop-billing-software) was built around the size and colour matrix: size-grid purchase entry, design number tags printed from the bill, one-scan billing and exchanges, and size-wise stock, sales and dead stock reports.",
        ],
      },
    ],
    faqs: [
      ["What is size-wise stock management?", "Keeping stock by design, size and colour instead of by design alone, so you know exactly which sizes are left in each colour and what to reorder."],
      ["How do I track garment stock by size and colour?", "Give each style a design number, enter purchases in a size grid, print barcode tags from the purchase, and scan every sale and return. Your stock by size then stays correct by itself."],
      ["How often should a garment shop count stock?", "Check one rack or brand each week with a scanner rather than closing the shop for a full count, and do a full count once or twice a year."],
      ["Which software is best for size and colour stock?", "Choose software with size-grid purchase entry, barcode tags from the purchase bill and size-wise reports. Ezzy ERP has all three, along with GST billing and an Android app."],
    ],
    related: ["/garment-shop-billing-software", "/footwear-shop-billing-software"],
  },
];
