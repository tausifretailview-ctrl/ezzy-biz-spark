/* Keyword pages: one page per search intent that the single landing page
 * cannot rank for on its own. Each entry is prerendered at build time
 * (src/entry-server.tsx) and listed in public/sitemap.xml.
 *
 * Keep every claim here consistent with the landing page: no prices,
 * no client names, no numbers that the landing page does not already state. */

import { PHONE } from "../site";

export type SeoSection = {
  h2: string;
  paras?: string[];
  points?: [title: string, text: string][];
  shot?: [file: string, alt: string];
};

export type SeoPageData = {
  path: string;
  /** Short label for breadcrumbs, footer links and "related" cards. */
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  heroShot: [file: string, alt: string];
  sections: SeoSection[];
  faqs: [q: string, a: string][];
  /** Value preselected in the demo form's "What do you sell?" field. */
  trade?: string;
};

const DEMO_FAQ: [string, string] = [
  "How do I get a free demo?",
  `Book a demo on this website, or call or WhatsApp ${PHONE}. We show you the billing screen with your own products and labels, and train your staff on the phone in your language.`,
];

export const SEO_PAGES: SeoPageData[] = [
  {
    path: "/billing-software-for-small-business",
    label: "Billing software for small business",
    title: "Billing Software for Small Business in India — GST, POS & Stock | Ezzy ERP",
    description: "Easy GST billing software for small shops in India: fast POS bills, barcode labels, stock, customer credit, WhatsApp invoices and an Android app. Book a free demo.",
    eyebrow: "Small business · GST billing",
    h1: "Billing software for small business, built for the Indian shop counter",
    intro: [
      "Most billing apps stop at printing a bill. A small shop needs more than that: stock that matches the shelf, a record of who owes what, GST reports at the end of the month, and a way to send the bill on WhatsApp.",
      "Ezzy ERP does all of this in one login. It is used by more than 2,000 shops, wholesalers and distributors in India, and comes with printers, scanners, setup and 24×7 support from one team.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with barcode field, customer lookup and payment modes on function keys"],
    sections: [
      {
        h2: "What a small business needs from billing software",
        points: [
          ["Fast bills at the counter", "Scan a barcode or search by name, take cash, UPI, card or credit (or split them), and print a bill in seconds. Hold a bill and serve the next customer."],
          ["GST without a CA every week", "Every line carries GST. The GST register, ledgers, trial balance, P&L and balance sheet are ready when your accountant asks, with Tally export."],
          ["Stock you can trust", "Purchase bills add stock, sales reduce it, and you see live stock by item, with low-stock and reorder reports."],
          ["Customer credit (udhaar)", "Party balances, advances and credit notes, with statements and payment reminders sent on WhatsApp."],
          ["Your shop on your phone", "The Android app shows today's sale, profit, stock and dues, and lets you bill from the phone."],
          ["Safe data", "Cloud backup, per-staff rights and a recycle bin with deletion reasons, so a wrong entry is never the end."],
        ],
      },
      {
        h2: "Free billing app or full billing software?",
        paras: [
          "Free GST billing apps are a good start for a shop that only needs to print an invoice. They become hard work once you hold stock in many sizes or colours, print barcode labels, give credit to regular customers, or add a second counter or branch.",
          "Ezzy ERP is made for that next step. It keeps the counter screen as simple as an app, and adds purchase entry, barcode labels, accounting and reports behind it. You do not need to change software again when the shop grows.",
        ],
      },
      {
        h2: "Made for these trades",
        points: [
          ["Garment and clothing shops", "Size and colour stock, design number labels, brand-wise reports."],
          ["Footwear shops", "Article and size-run stock, MRP billing, schemes and discounts."],
          ["Mobile and electronics stores", "IMEI and serial number tracking, EMI and mixed payments, warranty-ready invoices."],
          ["Kirana, supermarket and general stores", "Fast barcode billing, batch and low-stock alerts, daily cash report."],
        ],
        shot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with total sales, invoices, stock value, receivables and cash collection"],
      },
      {
        h2: "Software, hardware and training from one team",
        paras: [
          "We supply barcode label printers, 80mm thermal receipt printers and barcode scanners with the software, set them up, and train your staff. Most staff learn the billing screen in a day. Support is on call and WhatsApp, 24×7, including festival rush days.",
        ],
      },
    ],
    faqs: [
      ["What is the best billing software for a small business in India?", "The best choice is software that matches how your shop works. If you only print a few bills a day, a free app may be enough. If you hold stock, print barcode labels, give credit or file GST every month, choose software that does billing, stock and accounts together, like Ezzy ERP."],
      ["Is Ezzy ERP GST compliant?", "Yes. Every bill line carries GST, and you get a GST register, ledgers, trial balance, P&L and balance sheet, with Tally-style bill-by-bill settlement and Tally export."],
      ["Can I use it on my phone?", "Yes. The Android app shows today's sales, stock and dues, and you can bill from the phone. Salesmen get a field app that works offline and syncs later."],
      ["Do I need a computer and printer?", "You can bill from a computer or the Android app. For a busy counter we recommend a computer with an 80mm thermal printer and a barcode scanner, which we supply and set up."],
      DEMO_FAQ,
    ],
  },
  {
    path: "/garment-shop-billing-software",
    label: "Garment shop billing software",
    title: "Garment Shop Billing Software — Size, Colour & Barcode | Ezzy ERP",
    description: "Billing and inventory software for garment, clothing, saree and readymade shops: size-colour stock, design number barcode labels, GST and WhatsApp bills. Free demo.",
    eyebrow: "Garments · Textiles · Readymade",
    h1: "Billing software for garment and clothing shops",
    intro: [
      "A garment shop does not sell “a shirt”. It sells a shirt in five sizes and four colours, from a design number, at an MRP printed on a tag. Ordinary billing software cannot keep that stock straight.",
      "Ezzy ERP was built around the size and colour matrix. Enter the purchase bill once in a size grid, print the barcode tags from the same screen, and bill at the counter with one scan.",
    ],
    heroShot: ["shot-purchase.jpg", "Ezzy ERP purchase bill entry with a size grid, barcode column, purchase and sale rate, GST and a Print Barcodes button"],
    sections: [
      {
        h2: "Built for size and colour stock",
        points: [
          ["Size grid purchase entry", "Enter S, M, L, XL (or 28 to 40) in one row per design and colour, with purchase rate, sale rate and GST on each line."],
          ["Design number (D.No) barcode labels", "Print size, colour, D.No and MRP tags straight from the purchase bill on 38×25 or 40×25 2-up labels."],
          ["Stock by size, colour and brand", "See exactly which sizes are left in which colour, and what to reorder before the season."],
          ["One-scan counter billing", "Scan the tag and the right size, colour and price come up. Hold bills on function keys during rush hours."],
          ["Exchange and returns", "Sales returns, credit notes and exchanges that put the item back in stock in the right size."],
          ["Customer history", "VIP, regular and at-risk customers by lifetime sale, with bills and offers sent on WhatsApp."],
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with size and colour columns for garment billing"],
      },
      {
        h2: "For every kind of clothing business",
        paras: [
          "Ezzy ERP is used by boutiques, saree and dress material shops, kids wear stores, men's and ladies' readymade shops, and garment wholesalers. Wholesalers get sale orders, delivery challans, party-wise rates and ledgers in the same system.",
        ],
      },
      {
        h2: "Tags that print and scan from day one",
        paras: [
          "We supply TSC barcode label printers, 80mm receipt printers and handheld scanners with the software, and set up your label format so the first purchase bill prints usable tags. Worn or creased tags still scan without re-typing.",
        ],
      },
      {
        h2: "Reports a garment owner actually uses",
        points: [
          ["Dead stock by days idle", "Find styles that have not sold in 60 or 90 days, and clear them before the next season."],
          ["Size-wise stock and sale", "Know which sizes sell out and buy more of them."],
          ["Profit by item", "Net profit with cost of goods and margin, not just turnover."],
          ["GST and accounts", "GST register, ledgers, P&L and Tally export at month end."],
        ],
      },
    ],
    faqs: [
      ["Which billing software is best for a garment shop?", "Choose software that tracks stock by size and colour, prints barcode tags from the purchase bill, and handles exchanges. Ezzy ERP does all three, along with GST billing, customer ledgers and an Android app."],
      ["Can Ezzy ERP print garment barcode tags?", "Yes. Print design number, size, colour and MRP labels straight from the purchase bill on 38×25 or 40×25 2-up labels, using a TSC or similar barcode printer that we can supply."],
      ["Does it work for garment wholesale?", "Yes. Wholesalers use sale orders, delivery challans, party-wise rates, credit notes and customer ledgers, with statements sent on WhatsApp."],
      ["Can I see stock size-wise?", "Yes. Stock is tracked by product, size and colour, and the reports show size-wise stock, top sellers and dead stock."],
      DEMO_FAQ,
    ],
    trade: "Garments & textiles",
  },
  {
    path: "/footwear-shop-billing-software",
    label: "Footwear shop billing software",
    title: "Footwear Shop Billing Software — Size-Run Stock & Barcode | Ezzy ERP",
    description: "Billing and inventory software for footwear shops and showrooms: article and size-run stock, MRP billing, barcode labels, schemes, GST and WhatsApp bills. Free demo.",
    eyebrow: "Footwear · Showrooms · Wholesale",
    h1: "Billing software for footwear shops and showrooms",
    intro: [
      "In a footwear shop one article can sit in eight sizes and three colours, and the size you are out of is the sale you lose. Ezzy ERP tracks every pair by article, size and colour, so the counter and the stock room always agree.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen used at a footwear counter"],
    sections: [
      {
        h2: "Everything a footwear counter needs",
        points: [
          ["Article and size-run stock", "Enter a purchase in a size grid (for example 6 to 11) and see stock by article, size and colour."],
          ["MRP-mode billing", "Bill at MRP with GST worked out inside the price, the way footwear is sold in India."],
          ["Barcode labels for every box", "Print article, size, colour and MRP labels from the purchase bill, and bill with one scan."],
          ["Schemes and discounts", "Discounts and schemes applied at the counter, without working them out by hand."],
          ["Reorder before you run out", "Reorder reports show which sizes of a fast-moving article are running low."],
          ["Returns and exchanges", "Size exchanges that put the right pair back into stock."],
        ],
        shot: ["shot-purchase.jpg", "Ezzy ERP purchase entry with a size grid for footwear articles"],
      },
      {
        h2: "For single shops, multi-brand outlets and wholesalers",
        paras: [
          "Run one showroom or several branches on the same login, each with its own books. Footwear wholesalers get sale orders, delivery challans, party-wise rates and customer ledgers, with statements and payment reminders sent on WhatsApp.",
        ],
      },
      {
        h2: "Printers, scanners and training included",
        paras: [
          "We supply barcode label printers, 80mm thermal receipt printers and scanners with the software, set them up, and train your staff on the phone in your language. Support is available 24×7 on call and WhatsApp.",
        ],
      },
    ],
    faqs: [
      ["What is the best billing software for a footwear shop?", "Pick software that tracks stock by article and size, bills at MRP, and prints barcode labels for every box. Ezzy ERP does this, along with GST, schemes, customer ledgers and an Android app."],
      ["Can I track footwear stock size-wise?", "Yes. Purchases are entered in a size grid and stock is kept by article, size and colour, with reorder and dead stock reports."],
      ["Does it support MRP billing with GST?", "Yes. The POS has an MRP pricing mode, and every bill line carries GST for your GST register and returns."],
      ["Can I run more than one footwear showroom?", "Yes. Switch between firms and branches on one login, each with its own books and staff rights."],
      DEMO_FAQ,
    ],
    trade: "Footwear",
  },
  {
    path: "/billing-software-navi-mumbai",
    label: "Billing software in Navi Mumbai",
    title: "Billing Software in Navi Mumbai, Thane & Mumbai | Ezzy ERP, Kopar Khairane",
    description: "Retail billing, barcode and GST software from a local team in Kopar Khairane, Navi Mumbai. Software, printers, setup and support for shops in Navi Mumbai, Thane and Mumbai.",
    eyebrow: "Navi Mumbai · Thane · Mumbai",
    h1: "Billing and inventory software in Navi Mumbai, Thane and Mumbai",
    intro: [
      "Ezzy ERP is made by Adtech ERP Solutions in Kopar Khairane, Navi Mumbai. Shops in Vashi, Kopar Khairane, Ghansoli, Airoli, Nerul, Belapur, Panvel, Thane and Mumbai get billing software, barcode printers, setup and support from a team close by.",
      "Book a demo, see the billing screen with your own products, and get your counter running with printers and labels that work on the first day.",
    ],
    heroShot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with sales, purchase, stock value and receivables"],
    sections: [
      {
        h2: "Why shops choose a local billing software team",
        points: [
          ["Hardware from the same team", "Barcode label printers, 80mm receipt printers and scanners, supplied and set up with the software."],
          ["Training in your language", "Staff are trained on the phone in English, Hindi or Marathi, and most learn billing in a day."],
          ["24×7 call and WhatsApp support", "A real person answers, including on festival days when you bill the most."],
          ["A Navi Mumbai office", "Our office is at Shop No.2, Mittal Tower, Sector 1, Kopar Khairane, Navi Mumbai."],
        ],
      },
      {
        h2: "Software for the trades in your market",
        points: [
          ["Garment and saree shops", "Size and colour stock, design number tags and exchange billing."],
          ["Footwear showrooms", "Article and size-run stock with MRP billing."],
          ["Mobile and electronics stores", "IMEI and serial number tracking with EMI and mixed payments."],
          ["Supermarkets and kirana", "Fast barcode billing, low-stock alerts and daily cash report."],
          ["Wholesalers and distributors", "Sale orders, challans, party-wise rates, ledgers and a field sales app."],
        ],
        shot: ["shot-accounts.jpg", "Ezzy ERP accounts screen with customer ledger, outstanding and net receivable"],
      },
      {
        h2: "Everything in one login",
        paras: [
          "POS billing, purchase, stock, barcode labels, GST, customer and supplier ledgers, business insights and WhatsApp invoices work together in Ezzy ERP. It runs in the cloud with backup, and the Android app shows the owner the day's sale and dues from anywhere.",
        ],
      },
    ],
    faqs: [
      ["Where is Ezzy ERP located?", "Ezzy ERP (Adtech ERP Solutions) is at Shop No.2, Mittal Tower, Sector Number 1 Rd, Sector 1, Kopar Khairane, Navi Mumbai, Maharashtra 400709."],
      ["Which areas do you serve?", "We serve shops across Navi Mumbai, Thane and Mumbai, and support customers across India on call and WhatsApp."],
      ["Do you supply barcode printers in Navi Mumbai?", "Yes. We supply barcode label printers, 80mm thermal receipt printers and barcode scanners with the software, and set them up for your labels and bills."],
      ["Which languages does your support team speak?", "English, Hindi and Marathi."],
      DEMO_FAQ,
    ],
  },
];
