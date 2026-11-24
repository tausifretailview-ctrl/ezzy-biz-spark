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
  /** Phone screenshots (public/landing/app-*.jpg) shown side by side under the section. */
  phones?: [file: string, alt: string][];
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
  /** Blog posts (paths from ../blog/posts.ts) listed under "Guides for shop owners". */
  guides?: string[];
  /**
   * Set on the custom development pages. They sell the team's time, not Ezzy ERP, so the page
   * asks for a project enquiry instead of a demo and carries its own enquiry form.
   * `name` is the service as it appears in the form, WhatsApp message and schema.
   */
  service?: { name: string; icon: string; summary: string };
  /**
   * "global" marks a page written for shops outside India. Ezzy ERP's other pages speak to Indian
   * shops (GST, e-invoice, UPI); these speak of "your currency" and "VAT or GST", and their HTML
   * drops the India language and region tags.
   */
  audience?: "global";
};

const ENQUIRY_FAQ: [string, string] = [
  "How do we start?",
  `Send the enquiry form on this page, or call or WhatsApp ${PHONE}. We talk through what you need, and then share a written scope and quotation.`,
];
const WORLDWIDE_FAQ: [string, string] = [
  "Do you work with clients outside India?",
  "Yes. Our office is in Navi Mumbai, and we take up and deliver projects for clients across India and in other countries.",
];
const COST_FAQ: [string, string] = [
  "How much does it cost?",
  "It depends on what has to be built. We first understand the requirement, then give a written scope and quotation, so you know what is included before work starts.",
];

const GLOBAL_DEMO_FAQ: [string, string] = [
  "How do I get a demo from my country?",
  `Book a demo on this website, with your country code in the mobile number, or WhatsApp ${PHONE}. We show you the billing screen online, with your own products and labels.`,
];
/** We do not promise any one country's tax system: the owner confirms it for each customer. */
const RULES_FAQ: [string, string] = [
  "Does it meet my country's tax invoice or e-invoicing rules?",
  "Tax invoice formats, fiscal devices and e-invoicing rules differ from country to country. Tell us your country when you book the demo, and we confirm what is supported before you buy.",
];
const HARDWARE_FAQ: [string, string] = [
  "Which printers and scanners does it work with?",
  "Ezzy ERP prints on barcode label printers and 80mm thermal receipt printers, and reads standard barcode scanners. We tell you what to buy and help you set it up.",
];

const DEMO_FAQ: [string, string] = [
  "How do I get a free demo?",
  `Book a demo on this website, or call or WhatsApp ${PHONE}. We show you the billing screen with your own products and labels, and train your staff on the phone in your language.`,
];

export const SEO_PAGES: SeoPageData[] = [
  {
    path: "/billing-software-for-small-business",
    label: "Billing software for small business",
    title: "Billing Software for Small Business in India: GST, POS & Stock",
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
    title: "Garment Shop Billing Software for Cloth & Readymade Shops | Ezzy ERP",
    description: "Billing software for garment, cloth, saree and readymade shops in India: size-colour stock, design number barcode tags, 5%/18% GST and WhatsApp bills. Free demo.",
    eyebrow: "Garments · Cloth shops · Readymade",
    h1: "Billing software for garment, cloth and readymade shops",
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
          "Ezzy ERP is used by retail cloth shops, boutiques, saree and dress material shops, kids wear stores, men's and ladies' readymade garment shops, and garment wholesalers. Wholesalers get sale orders, delivery challans, party-wise rates and ledgers in the same system.",
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
      {
        h2: "GST on clothes, worked out per piece",
        paras: [
          "Readymade garments carry 5% GST up to ₹2,500 per piece and 18% above it. The slab depends on the value of each piece after discount, not the total of the bill, so a single bill can have both rates.",
          "Every bill line in Ezzy ERP carries its own GST rate, so a ₹1,800 kurta and a ₹3,200 blazer on the same bill are each taxed correctly, and your GST register is ready for your CA at month end.",
        ],
      },
      {
        h2: "From demo to first bill",
        points: [
          ["1. Free demo", "We show the billing screen with your own designs, sizes and tags, on a call or at your shop."],
          ["2. Setup with your labels", "We set up your size grids, label format and printers, so the first purchase bill prints tags that scan."],
          ["3. Staff training", "Your staff are trained on the phone in English, Hindi or Marathi. Most learn billing in a day."],
          ["4. Support every day", "Call or WhatsApp us 24×7, including during the festival and wedding season rush."],
        ],
      },
    ],
    faqs: [
      ["Which billing software is best for a garment shop?", "Choose software that tracks stock by size and colour, prints barcode tags from the purchase bill, and handles exchanges. Ezzy ERP does all three, along with GST billing, customer ledgers and an Android app."],
      ["Is it billing software for a cloth shop or readymade garment shop?", "Yes. Retail cloth shops and readymade garment shops use the same size grid, design number barcode tags, exchange billing and per-piece GST, whether they sell menswear, ladies wear, kids wear or sarees."],
      ["Can Ezzy ERP print garment barcode tags?", "Yes. Print design number, size, colour and MRP labels straight from the purchase bill on 38×25 or 40×25 2-up labels, using a TSC or similar barcode printer that we can supply."],
      ["Does it work for garment wholesale?", "Yes. Wholesalers use sale orders, delivery challans, party-wise rates, credit notes and customer ledgers, with statements sent on WhatsApp."],
      ["Can I see stock size-wise?", "Yes. Stock is tracked by product, size and colour, and the reports show size-wise stock, top sellers and dead stock."],
      ["Does it apply 5% and 18% GST on clothes correctly?", "Yes. Each bill line carries its own GST rate, so pieces up to ₹2,500 and pieces above ₹2,500 on the same bill are taxed at the right rate."],
      ["Can a saree shop or boutique use it?", "Yes. Saree and dress material shops, boutiques, kids wear stores and men's and ladies' readymade shops all use the same size, colour and design number features."],
      ["Does it work on a phone?", "Yes. The Android app shows the owner today's sale, stock and dues, and you can bill from the phone."],
      DEMO_FAQ,
    ],
    trade: "Garments & textiles",
    guides: ["/blog/gst-on-clothes-above-2500", "/blog/kapdon-par-gst-2026", "/blog/best-billing-software-for-garment-shop", "/blog/size-and-colour-stock-management-garment-shop"],
  },
  {
    path: "/footwear-shop-billing-software",
    label: "Footwear shop billing software",
    title: "Footwear Shop Billing & ERP Software with Size Stock & Barcode",
    description: "Footwear billing and retail ERP software for shops, showrooms and wholesalers in India: article and size-run stock, MRP billing, box labels, 5%/18% GST, branches and WhatsApp bills. Free demo.",
    eyebrow: "Footwear · Showrooms · Wholesale",
    h1: "Footwear billing and ERP software for shops, showrooms and wholesalers",
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
      {
        h2: "A footwear sale in Ezzy ERP, step by step",
        points: [
          ["1. Purchase in a size grid", "Enter the article once, with a column for each size and a row for each colour."],
          ["2. Label every box", "Print article, size, colour and MRP labels from the same purchase entry."],
          ["3. Scan and bill at MRP", "Scan the box label. The right article, size and price come up, with GST inside the MRP."],
          ["4. Exchange a size", "Swap a size 8 for a 9 on the billing screen, and both sizes are corrected in stock."],
          ["5. Reorder what sells", "Size-wise stock and sales show which sizes of each article to buy again."],
          ["6. Clear broken size runs", "Dead stock reports find articles left only in end sizes, so you can clear them before the season ends."],
        ],
      },
      {
        h2: "GST on footwear, bill by bill",
        paras: [
          "Footwear carries 5% GST up to ₹2,500 per pair and 18% above it. Each bill line in Ezzy ERP carries its own GST rate, so a bill with a pair of slippers and a pair of branded shoes is taxed correctly, and your GST register is ready at month end.",
        ],
      },
      {
        h2: "A footwear retail ERP, not just a billing app",
        points: [
          ["Purchase orders and bills", "Order from brands and distributors, receive the goods on a purchase bill in a size grid, and pay against bills."],
          ["Branches and stock transfer", "Run several showrooms on one login, see stock branch-wise and move pairs between branches."],
          ["Customer ledger and udhaar", "Party balances, advances and credit notes, with statements and reminders on WhatsApp."],
          ["Accounts and GST returns", "Ledgers, P&L and balance sheet as you bill, the GSTR-1 file ready to upload, and Tally export."],
          ["Owner app", "Today's sale, stock and dues on the Android app, wherever you are."],
          ["Staff rights", "Each salesman gets their own login and only the menus they need."],
        ],
      },
    ],
    faqs: [
      ["What is the best billing software for a footwear shop?", "Pick software that tracks stock by article and size, bills at MRP, and prints barcode labels for every box. Ezzy ERP does this, along with GST, schemes, customer ledgers and an Android app."],
      ["Can I track footwear stock size-wise?", "Yes. Purchases are entered in a size grid and stock is kept by article, size and colour, with reorder and dead stock reports."],
      ["Does it support MRP billing with GST?", "Yes. The POS has an MRP pricing mode, and every bill line carries GST for your GST register and returns."],
      ["Can I run more than one footwear showroom?", "Yes. Switch between firms and branches on one login, each with its own books and staff rights."],
      ["How do I handle size exchanges?", "Do the exchange on the billing screen. The returned pair goes back into stock in its size and the new pair comes out, so stock stays correct."],
      ["Is Ezzy ERP a footwear ERP or only billing software?", "Both. Besides counter billing it covers purchase, size-run stock, branches and stock transfer, customer ledgers, accounts and GST returns, so it works as a retail ERP for footwear shops and wholesalers."],
      ["What is the GST on footwear?", "5% up to ₹2,500 per pair and 18% above it. See our guide to GST on footwear in 2026 for examples."],
      ["Does it work for footwear wholesale?", "Yes. Wholesalers use sale orders, delivery challans, party-wise rates and customer ledgers, with statements and payment reminders on WhatsApp."],
      DEMO_FAQ,
    ],
    trade: "Footwear",
    guides: ["/blog/gst-on-footwear-2026", "/blog/footwear-stock-management-size-run", "/blog/barcode-printer-for-garment-shop", "/blog/wedding-season-sale-checklist-garment-shop"],
  },
  {
    path: "/wholesale-billing-software",
    label: "Wholesale billing software",
    title: "Wholesale Billing Software: Orders, Challans, Party Rates & GST",
    description: "Billing software for wholesalers and distributors in India: sale orders, delivery challans, party-wise rates, customer ledgers, GST, WhatsApp statements and a field sales app.",
    eyebrow: "Wholesale · Distribution",
    h1: "Wholesale billing software for traders and distributors",
    intro: [
      "A wholesaler does not just print bills. You take orders, send goods on challan, sell to each party at its own rate, give credit, and chase payments. When this lives in registers and spreadsheets, stock and dues never quite match.",
      "Ezzy ERP brings orders, challans, invoices, stock, party ledgers and GST into one login, with an Android app for your salesmen and statements sent on WhatsApp.",
    ],
    heroShot: ["shot-accounts.jpg", "Ezzy ERP accounts screen with customer ledger, outstanding and net receivable"],
    sections: [
      {
        h2: "Everything a wholesale counter needs",
        points: [
          ["Sale orders to invoices", "Take an order, send the goods on a delivery challan, and turn it into an invoice without typing it again."],
          ["Party-wise rates", "The rate you last gave each party comes up when you bill them again, so regular buyers get their usual price."],
          ["Customer ledgers and credit", "Party balances, advances, credit notes and bill-by-bill settlement, Tally style."],
          ["Statements and reminders on WhatsApp", "Send ledgers, invoices and payment reminders from the billing screen."],
          ["Stock by item, size and colour", "Purchases add stock, challans and sales reduce it, and you see live stock at any time."],
          ["GST and accounts", "GST register, trial balance, ledgers, P&L and Tally export, ready for your CA."],
        ],
        shot: ["shot-customers.jpg", "Ezzy ERP customer list with balances and lifetime sale"],
      },
      {
        h2: "A field sales app for your salesmen",
        paras: [
          "Your salesmen take orders and collect outstanding on the Android app, even without internet. It syncs when they are back online, so the office sees new orders and payments without phone calls.",
          "The owner app shows today's sale, stock and dues from anywhere.",
        ],
      },
      {
        h2: "Made for these wholesale trades",
        points: [
          ["Garment and textile wholesale", "Size and colour stock, design number labels and party-wise rates."],
          ["Footwear wholesale", "Article and size-run stock, challans and party ledgers."],
          ["Mobile and electronics distribution", "IMEI and serial number tracking with mixed payments."],
          ["General goods distribution", "Fast barcode billing, low-stock alerts and outstanding reports."],
        ],
      },
      {
        h2: "One team for software, hardware and support",
        paras: [
          "We supply barcode label printers, receipt printers and scanners, set up the software for your firm and branches, and train your staff on the phone in English, Hindi or Marathi. Support is on call and WhatsApp, 24×7.",
        ],
      },
    ],
    faqs: [
      ["What is the best billing software for a wholesale business?", "Pick software that handles sale orders, delivery challans, party-wise rates and customer ledgers along with GST, not just invoices. Ezzy ERP does all of this, with WhatsApp statements and a field sales app."],
      ["Can I give different rates to different customers?", "Yes. When you bill a party, Ezzy ERP shows the rate you last sold that item to them at, so each buyer keeps their usual price."],
      ["Can I make a delivery challan and bill it later?", "Yes. Send goods on a delivery challan and convert it into an invoice when you bill, without re-entering the items."],
      ["Can my salesmen take orders on a phone?", "Yes. The Android field sales app takes orders and collections, works offline, and syncs later."],
      ["Can I run retail and wholesale together?", "Yes. The same login handles counter billing and wholesale orders, and you can switch between firms and branches, each with its own books."],
      DEMO_FAQ,
    ],
    trade: "Wholesale / distribution",
  },
  {
    path: "/retail-inventory-management-software",
    label: "Retail inventory management software",
    title: "Retail Inventory Management Software: Size, Barcode & Reorder",
    description: "Inventory software for retail shops in India: live stock by size and colour, barcode labels, purchase entry, low-stock and reorder reports, dead stock and stock value. Free demo.",
    eyebrow: "Retail · Stock · Barcode",
    h1: "Retail inventory management software that matches your shelf",
    intro: [
      "Most shops know their sale for the day. Far fewer know what is really on the shelf, which items are running out, and how much money is stuck in stock that is not selling.",
      "Ezzy ERP keeps stock right automatically: purchases add it, bills reduce it, returns put it back, and every item has a barcode. Billing and inventory are the same system, so the counter and the stock room always agree.",
    ],
    heroShot: ["shot-insights.jpg", "Ezzy ERP business insights with stock health, sales trends and reorder analysis"],
    sections: [
      {
        h2: "How Ezzy ERP keeps your stock right",
        points: [
          ["Live stock by item and variant", "See stock by product, size and colour at any time, across firms and branches."],
          ["Purchase entry that adds stock", "Enter purchase bills (with a size grid for garments and footwear), DC purchases and purchase returns."],
          ["Barcode on every item", "Auto-generate or scan barcodes and print labels, so every sale takes the right item out of stock."],
          ["Low-stock and reorder reports", "Know what to buy before it runs out, with batch and low-stock alerts."],
          ["Dead stock and stock health", "Find items that have not sold in 60 or 90 days, and see the value of your stock."],
          ["Stock settlement and adjustments", "Count the shelf, correct the difference, and keep a record of every adjustment."],
        ],
        shot: ["shot-purchase.jpg", "Ezzy ERP purchase bill entry with a size grid, barcode column and Print Barcodes button"],
      },
      {
        h2: "Why inventory and billing should be one system",
        paras: [
          "When stock lives in a separate register or spreadsheet, it is always a few days behind. In Ezzy ERP every bill, return and purchase updates stock the moment it is saved, so reorder and dead stock reports are based on what really happened today.",
          "The owner sees stock, sale and dues on the Android app, and staff only see what their rights allow.",
        ],
      },
      {
        h2: "Inventory for every kind of shop",
        points: [
          ["Garment and textile shops", "Size and colour matrix, design number labels and size-wise reports."],
          ["Footwear shops", "Article and size-run stock with box labels."],
          ["Mobile and electronics stores", "IMEI and serial number tracking for every unit."],
          ["Supermarkets and kirana", "Fast barcode billing with batch and low-stock alerts."],
        ],
        shot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with stock value, sales and receivables"],
      },
    ],
    faqs: [
      ["What is retail inventory management software?", "It keeps track of the stock in your shop: what you bought, what you sold, what is left and what to reorder. In Ezzy ERP it works together with billing, so stock updates with every bill and purchase."],
      ["Can I track stock size-wise and colour-wise?", "Yes. Stock is kept by product, size and colour, with size-wise stock and sales reports."],
      ["Does it show which items to reorder?", "Yes. Low-stock alerts and reorder reports show what is running out, and dead stock reports show what is not selling."],
      ["Can I print barcode labels for my items?", "Yes. Print 38×25, 40×25 2-up and other labels from the purchase bill or item list, on printers we supply and set up."],
      ["Can I see stock for more than one branch?", "Yes. Switch between firms and branches on one login, each with its own stock and books."],
      DEMO_FAQ,
    ],
    guides: ["/blog/size-and-colour-stock-management-garment-shop", "/blog/garment-barcode-label-size"],
  },
  {
    path: "/billing-software-for-manufacturers",
    label: "Billing software for manufacturers",
    title: "Billing Software for Manufacturers: E-Invoice, E-Way Bill, Stock",
    description: "ERP for manufacturers and industrial units in India: quotations, sale orders, GST invoices, e-invoice, e-way bill, warehouse stock, GST returns, accounts and asset management.",
    eyebrow: "Manufacturers · Industrial units",
    h1: "Billing software for manufacturers and industrial units",
    intro: [
      "A manufacturer sells differently from a shop. You send a quotation, the buyer confirms an order, goods go out in parts on challans, and once your turnover crosses the limit every B2B bill needs an e-invoice. Then GST returns, party outstanding and accounts have to match at month end.",
      "Ezzy ERP keeps this whole chain in one login: quotation to sale order to challan to GST invoice, with e-invoice IRN generated from the bill, stock that updates with every purchase and dispatch, and books your CA can use.",
    ],
    heroShot: ["shot-accounts.jpg", "Ezzy ERP accounts screen with customer ledger, outstanding and net receivable"],
    sections: [
      {
        h2: "From quotation to payment, without typing it twice",
        points: [
          ["Quotations", "Make a quotation with your rates, GST and terms, send it on WhatsApp, and convert it into a sale order when the buyer confirms."],
          ["Sale orders with pending quantity", "Track each order as confirmed, partly delivered or completed, and see the quantity still to be dispatched."],
          ["Delivery challans", "Send goods on a challan and turn it into a GST invoice later, without re-entering the items."],
          ["GST invoices with e-invoice", "Generate the e-invoice IRN and signed QR code from the sale bill, and print them on the invoice. Cancel an IRN from the same screen when needed."],
          ["Purchase orders and purchase bills", "Order raw material and goods from suppliers, then receive them on a purchase bill that adds stock."],
          ["Party ledgers and outstanding", "Customer and supplier balances, advances, credit notes and bill-by-bill settlement, with statements and reminders on WhatsApp."],
          ["E-way bill", "Make the e-way bill for goods you dispatch, along with the GST invoice and e-invoice."],
        ],
        shot: ["shot-gl.jpg", "Ezzy ERP general ledger with debit, credit and running balance"],
      },
      {
        h2: "GST returns and accounts, ready for your CA",
        paras: [
          "Ezzy ERP prepares the GSTR-1 file from your sales, ready to upload on the GST portal, and shows the GSTR-3B figures, so month-end is a review instead of a re-entry. A filing tracker reminds you which return is due and records when it was filed.",
          "Ledgers, trial balance, P&L and balance sheet are kept as you bill, with Tally export when your accountant prefers Tally.",
        ],
      },
      {
        h2: "Stock, warehouses and assets",
        points: [
          ["Live stock", "Purchases add stock, challans and sales reduce it, and you see stock by item at any time, with low-stock and reorder reports."],
          ["Warehouse management", "Keep stock in more than one warehouse or godown, see stock warehouse-wise, and move stock between them."],
          ["More than one unit or branch", "Run each unit or branch with its own stock and books on one login, and transfer stock between them."],
          ["Asset management", "Keep a register of your machines, vehicles and other fixed assets alongside your accounts."],
          ["Staff rights", "Give every staff member only the menus they need, with an audit log and a recycle bin for deleted entries."],
          ["Dealer orders on the phone", "Your salesmen take orders and collect payments on the Android field sales app, even offline."],
        ],
      },
      {
        h2: "Garment and textile manufacturing",
        paras: [
          "For garment and textile units, Ezzy ERP also runs production: design cards with fabric and trims per piece, fabric stock in metres, production lots, process stages and job workers. See garment manufacturing software for the details.",
        ],
      },
    ],
    faqs: [
      ["Which manufacturing businesses use Ezzy ERP?", "Manufacturers and industrial units that sell to dealers, distributors and other businesses, and need quotations, sale orders, challans, GST invoices with e-invoice, stock and accounts in one place. Garment and textile units can also run production in it."],
      ["Can I convert a quotation into a sale order and then a bill?", "Yes. A quotation converts into a sale order, the order can be delivered in parts on challans, and a challan or order converts into a GST invoice without typing the items again."],
      ["Does Ezzy ERP generate e-invoices?", "Yes. You can generate the e-invoice IRN and signed QR code from the sale bill and print them on the invoice, and cancel an IRN from the same screen."],
      ["Can it file my GST returns?", "Ezzy ERP prepares the GSTR-1 file to upload on the GST portal and shows the GSTR-3B figures. You or your CA then file on the portal, and you mark the return as filed in Ezzy ERP."],
      ["Can I manage more than one warehouse or godown?", "Yes. Keep stock in more than one warehouse or godown, see stock warehouse-wise and move stock between them. Each unit or branch can also run with its own books on one login."],
      ["Does Ezzy ERP make e-way bills?", "Yes. You can make the e-way bill for goods you dispatch, along with the GST invoice and e-invoice."],
      DEMO_FAQ,
    ],
    guides: ["/blog/e-invoice-limit-2026", "/blog/e-way-bill-rules-2026", "/blog/gst-changes-november-2026"],
    trade: "Manufacturing / industrial",
  },
  {
    path: "/e-invoice-software",
    label: "E-invoice software",
    title: "E-Invoice Software for GST: Generate IRN & QR from Your Bill",
    description: "GST e-invoice software for Indian businesses: generate IRN and signed QR code from the sale bill, print them on the invoice, cancel an IRN, and track e-invoices in a report.",
    eyebrow: "GST e-invoicing",
    h1: "E-invoice software that generates the IRN from your bill",
    intro: [
      "Once your business crosses the e-invoice turnover limit, every B2B invoice needs an IRN and a signed QR code from the Invoice Registration Portal. Typing each bill again on the government portal, or uploading files one by one, takes time and invites mistakes.",
      "In Ezzy ERP you make the sale bill as usual and generate the e-invoice from it. The IRN, acknowledgement number and QR code come back into the bill and print on the invoice.",
    ],
    heroShot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with sales, invoices, stock value and receivables"],
    sections: [
      {
        h2: "How e-invoicing works in Ezzy ERP",
        points: [
          ["Bill as usual", "Make the GST invoice with party GSTIN, HSN codes and tax, the same way you bill today."],
          ["Generate the IRN", "Send the invoice to the Invoice Registration Portal from the bill. The IRN, acknowledgement number and date are saved on it."],
          ["Print with the QR code", "The invoice prints with the IRN and the signed QR code, ready to hand over or send on WhatsApp."],
          ["Cancel when needed", "Cancel an IRN from the same screen, within the time the GST rules allow."],
          ["E-invoice report", "See which B2B bills have an IRN and which are still pending, so none is missed."],
          ["Connection test", "Check your e-invoice login and connection before your first bill. We help you set it up."],
        ],
      },
      {
        h2: "Who needs e-invoicing",
        paras: [
          "Under GST, a business whose aggregate turnover has crossed ₹5 crore in any financial year since 2017-18 must issue e-invoices for business-to-business sales, exports, and credit and debit notes. Bills to consumers (B2C) do not need an IRN. Ask your CA to confirm the rules for your business, as limits and time limits are changed by notification.",
          "Because the IRN is generated from the same bill that updates your stock, ledgers and GST reports, your e-invoices, GSTR-1 and books always match.",
        ],
      },
      {
        h2: "More than an e-invoice tool",
        points: [
          ["Quotation to invoice", "Quotations, sale orders, delivery challans and GST invoices in one flow."],
          ["E-way bill", "Make the e-way bill for goods you dispatch, from the same software."],
          ["GST returns", "GSTR-1 file ready to upload on the GST portal, and GSTR-3B figures."],
          ["Stock and accounts", "Live stock, party ledgers, trial balance, P&L and Tally export."],
          ["WhatsApp", "Send the e-invoice, statements and payment reminders on WhatsApp."],
        ],
        shot: ["shot-accounts.jpg", "Ezzy ERP accounts screen with customer ledger, outstanding and net receivable"],
      },
    ],
    faqs: [
      ["What is an e-invoice under GST?", "An e-invoice is a B2B GST invoice that is registered on the government's Invoice Registration Portal (IRP). The portal returns an Invoice Reference Number (IRN) and a signed QR code, which must appear on the invoice."],
      ["Who has to generate e-invoices?", "Businesses whose aggregate turnover has crossed ₹5 crore in any financial year since 2017-18, for B2B sales, exports and credit or debit notes. Check with your CA for your business."],
      ["Can Ezzy ERP generate the IRN directly from my bill?", "Yes. You generate the e-invoice from the sale bill. The IRN, acknowledgement number and signed QR code are saved and printed on the invoice."],
      ["Can I cancel an e-invoice?", "Yes. You can cancel the IRN from Ezzy ERP within the time the GST rules allow, and then correct the bill."],
      ["Do I need a separate e-invoice software?", "No. E-invoicing is part of Ezzy ERP's billing, so the same bill updates stock, ledgers and GST reports."],
      DEMO_FAQ,
    ],
    guides: ["/blog/e-invoice-limit-2026", "/blog/gst-changes-november-2026"],
    trade: "Manufacturing / industrial",
  },
  {
    path: "/garment-manufacturing-software",
    label: "Garment manufacturing software",
    title: "Garment Manufacturing Software: Fabric, Lots, Job Work, Billing",
    description: "Software for garment and textile manufacturers in India: design cards with fabric per piece, fabric stock in metres, production lots, stages, job workers, plus billing, e-invoice and GST.",
    eyebrow: "Garment & textile manufacturing",
    h1: "Garment manufacturing software, from fabric to finished piece to bill",
    intro: [
      "A garment unit buys fabric in metres, cuts it into lots, sends pieces to job workers for stages like stitching, buttons and ironing, and then sells finished pieces by size and colour. When this is tracked on paper, nobody knows how much fabric is left, which worker has how many pieces, or what a piece really cost.",
      "Ezzy ERP connects production with billing and stock. Plan each design, issue fabric to a lot, follow pieces through every stage, and sell the finished goods from the same software.",
    ],
    heroShot: ["shot-purchase.jpg", "Ezzy ERP purchase bill entry with size grid and item details"],
    sections: [
      {
        h2: "Production, step by step",
        points: [
          ["Design cards", "For each design, list the fabric and trims needed for one piece, the allowed wastage and other costs, and see the standard cost per piece."],
          ["Fabric stock in metres", "Buy fabric in metres with roll-wise entry, and see how many pieces you can make now from the fabric in stock."],
          ["Production lots and cutting", "Start a lot, issue fabric to it, and count the pieces on the cutting screen."],
          ["Your own process stages", "Set stages like cutting, colouring, buttons and ironing, done by your staff, outside job workers, or both."],
          ["Job workers and late work", "Set the rate per piece and allowed days for each stage, and see the pieces pending with each worker and which are late."],
          ["Finished goods into stock", "Finished pieces come into stock by size and colour, ready for barcode labels and billing."],
        ],
      },
      {
        h2: "Selling what you make",
        paras: [
          "Send quotations and take sale orders from retailers and wholesalers, dispatch on delivery challans, and bill with GST and e-invoice IRN. Size and colour stock, design number labels and party-wise rates work the same way as in our garment shop software.",
          "Party ledgers, GSTR-1 file, GSTR-3B figures, P&L and Tally export are kept as you work.",
        ],
        shot: ["shot-insights.jpg", "Ezzy ERP business insights with sales trends and stock health"],
      },
    ],
    faqs: [
      ["Can Ezzy ERP track fabric used per piece?", "Yes. Each design card lists the fabric and trims needed for one piece with an allowed wastage, and fabric stock is kept in metres, so you can see how many pieces the fabric in stock can make."],
      ["Can I track pieces given to job workers?", "Yes. Set your process stages and job workers with a rate per piece and allowed days, and see pending and late pieces for each worker."],
      ["Does it also do billing and GST?", "Yes. The same software makes quotations, sale orders, challans and GST invoices with e-invoice, and keeps stock, ledgers and GST reports."],
      ["Can I print barcode labels for finished garments?", "Yes. Print design number, size and MRP barcode labels for finished pieces, on the barcode printers we supply."],
      DEMO_FAQ,
    ],
    trade: "Manufacturing / industrial",
  },
  {
    path: "/billing-software-navi-mumbai",
    label: "Billing software in Navi Mumbai",
    title: "Billing Software in Navi Mumbai, Thane & Mumbai | Ezzy ERP",
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

  /* ---- Trades the home page lists that had no page of their own ---- */
  {
    path: "/mobile-shop-billing-software",
    label: "Mobile shop billing software",
    title: "Mobile Shop Billing Software with IMEI Tracking | Ezzy ERP",
    description: "Billing software for mobile and electronics shops in India: IMEI and serial number tracking, EMI and mixed payments, GST bills, stock and WhatsApp invoices. Free demo.",
    eyebrow: "Mobiles · Electronics · Appliances",
    h1: "Billing software for mobile shops and electronics stores",
    intro: [
      "A mobile shop sells the same model to ten customers, but every handset has its own IMEI. When a customer returns with a complaint, or you need to know which pieces are still unsold, the model name is not enough. You need the exact unit.",
      "Ezzy ERP tracks each handset and appliance by its IMEI or serial number, from the purchase bill to the customer's invoice, along with GST billing, stock, customer ledgers and an Android app for the owner.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with barcode field, customer lookup and payment modes on function keys"],
    sections: [
      {
        h2: "Built for IMEI and serial number stock",
        points: [
          ["Every unit by its own number", "Handsets and appliances are tracked by IMEI or serial number, so you know exactly which pieces are in stock."],
          ["The number on the invoice", "The bill carries the IMEI or serial number of the unit sold, ready for a warranty claim."],
          ["EMI and mixed payments", "Take part of a bill in cash, part on UPI or card and the rest on finance, all on one bill."],
          ["Fast counter billing", "Scan the barcode or search by name, and print the bill in seconds. Hold a bill while the customer decides."],
          ["Accessories on the same bill", "Covers, chargers and earphones are billed by barcode along with the handset, each line with its own GST."],
          ["Returns and credit notes", "Sales returns and credit notes put the unit back into stock and keep the customer's account right."],
        ],
        shot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with total sales, invoices, stock value, receivables and cash collection"],
      },
      {
        h2: "For mobile counters, electronics showrooms and appliance dealers",
        paras: [
          "Ezzy ERP is made for mobile counters, electronics showrooms and appliance dealers. A single shop bills from one counter. A dealer with several showrooms runs each branch with its own stock and books on the same login, and gives every salesman only the menus he needs.",
        ],
      },
      {
        h2: "What the owner sees every day",
        points: [
          ["Live stock", "Stock by product at any time, with low-stock and reorder reports before a fast-moving model runs out."],
          ["Slow stock", "Items that have not sold in 60 or 90 days, so money is not stuck in old models."],
          ["Profit, not just sale", "Net profit by item with cost of goods and margin."],
          ["Dues and credit", "Customer balances, advances and credit notes, with statements and reminders on WhatsApp."],
          ["The shop on your phone", "Today's sale, stock and dues on the Android app, wherever you are."],
        ],
      },
      {
        h2: "GST and accounts kept as you bill",
        paras: [
          "Every bill line carries GST, and the GST register, ledgers, trial balance, P&L and balance sheet are ready when your accountant asks, with Tally export. Ezzy ERP also prepares the GSTR-1 file for the GST portal, and generates e-invoices for business customers when your turnover needs them.",
        ],
      },
      {
        h2: "Printers, scanners and training from one team",
        paras: [
          "We supply barcode label printers, 80mm thermal receipt printers and scanners with the software, set them up, and train your staff on the phone in English, Hindi or Marathi. Support is on call and WhatsApp, 24×7.",
        ],
      },
    ],
    faqs: [
      ["Which billing software is best for a mobile shop?", "Choose software that tracks every handset by its IMEI, prints that number on the bill, and takes cash, UPI, card and finance on one bill. Ezzy ERP does this, along with GST, stock, customer ledgers and an Android app."],
      ["Can Ezzy ERP track IMEI numbers?", "Yes. Mobiles and electronics are tracked by IMEI or serial number, and the number appears on the customer's invoice."],
      ["Can I take EMI or finance payments on a bill?", "Yes. The billing screen takes mixed payments, so part of a bill can be cash, UPI or card and the rest on finance."],
      ["Does it work for electronics and appliance showrooms?", "Yes. Appliances and electronics are tracked by serial number in the same way, with warranty-ready invoices."],
      ["Can I run more than one mobile shop?", "Yes. Switch between firms and branches on one login, each with its own stock, books and staff rights."],
      ["Does it work on a phone?", "Yes. The Android app shows the owner today's sale, stock and dues, and you can bill from the phone."],
      DEMO_FAQ,
    ],
    trade: "Mobiles & electronics",
  },
  {
    path: "/supermarket-billing-software",
    label: "Supermarket & kirana billing software",
    title: "Supermarket & Kirana Store Billing Software | Ezzy ERP",
    description: "Billing software for supermarkets, kirana and general stores in India: fast barcode billing, low-stock alerts, customer credit, daily cash report and GST. Free demo.",
    eyebrow: "Supermarket · Kirana · General store",
    h1: "Billing software for supermarkets, kirana and general stores",
    intro: [
      "A general store sells hundreds of small items to a queue of customers. The counter has to be fast, the shelf has to be full, and at night the cash in the drawer has to match the day's bills.",
      "Ezzy ERP is made for that counter: barcode billing in seconds, an alert before an item runs out, customer credit you can track, and a daily cash report, with GST and accounts kept as you bill.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with barcode field, customer lookup and payment modes on function keys"],
    sections: [
      {
        h2: "A counter that keeps the queue moving",
        points: [
          ["Fast barcode billing", "Scan the item and it is on the bill. Search by name for anything without a barcode."],
          ["Hold a bill", "Hold a half-finished bill on a function key and serve the next customer."],
          ["Every way of paying", "Cash, UPI, card or credit, or split between them on one bill."],
          ["Thermal receipts", "Bills print on an 80mm thermal printer, which we supply and set up."],
          ["Bills on WhatsApp", "Send the bill to the customer's phone from the billing screen."],
          ["Staff see only the counter", "Give counter staff the billing screen only, and keep profit and settings for the owner."],
        ],
        shot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with total sales, invoices, stock value, receivables and cash collection"],
      },
      {
        h2: "Stock that stays on the shelf",
        points: [
          ["Purchases add stock", "Enter the supplier's bill once. Stock goes up, and every sale brings it down."],
          ["A barcode for every item", "Scan the maker's barcode, or generate your own and print labels for loose and repacked items."],
          ["Batch and low-stock alerts", "Know what is running low before the shelf is empty."],
          ["Reorder reports", "A list of what to buy, based on what actually sold."],
          ["Stock that is not moving", "Items that have not sold in 60 or 90 days, and the money held in them."],
          ["Stock check", "Count the shelf, correct the difference, and keep a record of every adjustment."],
        ],
      },
      {
        h2: "Customer credit and the day's cash",
        paras: [
          "Regular customers buy on credit. Ezzy ERP keeps each customer's balance, advances and payments, and sends the statement or a payment reminder on WhatsApp, so udhaar does not live in a notebook.",
          "At closing time the daily cash report shows the day's bills by cash, UPI, card and credit, so the drawer can be checked against the software.",
        ],
      },
      {
        h2: "For every kind of general store",
        points: [
          ["Supermarkets", "Several counters, many items, and reorder reports for the purchase manager."],
          ["Kirana stores", "Quick bills, customer credit and a simple daily cash report."],
          ["Cosmetics shops", "Many small items by barcode, with batch and low-stock alerts."],
          ["Stationery shops", "Barcode billing for small-value items, with stock you can trust at season time."],
        ],
        shot: ["shot-customers.jpg", "Ezzy ERP customer list with balances and lifetime sale"],
      },
      {
        h2: "Software, hardware and training from one team",
        paras: [
          "We supply barcode label printers, 80mm thermal receipt printers and barcode scanners with the software, set them up, and train your staff on the phone in English, Hindi or Marathi. Most staff learn the billing screen in a day. Support is on call and WhatsApp, 24×7.",
        ],
      },
    ],
    faqs: [
      ["Which billing software is best for a supermarket or kirana store?", "Choose software that bills by barcode quickly, warns you before items run out, tracks customer credit and gives a daily cash report. Ezzy ERP does this, with GST, accounts and an Android app for the owner."],
      ["Can I print barcodes for items that do not have one?", "Yes. Ezzy ERP generates barcodes and prints labels, on printers we supply and set up, so loose and repacked items can be scanned too."],
      ["Can I keep customer credit (udhaar)?", "Yes. Each customer has a ledger with balances, advances and payments, and you can send statements and reminders on WhatsApp."],
      ["Does it give a daily cash report?", "Yes. The daily cash report shows the day's collection by payment mode, to check against the cash drawer."],
      ["Can I add a second counter or branch later?", "Yes. Each staff member gets a login with only the menus they need, and you can run more than one branch on the same login, each with its own books."],
      ["Is it GST ready?", "Yes. Every bill line carries GST, and you get a GST register, ledgers, trial balance, P&L and balance sheet, with Tally export."],
      DEMO_FAQ,
    ],
    trade: "Departmental / general store",
  },
  {
    path: "/saree-shop-billing-software",
    label: "Saree shop & boutique billing software",
    title: "Saree Shop & Boutique Billing Software with Barcode | Ezzy ERP",
    description: "Billing software for saree shops, boutiques and dress material stores: a barcode tag on every piece, design and colour stock, exchange billing, GST and WhatsApp bills. Free demo.",
    eyebrow: "Sarees · Boutiques · Dress material",
    h1: "Billing software for saree shops and boutiques",
    intro: [
      "A saree shop does not stock sizes. It stocks pieces: every saree has its own design, colour and price, and two that look alike on the shelf can differ by a thousand rupees. Billing from memory or a handwritten tag is where margin leaks.",
      "Ezzy ERP gives every piece a barcode tag with its design number and MRP, bills it with one scan, and shows which designs and colours are selling and which have sat on the shelf since last season.",
    ],
    heroShot: ["shot-purchase.jpg", "Ezzy ERP purchase bill entry with barcode column, purchase and sale rate, GST and a Print Barcodes button"],
    sections: [
      {
        h2: "Every piece tagged, every piece counted",
        points: [
          ["Design number tags", "Print design number (D.No), colour and MRP tags straight from the purchase bill, on 38×25 or 40×25 2-up labels."],
          ["One-scan billing", "Scan the tag and the right piece and price come up. No reading prices off a sticker."],
          ["Stock by design and colour", "See what is left in each design and colour, by brand or supplier."],
          ["Sarees and stitched wear together", "Sarees as single pieces, and blouses, kurtis or lehengas in a size grid, in the same software."],
          ["Exchange and returns", "Exchanges and returns that put the piece back into stock and settle the difference on the bill."],
          ["A note on the bill", "Add a note for fall and pico or alteration details, so the counter and the tailor read the same thing."],
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with size and colour columns for garment billing"],
      },
      {
        h2: "For saree shops, boutiques and dress material stores",
        paras: [
          "Ezzy ERP is used by boutiques and by saree and dress material shops, from a single counter to showrooms with several branches. Saree wholesalers get sale orders, delivery challans, party-wise rates and customer ledgers in the same system.",
          "In the wedding and festival season, bills can be held on function keys while a family is still choosing, so the counter keeps moving.",
        ],
      },
      {
        h2: "Know what sells before you buy again",
        points: [
          ["Dead stock by days idle", "Find designs that have not sold in 60 or 90 days, and clear them before the next season's buying."],
          ["Profit by item", "Net profit with cost of goods and margin, not just turnover."],
          ["Your best customers", "VIP, regular and at-risk customers by lifetime sale."],
          ["Bills and offers on WhatsApp", "Send the bill, and festival or new-arrival offers, to the customer's phone."],
        ],
      },
      {
        h2: "GST on every line of the bill",
        paras: [
          "Each bill line in Ezzy ERP carries its own HSN code and GST rate, so a bill with a saree, a blouse piece and a stitched garment taxes each one correctly, and the GST register is ready for your CA at month end.",
          "Sarees, dress material and stitched garments do not all carry the same rate. Ask your CA for the HSN code and rate of each category once, and set it on the product.",
        ],
      },
      {
        h2: "Tags that print and scan from day one",
        paras: [
          "We supply barcode label printers, 80mm receipt printers and handheld scanners with the software, and set up your label format so the first purchase bill prints usable tags. Staff are trained on the phone in English, Hindi or Marathi, and support is on call and WhatsApp, 24×7.",
        ],
      },
    ],
    faqs: [
      ["Which billing software is best for a saree shop?", "Choose software that tags every piece with a barcode, keeps stock by design and colour, and handles exchanges. Ezzy ERP does all three, along with GST billing, customer ledgers and an Android app."],
      ["Can I print barcode tags for sarees?", "Yes. Print design number, colour and MRP tags from the purchase bill on 38×25 or 40×25 2-up labels, using a barcode printer that we can supply."],
      ["Is it suitable for a small boutique?", "Yes. A boutique with one counter uses the same tags, billing and stock reports, and can bill from a computer or the Android app."],
      ["Does it handle exchanges?", "Yes. Do the exchange on the billing screen. The returned piece goes back into stock and the difference is settled on the new bill."],
      ["Does it work for saree wholesale?", "Yes. Wholesalers use sale orders, delivery challans, party-wise rates and customer ledgers, with statements sent on WhatsApp."],
      ["Does it work on a phone?", "Yes. The Android app shows the owner today's sale, stock and dues, and you can bill from the phone."],
      DEMO_FAQ,
    ],
    trade: "Garments & textiles",
    guides: ["/blog/barcode-printer-for-garment-shop", "/blog/garment-barcode-label-size", "/blog/dead-stock-in-garment-shop", "/blog/wedding-season-sale-checklist-garment-shop"],
  },

  /* ---- City pages. Each one is about that city's own markets, not the Navi Mumbai page with the name changed. ---- */
  {
    path: "/billing-software-mumbai",
    label: "Billing software in Mumbai",
    title: "Billing Software in Mumbai for Shops & Wholesalers | Ezzy ERP",
    description: "GST billing, barcode and inventory software for shops and wholesalers in Mumbai, with printers, setup at your shop and support from our team in Navi Mumbai. Free demo.",
    eyebrow: "Mumbai · Retail · Wholesale",
    h1: "Billing software in Mumbai for shops and wholesalers",
    intro: [
      "Mumbai's markets move fast. A cloth wholesaler near Mangaldas Market, a garment shop in Dadar, a footwear showroom on Linking Road and a mobile counter in Borivali all need the same thing: a bill in seconds, and stock and dues that are right at the end of the day.",
      "Ezzy ERP is made by Adtech ERP Solutions in Kopar Khairane, Navi Mumbai, just across the creek. Shops in Mumbai get the software, barcode printers, setup and support from one team close by.",
    ],
    heroShot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with sales, purchase, stock value and receivables"],
    sections: [
      {
        h2: "What a Mumbai shop gets from us",
        points: [
          ["A demo at your shop or on a call", "We show the billing screen with your own products and labels before you decide."],
          ["Hardware from the same team", "Barcode label printers, 80mm receipt printers and scanners, supplied and set up with the software."],
          ["Setup at your counter", "We set up the software, printers and label format at shops in Mumbai, so the first bill prints right."],
          ["Training in your language", "Staff are trained in English, Hindi or Marathi, and most learn billing in a day."],
          ["24×7 call and WhatsApp support", "A real person answers, including on festival days when Mumbai shops bill the most."],
        ],
      },
      {
        h2: "Software for Mumbai's trades",
        points: [
          ["Cloth and garment shops", "Size and colour stock, design number tags and exchange billing."],
          ["Saree shops and boutiques", "A barcode tag on every piece, with stock by design and colour."],
          ["Footwear showrooms", "Article and size-run stock with MRP billing."],
          ["Mobile and electronics stores", "IMEI and serial number tracking with EMI and mixed payments."],
          ["Supermarkets and general stores", "Fast barcode billing, low-stock alerts and a daily cash report."],
          ["Wholesalers and distributors", "Sale orders, challans, party-wise rates, ledgers and a field sales app."],
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with barcode field, customer lookup and payment modes"],
      },
      {
        h2: "More than one outlet in the city",
        paras: [
          "Many Mumbai businesses run a shop in one suburb and a godown or second outlet in another. Ezzy ERP runs every branch on one login, each with its own stock and books, and moves stock between them.",
          "The owner sees the day's sale, stock and dues for each outlet on the Android app, without calling the shop, and every staff member gets only the menus they need.",
        ],
      },
      {
        h2: "GST, e-invoice and e-way bill",
        paras: [
          "Every bill carries GST, and the GST register, GSTR-1 file, ledgers and P&L are kept as you bill, with Tally export for your CA. Wholesalers and manufacturers generate the e-invoice IRN and the e-way bill from the same sale bill.",
          "Goods moving within Maharashtra and goods leaving the state follow different e-way bill limits. Our guide to e-way bill rules, linked below, explains them.",
        ],
      },
    ],
    faqs: [
      ["Do you provide billing software in Mumbai?", "Yes. We supply Ezzy ERP billing, barcode and inventory software to shops and wholesalers across Mumbai, with printers, setup and training."],
      ["Where is your office?", "Ezzy ERP (Adtech ERP Solutions) is at Shop No.2, Mittal Tower, Sector Number 1 Rd, Sector 1, Kopar Khairane, Navi Mumbai, Maharashtra 400709."],
      ["Do you come to the shop for setup?", "Yes. We set up the software, printers and labels at shops in Mumbai, Thane and Navi Mumbai, and support you on call and WhatsApp afterwards."],
      ["Which areas of Mumbai do you serve?", "All of Mumbai, from South Mumbai markets to the western and central suburbs, including Dadar, Bandra, Andheri, Borivali, Ghatkopar and Mulund."],
      ["Do you supply barcode printers in Mumbai?", "Yes. We supply barcode label printers, 80mm thermal receipt printers and barcode scanners with the software, and set them up for your labels and bills."],
      ["Which languages does your support team speak?", "English, Hindi and Marathi."],
      DEMO_FAQ,
    ],
    guides: ["/blog/e-way-bill-rules-2026", "/blog/best-billing-software-for-garment-shop", "/blog/how-to-start-garment-shop-in-india"],
  },
  {
    path: "/billing-software-thane",
    label: "Billing software in Thane",
    title: "Billing Software in Thane, Kalyan & Bhiwandi | Ezzy ERP",
    description: "Billing, barcode and GST software for shops, wholesalers and units in Thane, Kalyan, Dombivli, Bhiwandi and Ulhasnagar, with printers, setup and support from a team nearby.",
    eyebrow: "Thane · Kalyan · Bhiwandi",
    h1: "Billing software in Thane for shops, wholesalers and units",
    intro: [
      "Thane district both sells and makes: shops on Gokhale Road and around Thane station, wholesalers in Kalyan and Dombivli, jeans and garment units in Ulhasnagar, and powerlooms and warehouses in Bhiwandi.",
      "Ezzy ERP's office is in Kopar Khairane, on the Thane–Belapur Road, a short drive from Thane. You get billing software, barcode printers, setup and support from a team nearby, in Marathi, Hindi or English.",
    ],
    heroShot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with sales, purchase, stock value and receivables"],
    sections: [
      {
        h2: "A billing software team near Thane",
        points: [
          ["A demo at your shop or on a call", "See the billing screen with your own products and labels first."],
          ["Printers and scanners included", "Barcode label printers, 80mm receipt printers and scanners, supplied and set up by us."],
          ["Setup at your counter", "We set up the software and your label format at your shop or unit."],
          ["Training in Marathi, Hindi or English", "Your staff learn in the language they work in. Most learn billing in a day."],
          ["Support every day", "Call or WhatsApp us 24×7, including during the festival rush."],
        ],
      },
      {
        h2: "For shops in Thane, Kalyan and Dombivli",
        points: [
          ["Garment and saree shops", "Size and colour stock, design number tags and exchange billing."],
          ["Footwear showrooms", "Article and size-run stock with MRP billing."],
          ["Mobile and electronics stores", "IMEI and serial number tracking with EMI and mixed payments."],
          ["Supermarkets and kirana", "Fast barcode billing, low-stock alerts, customer credit and a daily cash report."],
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with barcode field, customer lookup and payment modes"],
      },
      {
        h2: "For Bhiwandi and Ulhasnagar: wholesalers, godowns and garment units",
        points: [
          ["Orders, challans and invoices", "Take a sale order, dispatch on a delivery challan and bill it later, without typing it again."],
          ["Godown stock", "Keep stock in more than one warehouse or godown, see it godown-wise and move it between them."],
          ["E-invoice and e-way bill", "Generate the e-invoice IRN and the e-way bill from the same sale bill."],
          ["Garment production", "Design cards with fabric per piece, fabric stock in metres, production lots, stages and job workers."],
          ["Party ledgers", "Customer and supplier balances with bill-by-bill settlement, and statements on WhatsApp."],
          ["Orders from the market", "Salesmen take orders and collect payments on the Android field sales app, even offline."],
        ],
        shot: ["shot-accounts.jpg", "Ezzy ERP accounts screen with customer ledger, outstanding and net receivable"],
      },
      {
        h2: "One login for the shop, the godown and the unit",
        paras: [
          "A business with a shop in Thane and a godown in Bhiwandi does not need two systems. Ezzy ERP runs each firm and branch on one login, with its own stock and books, and the owner sees the day's sale, stock and dues on the Android app.",
        ],
      },
    ],
    faqs: [
      ["Do you provide billing software in Thane?", "Yes. We supply Ezzy ERP billing, barcode and inventory software in Thane, with printers, setup and training from our office in Kopar Khairane, Navi Mumbai."],
      ["Which areas do you serve?", "Thane city, Kalyan, Dombivli, Bhiwandi, Ulhasnagar and the rest of Thane district, along with Navi Mumbai and Mumbai."],
      ["Do you train staff in Marathi?", "Yes. Training and support are in Marathi, Hindi or English."],
      ["Can it manage godown stock in Bhiwandi?", "Yes. Keep stock in more than one warehouse or godown, see stock godown-wise and move stock between them."],
      ["Do you have software for garment units?", "Yes. Ezzy ERP runs garment production with design cards, fabric stock in metres, production lots, stages and job workers, along with billing and GST."],
      ["Do you supply barcode printers in Thane?", "Yes. We supply barcode label printers, 80mm thermal receipt printers and scanners with the software, and set them up."],
      DEMO_FAQ,
    ],
    guides: ["/blog/e-way-bill-rules-2026", "/blog/e-invoice-limit-2026", "/blog/size-and-colour-stock-management-garment-shop"],
  },

  /* ---- Pages for shops outside India (audience: "global"). The owner confirmed Ezzy ERP works in any
   *      country with other currencies and taxes such as VAT. Nothing here promises a particular
   *      country's tax system: see RULES_FAQ. ---- */
  {
    path: "/retail-pos-software",
    label: "Retail POS software, worldwide",
    audience: "global",
    title: "Retail POS & Inventory Software for Shops Worldwide | Ezzy ERP",
    description: "Cloud POS, billing, barcode and inventory software for shops in any country: your currency, VAT or GST, size and colour stock and an Android app. Free online demo.",
    eyebrow: "Worldwide · Cloud POS · Inventory",
    h1: "Retail POS, billing and inventory software for shops worldwide",
    intro: [
      "A clothing store in Dubai, a footwear wholesaler in Nairobi and a mobile shop in Mumbai have the same problems at the counter: the queue, stock that does not match the shelf, and customers who still owe money.",
      "Ezzy ERP is cloud software built at the shop counter in India, where more than 2,000 shops, wholesalers and distributors use it. It works in any country, with bills in your own currency and taxes such as VAT.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with barcode field, customer lookup and payment modes on function keys"],
    sections: [
      {
        h2: "Everything a shop needs, in one login",
        points: [
          ["POS billing", "Scan, bill and print in seconds. Take cash, card or credit, or split them, and hold a bill while you serve the next customer."],
          ["Barcode labels", "Generate barcodes and print labels for your items, or scan the maker's barcode."],
          ["Inventory", "Live stock by product, size and colour, with low-stock, reorder and slow-stock reports."],
          ["Purchases", "Enter the supplier's bill once. Stock goes up, and every sale brings it down."],
          ["Customer accounts", "Balances, advances and credit notes for every customer, with statements sent on WhatsApp."],
          ["Accounts and reports", "Ledgers, trial balance, P&L and balance sheet kept as you bill, with profit by item."],
        ],
        shot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with total sales, invoices, stock value, receivables and cash collection"],
      },
      {
        h2: "Works in your country",
        points: [
          ["Your currency", "Bills, stock value and reports in your own currency."],
          ["Your tax", "Taxes such as VAT or GST on every bill line, with a tax register for your accountant."],
          ["In the cloud", "Runs in a browser from anywhere, with cloud backup. There is no server to buy or look after."],
          ["On your phone", "The Android app shows the owner today's sale, stock and dues, and bills from the phone."],
          ["Every branch", "Run more than one shop on one login, each with its own stock and books."],
          ["Staff rights", "Each staff member gets their own login and only the menus they need."],
        ],
      },
      {
        h2: "Made for these trades",
        points: [
          ["Clothing and apparel stores", "Size and colour matrix, style number barcode tags and exchange billing."],
          ["Shoe stores", "Stock by article and size run, with a label on every box."],
          ["Mobile and electronics stores", "IMEI and serial number tracking with mixed payments."],
          ["Supermarkets and general stores", "Fast barcode billing, low-stock alerts and a daily cash report."],
          ["Wholesalers and distributors", "Sale orders, delivery notes, customer-wise rates and ledgers, with a sales app for the field."],
        ],
        shot: ["shot-insights.jpg", "Ezzy ERP business insights with stock health, sales trends and reorder analysis"],
      },
      {
        h2: "Setup and support, wherever you are",
        paras: [
          "You do not need a local dealer. We set up your account, your items and your label format online, and train your staff on a call. Support is on call and WhatsApp, 24×7.",
          "Ezzy ERP is made by Adtech ERP Solutions in Navi Mumbai, India, an ISO certified software company. If your business needs something the standard software does not do, the same team builds custom software and mobile apps.",
        ],
      },
    ],
    faqs: [
      ["Can I use Ezzy ERP outside India?", "Yes. Ezzy ERP is cloud software and works in any country, with bills in your own currency and taxes such as VAT."],
      ["Which countries do you work with?", "Any country. Most of our customers are in India, and we set up shops in the UAE and the Gulf, Africa, the UK, the USA, Canada and Australia online."],
      ["Is the software in English?", "Yes. The software, bills and reports are in English, and training is in English or Hindi."],
      RULES_FAQ,
      HARDWARE_FAQ,
      ["Does it work on a phone?", "Yes. The Android app shows the owner today's sale, stock and dues, and you can bill from the phone."],
      GLOBAL_DEMO_FAQ,
    ],
  },
  {
    path: "/pos-software-uae",
    label: "POS software in UAE & the Gulf",
    audience: "global",
    title: "POS & VAT Billing Software for Shops in UAE & the Gulf | Ezzy ERP",
    description: "Cloud POS and VAT billing software for shops in Dubai, Sharjah, Abu Dhabi and the Gulf: barcode, size and colour stock, customer credit and an Android app. Free online demo.",
    eyebrow: "UAE · Dubai · The Gulf",
    h1: "POS and VAT billing software for shops in the UAE and the Gulf",
    intro: [
      "From the textile shops of Bur Dubai and Deira to garment and electronics stores in Sharjah and Abu Dhabi, a Gulf shop sells to walk-in customers, tourists and traders on the same day, with VAT on every bill.",
      "Ezzy ERP is cloud POS, billing and inventory software used by more than 2,000 shops and wholesalers in India. It runs the same way in the UAE and across the Gulf: bills in your currency with VAT, stock by size and colour, and the whole shop on the owner's phone.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with barcode field, customer lookup and payment modes on function keys"],
    sections: [
      {
        h2: "Built for a busy Gulf counter",
        points: [
          ["VAT on every bill", "Each bill line carries its tax, and a tax register is ready for your accountant at the end of the period."],
          ["Bills in your currency", "Dirhams, riyals or dinars: bills, stock value and reports are in the currency you trade in."],
          ["Fast barcode billing", "Scan the tag and print the bill in seconds. Hold a bill while a customer is still choosing."],
          ["Cash, card or credit", "Take any of them, or split a bill between them."],
          ["Retail and wholesale together", "Walk-in prices at the counter and customer-wise rates for traders, in one system."],
          ["Bills on WhatsApp", "Send the bill and the customer's statement to their phone from the billing screen."],
        ],
        shot: ["shot-purchase.jpg", "Ezzy ERP purchase entry with a size grid, barcode column and a Print Barcodes button"],
      },
      {
        h2: "For textile, garment, footwear and electronics shops",
        points: [
          ["Textile and garment shops", "Size and colour matrix, style number tags and stock by size, colour and brand."],
          ["Abaya, saree and boutique stores", "A barcode tag on every piece, with stock by design and colour."],
          ["Footwear stores", "Stock by article and size run, with a label on every box."],
          ["Mobile and electronics stores", "IMEI and serial number tracking with mixed payments."],
          ["Supermarkets and groceries", "Fast barcode billing, low-stock alerts and a daily cash report."],
        ],
      },
      {
        h2: "Branches across the emirates, on one login",
        paras: [
          "A business with a shop in Deira, another in Sharjah and a warehouse in between does not need three systems. Ezzy ERP runs every branch on one login, each with its own stock and books, and moves stock between them.",
          "The owner sees each branch's sale, stock and dues on the Android app, from the shop, from home or from abroad, and every staff member gets only the menus they need.",
        ],
      },
      {
        h2: "VAT in the Gulf",
        paras: [
          "The UAE charges VAT at 5%. Saudi Arabia, Oman and Bahrain have their own rates, and each country has its own rules for tax invoices. Ezzy ERP puts the tax on every bill line and keeps a register for your accountant.",
          "Tell us your country when you book the demo, and we confirm what is supported for it before you buy.",
        ],
      },
      {
        h2: "Setup and support online",
        paras: [
          "We set up your account, items and label format online and train your staff on a call, in English or Hindi. Support is on call and WhatsApp, 24×7, so help is there on a Friday evening rush as well.",
        ],
      },
    ],
    faqs: [
      ["Does Ezzy ERP work in the UAE?", "Yes. Ezzy ERP is cloud software and works in the UAE and across the Gulf, with bills in your currency and VAT on every bill."],
      ["Can it bill with VAT?", "Yes. Each bill line carries its tax, and a tax register is kept for your accountant."],
      ["Is the software in English?", "Yes. The software, bills and reports are in English, and training is in English or Hindi."],
      RULES_FAQ,
      ["Can I run shops in more than one emirate?", "Yes. Run every branch on one login, each with its own stock and books, and see them all on the Android app."],
      HARDWARE_FAQ,
      GLOBAL_DEMO_FAQ,
    ],
  },
  {
    path: "/pos-software-africa",
    label: "POS software in Africa",
    audience: "global",
    title: "Retail POS & Inventory Software for Shops in Africa | Ezzy ERP",
    description: "Cloud POS, billing and inventory software for retail and wholesale shops in Kenya, Tanzania, Uganda, Nigeria and Ghana: barcode, stock, customer credit and an Android app.",
    eyebrow: "Kenya · Tanzania · Nigeria · Ghana",
    h1: "Retail POS and inventory software for shops in Africa",
    intro: [
      "Trade in Africa runs on volume and trust. A textile wholesaler on Biashara Street in Nairobi, a trader in Kariakoo in Dar es Salaam, a shop in Kikuubo in Kampala or in Balogun Market in Lagos sells to hundreds of small retailers, and much of it on credit.",
      "Ezzy ERP keeps that business in one place: fast bills, stock you can trust, every customer's balance, and the day's figures on the owner's phone. It is cloud software from India, used there by more than 2,000 shops, wholesalers and distributors, and it works in your country and your currency.",
    ],
    heroShot: ["shot-accounts.jpg", "Ezzy ERP accounts screen with customer ledger, outstanding and net receivable"],
    sections: [
      {
        h2: "For traders who sell in bulk and on credit",
        points: [
          ["Every customer's balance", "A ledger for each customer with bills, payments, advances and credit notes."],
          ["Statements on WhatsApp", "Send the statement or a payment reminder to the customer's phone from the billing screen."],
          ["Customer-wise rates", "The rate you last gave each customer comes up when you bill them again."],
          ["Orders and delivery notes", "Take an order, send the goods on a delivery note and bill it later, without typing it again."],
          ["Orders from the market", "Salesmen take orders and collect payments on the Android app at the customer's shop."],
          ["Stock in every store", "Keep stock in more than one warehouse or store and move it between them."],
        ],
        shot: ["shot-customers.jpg", "Ezzy ERP customer list with balances and lifetime sale"],
      },
      {
        h2: "A fast counter for retail shops",
        points: [
          ["Barcode billing", "Scan the item and print the bill in seconds. Hold a bill and serve the next customer."],
          ["Cash, card or credit", "Take any of them, or split a bill between them."],
          ["Size and colour stock", "For clothing and shoe shops: one style in many sizes and colours, with a tag on each piece."],
          ["Staff rights", "Give counter staff the billing screen only, and keep profit and settings for the owner."],
        ],
      },
      {
        h2: "Your currency, your tax",
        paras: [
          "Bills, stock value and reports are in your own currency, whether that is shillings, naira or cedis, and each bill line carries taxes such as VAT, with a register for your accountant.",
          "Some countries require invoices to pass through a tax authority system or a fiscal device. Tell us your country when you book the demo, and we confirm what is supported before you buy.",
        ],
      },
      {
        h2: "When the network is slow",
        paras: [
          "Salesmen take orders and collections on the Android app even without a network, and it syncs when the signal returns. Your data is backed up in the cloud, so a broken or stolen computer does not take the books with it.",
        ],
      },
      {
        h2: "Setup and support online",
        paras: [
          "You do not need a local dealer. We set up your account, items and label format online and train your staff on a call. Support is on call and WhatsApp, 24×7.",
        ],
      },
    ],
    faqs: [
      ["Does Ezzy ERP work in Kenya, Tanzania, Uganda, Nigeria and Ghana?", "Yes. Ezzy ERP is cloud software and works in any country, with bills in your own currency and taxes such as VAT."],
      ["Can I track customers who buy on credit?", "Yes. Each customer has a ledger with bills, payments and advances, and you can send statements and reminders on WhatsApp."],
      ["Does it work without internet?", "The salesman's Android app takes orders and collections offline and syncs later. Billing at the shop runs in the cloud and needs a connection."],
      RULES_FAQ,
      HARDWARE_FAQ,
      ["Can I run more than one shop or warehouse?", "Yes. Run every branch on one login, each with its own stock and books, and keep stock in more than one warehouse."],
      GLOBAL_DEMO_FAQ,
    ],
  },
  {
    path: "/clothing-store-pos-software",
    label: "Clothing & shoe store POS software",
    audience: "global",
    title: "Clothing & Shoe Store POS Software with Size & Colour Stock",
    description: "POS and inventory software for clothing stores, boutiques and shoe stores: size and colour matrix, barcode tags, exchanges, customer history and an Android app. Free online demo.",
    eyebrow: "Apparel · Boutiques · Footwear",
    h1: "POS and inventory software for clothing and shoe stores",
    intro: [
      "A clothing store does not sell one product. It sells a style in five sizes and four colours, and the size that is missing is the sale that walks out. A general POS system treats each size as a separate item, and stock goes wrong within a season.",
      "Ezzy ERP was built around the size and colour matrix, at the counters of more than 2,000 shops and wholesalers in India. It works in any country, with bills in your own currency and taxes such as VAT.",
    ],
    heroShot: ["shot-purchase.jpg", "Ezzy ERP purchase entry with a size grid, barcode column, purchase and sale rate and a Print Barcodes button"],
    sections: [
      {
        h2: "Built for size and colour stock",
        points: [
          ["Size grid purchase entry", "Enter S, M, L, XL (or 28 to 40) in one row per style and colour, with cost and selling price."],
          ["Barcode tags from the purchase", "Print style number, size, colour and price tags straight from the purchase entry."],
          ["Stock by size, colour and brand", "See exactly which sizes are left in which colour, and what to reorder before the season."],
          ["One-scan checkout", "Scan the tag and the right size, colour and price come up. Hold a sale during rush hours."],
          ["Exchanges and returns", "An exchange puts the returned piece back into stock in the right size and settles the difference."],
          ["Customer history", "Your best, regular and lapsed customers by what they have spent, with offers sent on WhatsApp."],
        ],
        shot: ["shot-pos.jpg", "Ezzy ERP POS billing screen with size and colour columns"],
      },
      {
        h2: "For boutiques, apparel stores and shoe stores",
        points: [
          ["Boutiques", "A tag on every piece, stock by design and colour, and a note on the bill for alterations."],
          ["Apparel and kidswear stores", "Many styles, sizes and brands, with size-wise stock and sales."],
          ["Shoe stores", "Stock by article and size run, a label on every box, and size exchanges that keep stock right."],
          ["Wholesalers", "Sale orders, delivery notes, customer-wise rates and customer ledgers in the same system."],
        ],
      },
      {
        h2: "Reports a store owner actually uses",
        points: [
          ["Slow sellers", "Styles that have not sold in 60 or 90 days, to clear before the next season."],
          ["Size-wise sales", "Which sizes sell out, so you buy more of them."],
          ["Profit by item", "Net profit with cost of goods and margin, not just turnover."],
          ["The store on your phone", "Today's sale, stock and dues on the Android app."],
        ],
      },
      {
        h2: "Works in your country",
        paras: [
          "Bills, stock value and reports are in your own currency, and each line of a sale carries taxes such as VAT or GST. Ezzy ERP runs in the cloud, so there is no server to buy, and more than one store runs on the same login.",
          "We set up your account, sizes and label format online and train your staff on a call. Support is on call and WhatsApp, 24×7.",
        ],
      },
    ],
    faqs: [
      ["What is the best POS software for a clothing store?", "Choose a system that tracks stock by size and colour, prints barcode tags from the purchase entry, and handles exchanges. Ezzy ERP does all three, with customer accounts, reports and an Android app."],
      ["Does it have a size and colour matrix?", "Yes. Purchases are entered in a size grid, and stock is kept by product, size and colour, with size-wise stock and sales reports."],
      ["Can it print barcode tags for clothing?", "Yes. Print style number, size, colour and price tags straight from the purchase entry, on a barcode label printer."],
      ["Does it work for shoe stores?", "Yes. Shoes are kept by article, size and colour, with a label for every box and size exchanges at the counter."],
      ["Can I use it outside India?", "Yes. Ezzy ERP works in any country, with bills in your own currency and taxes such as VAT."],
      RULES_FAQ,
      GLOBAL_DEMO_FAQ,
    ],
    guides: ["/blog/size-and-colour-stock-management-garment-shop", "/blog/garment-barcode-label-size", "/blog/dead-stock-in-garment-shop"],
  },

  /* ---- Custom development services (same team, sold as projects, not as Ezzy ERP) ---- */
  {
    path: "/custom-software-development",
    label: "Custom software development",
    title: "Custom Software Development Company in Navi Mumbai | Ezzy ERP",
    description: "Custom cloud and Windows software for industrial units and corporate offices: ERP, production, dispatch, dealer and approval systems, by the Navi Mumbai team behind Ezzy ERP. Delivered worldwide.",
    eyebrow: "Industrial · Corporate · Custom software",
    h1: "Custom software development for industrial and corporate businesses",
    intro: [
      "Packaged software fits most shops. A factory, a distributor network or a corporate office often does not fit: the process is your own, and work ends up in spreadsheets, registers and WhatsApp groups around the software.",
      "Our development team builds software around that process. It is the same team that builds and supports Ezzy ERP, the billing, inventory and GST software used by more than 2,000 shops, wholesalers and distributors in India.",
    ],
    heroShot: ["shot-dashboard.jpg", "Ezzy ERP dashboard with sales, invoices, stock value and receivables, built and supported by our development team"],
    service: { name: "Custom software", icon: "ph-factory", summary: "Cloud and Windows software built around your own process, for factories, distributors and corporate offices." },
    sections: [
      {
        h2: "What we build",
        points: [
          ["Custom ERP and business software", "Sales, purchase, stock, accounts and reports shaped to how your company already works."],
          ["Production and job work", "Orders into production, material issued, stages, job workers and finished goods into stock."],
          ["Inventory and warehouse", "Stock by location, batch or serial number, with barcode labels, transfers and stock checks."],
          ["Dealer and distributor systems", "Dealer orders, schemes, dispatch and outstanding, with a login for each dealer or salesman."],
          ["Approvals and internal workflows", "Requests, approvals and records that today move on paper, email or chat."],
          ["Dashboards and MIS reports", "The figures the owner and managers ask for every week, ready without anyone compiling them."],
        ],
        shot: ["shot-insights.jpg", "Business insights screen from Ezzy ERP with sales trends, stock health and reorder analysis"],
      },
      {
        h2: "Why work with the team behind Ezzy ERP",
        points: [
          ["We run software in daily use", "Ezzy ERP bills at shop counters every day, so we build for speed, wrong entries, power cuts and busy days, not only for a demo."],
          ["Indian business rules are familiar", "GST invoices, e-invoice, e-way bill, party ledgers and Tally export are already part of what we build."],
          ["Cloud, Windows, Android and iPhone", "Cloud-based and Windows applications for the office, with Android and iPhone apps for owners and field teams."],
          ["Barcode and printing", "Barcode labels, scanners and thermal printers set up to work with the software."],
          ["Support after go-live", "The team that builds your software trains your staff and supports it, in English, Hindi or Marathi."],
          ["Based in Navi Mumbai, delivering worldwide", "You can meet us at Kopar Khairane, Navi Mumbai. We deliver projects for clients across India and in other countries."],
        ],
      },
      {
        h2: "How a project runs",
        points: [
          ["1. Understand the work", "We sit with the people who do the work, and note every step, form and report you use today."],
          ["2. Written scope and quotation", "You get the screens, reports and users we will deliver, in writing, before anything is built."],
          ["3. Build in stages", "You see working screens at each stage and correct them early, instead of waiting for one big handover."],
          ["4. Data, training and go-live", "We help move your masters and opening data, train your staff and stay with you through the first days."],
          ["5. Support and changes", "Your business will change. We keep the software running and add to it when it does."],
        ],
      },
      {
        h2: "Should you build custom software or buy ready software?",
        paras: [
          "Ready software is quicker and costs less when your work matches it. If you run a shop, a wholesale counter or a small manufacturing unit, look at Ezzy ERP first: billing, stock, GST, accounts and a mobile app are already there.",
          "Custom software is worth it when the process itself is your advantage, when several departments must work in one system, or when you have tried packaged software and still depend on spreadsheets. We will tell you plainly which one suits you.",
        ],
      },
    ],
    faqs: [
      ["What kind of companies do you build software for?", "Industrial units, manufacturers, distributors and corporate offices that need software shaped to their own process, as well as retail and wholesale businesses that have outgrown packaged software."],
      ["Do you build cloud software or Windows software?", "Both. We build cloud-based applications that run in a browser from anywhere, and Windows applications for the office, and we advise which suits your work."],
      ["Do you also build mobile apps and online stores?", "Yes. We build Android and iPhone apps for owners, staff and field teams, and e-commerce and B2B ordering websites. See the mobile app development and e-commerce development pages."],
      ["Can the software handle GST, e-invoice and e-way bill?", "Yes. GST invoices, e-invoice IRN, e-way bill, ledgers and Tally export are part of Ezzy ERP, and we build the same into custom systems where your work needs them."],
      ["Will you support the software after it is delivered?", "Yes. The team that builds it trains your staff and supports it after go-live, and takes up changes as your business grows."],
      ["Where are you located?", "Ezzy ERP (Adtech ERP Solutions) is at Shop No.2, Mittal Tower, Sector 1, Kopar Khairane, Navi Mumbai. We deliver projects across India and worldwide."],
      WORLDWIDE_FAQ,
      COST_FAQ,
      ENQUIRY_FAQ,
    ],
    trade: "Custom software",
  },
  {
    path: "/mobile-app-development",
    label: "Mobile app development",
    title: "Mobile App Development Company — Android & iPhone Apps | Ezzy ERP",
    description: "Android and iPhone (iOS) app development for business: owner dashboards, field sales and order apps that work offline, dealer and customer apps. By the Navi Mumbai team behind Ezzy ERP, delivered worldwide.",
    eyebrow: "Android · iPhone · Business apps",
    h1: "Mobile app development for your business",
    intro: [
      "A business app has one job: put the right figure or the right form in someone's hand when they are away from the desk. The owner wants today's sale. The salesman wants to book an order in the market, where the network drops.",
      "We build these apps for Android and iPhone. Our own Ezzy ERP Android app gives owners their sales, stock and dues, and lets salesmen take orders and collect outstanding offline, then sync later.",
    ],
    heroShot: ["shot-insights.jpg", "Sales trends and stock health in Ezzy ERP, the data our mobile apps show owners on the phone"],
    service: { name: "Mobile app", icon: "ph-device-mobile-camera", summary: "Android and iPhone apps for owners, staff and field teams, including apps that work offline." },
    sections: [
      {
        h2: "Apps we build",
        points: [
          ["Owner and management apps", "Sales, stock, collections and dues on the phone, in a read-only view that is safe to share."],
          ["Field sales and order apps", "Salesmen book orders, record visits and collect payments at the customer's shop."],
          ["Apps that work offline", "Entries are saved on the phone when there is no network and synced when it returns."],
          ["Dealer and customer apps", "Your dealers or customers place orders, see their ledger and track dispatch themselves."],
          ["Staff and operations apps", "Stock checks, barcode scanning, delivery updates and approvals from the shop floor or godown."],
          ["Apps for your existing software", "A mobile front end for the ERP or billing software your office already uses."],
        ],
        phones: [
          ["app-newsale.jpg", "Ezzy ERP Android app, new sale screen with barcode search and payment modes"],
          ["app-home.jpg", "Ezzy ERP Android app home with today's revenue, profit and outstanding"],
          ["app-reports.jpg", "Ezzy ERP Android app reports screen"],
        ],
      },
      {
        h2: "What makes a business app work",
        points: [
          ["Few taps for the daily job", "The screen a salesman uses fifty times a day is designed first, and kept short."],
          ["One source of data", "The app and the office software read the same data, so nobody types an order twice."],
          ["Logins and rights", "Each user sees only their own customers, orders and reports."],
          ["Android and iPhone", "Apps for both, so staff on Android phones and owners on iPhones work on one system."],
        ],
      },
      {
        h2: "From idea to an app on your team's phones",
        points: [
          ["1. Agree the screens", "We list who will use the app and what each person must be able to do in it."],
          ["2. Written scope and quotation", "You get the screens and features we will deliver, in writing."],
          ["3. Build and try", "Your team tries working builds and we correct them before the full rollout."],
          ["4. Roll out and support", "We help install the app, train your team and support it afterwards."],
        ],
      },
    ],
    faqs: [
      ["Which kind of mobile apps do you build?", "Android and iPhone apps for business use: owner dashboards, field sales and order apps, dealer and customer apps, and staff apps for stock, delivery and approvals."],
      ["Do you build for both Android and iPhone?", "Yes. We build apps for Android and for iPhone (iOS), and for both together when your users are on both."],
      ["Can the app work without internet?", "Yes. We build apps that save entries on the phone when there is no network and sync when it returns, the way the Ezzy ERP field sales app does."],
      ["Can the app connect to our existing software?", "Usually yes, if your software can share its data. We check this first and tell you what is possible before quoting."],
      ["Do you also build the office software behind the app?", "Yes. Most business apps need a cloud or Windows application for the office. See custom software development."],
      WORLDWIDE_FAQ,
      COST_FAQ,
      ENQUIRY_FAQ,
    ],
    trade: "Mobile app",
  },
  {
    path: "/ecommerce-development",
    label: "E-commerce development",
    title: "E-Commerce Website Development & B2B Ordering Portals | Ezzy ERP",
    description: "E-commerce solutions for retailers, wholesalers and manufacturers: online stores, B2B dealer ordering portals and catalogues, with orders and stock kept in step with your billing. Delivered worldwide.",
    eyebrow: "Online store · B2B ordering · Catalogue",
    h1: "E-commerce solutions for retailers, wholesalers and manufacturers",
    intro: [
      "Selling online is easy to start and hard to run. Orders arrive on a website, stock sits in the shop, and someone copies one into the other every evening. Stock goes wrong, and a customer orders a piece that was sold at the counter that morning.",
      "We build online stores and ordering portals as part of your business system, not beside it. Our team makes Ezzy ERP, so stock, billing and GST are where we start from.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP billing screen, where online and counter sales share the same stock"],
    service: { name: "E-commerce", icon: "ph-shopping-cart-simple", summary: "Online stores and B2B ordering portals that stay in step with your stock and billing." },
    sections: [
      {
        h2: "What we build",
        points: [
          ["Online store for your shop or brand", "Your products with photos, sizes, colours and prices, a cart and checkout, on your own domain."],
          ["B2B ordering portal", "Dealers and retailers log in, see their own rates and place orders at any hour."],
          ["Product catalogue", "A catalogue your customers browse and enquire from on WhatsApp, when you are not ready for full checkout."],
          ["Orders into billing and stock", "Online orders become invoices, and stock is reduced once, in one place."],
          ["Payments and delivery", "Online payment and cash on delivery options, with order status your customer can follow."],
          ["Offers and customer accounts", "Coupons, schemes, order history and repeat orders for returning customers."],
        ],
        shot: ["shot-purchase.jpg", "Size grid purchase entry in Ezzy ERP, the stock that an online store sells from"],
      },
      {
        h2: "Built for how Indian businesses sell",
        points: [
          ["Size and colour variants", "One design in many sizes and colours, with stock shown for each, as garment and footwear sellers need."],
          ["GST on every order", "Tax worked out per item, with invoices your accountant can use."],
          ["Retail and wholesale together", "Retail prices for the public and party-wise rates for dealers, on one system."],
          ["WhatsApp in the flow", "Order updates and invoices sent to the customer on WhatsApp."],
        ],
      },
      {
        h2: "From product list to first online order",
        points: [
          ["1. Decide what to sell online", "We agree the products, prices, delivery areas and who can order."],
          ["2. Written scope and quotation", "You get the pages and features we will deliver, in writing."],
          ["3. Build and load products", "We set up the store, help load your products and test orders end to end."],
          ["4. Launch and support", "We train your staff to handle orders and support the store after launch."],
        ],
      },
    ],
    faqs: [
      ["Do you build online stores for small shops as well as large businesses?", "Yes. A single shop can start with a catalogue or a simple store, and a wholesaler or manufacturer can run a full B2B ordering portal for dealers."],
      ["Can the online store share stock with my shop?", "That is how we prefer to build it: one stock for the counter and the website, so an item sold in the shop is not sold again online."],
      ["Can dealers get their own prices?", "Yes. In a B2B portal each dealer logs in and sees the rates and schemes that apply to them."],
      ["Do you also build a mobile app for the store?", "Yes. See mobile app development for Android and iPhone ordering apps for customers, dealers and salesmen."],
      WORLDWIDE_FAQ,
      COST_FAQ,
      ENQUIRY_FAQ,
    ],
    trade: "E-commerce",
  },
];

/** Custom development pages, and the Ezzy ERP pages without them. */
export const SERVICE_PAGES = SEO_PAGES.filter((page) => page.service);
export const PRODUCT_PAGES = SEO_PAGES.filter((page) => !page.service);
