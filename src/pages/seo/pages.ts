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
  /** Blog posts (paths from ../blog/posts.ts) listed under "Guides for shop owners". */
  guides?: string[];
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
      ["Can Ezzy ERP print garment barcode tags?", "Yes. Print design number, size, colour and MRP labels straight from the purchase bill on 38×25 or 40×25 2-up labels, using a TSC or similar barcode printer that we can supply."],
      ["Does it work for garment wholesale?", "Yes. Wholesalers use sale orders, delivery challans, party-wise rates, credit notes and customer ledgers, with statements sent on WhatsApp."],
      ["Can I see stock size-wise?", "Yes. Stock is tracked by product, size and colour, and the reports show size-wise stock, top sellers and dead stock."],
      ["Does it apply 5% and 18% GST on clothes correctly?", "Yes. Each bill line carries its own GST rate, so pieces up to ₹2,500 and pieces above ₹2,500 on the same bill are taxed at the right rate."],
      ["Can a saree shop or boutique use it?", "Yes. Saree and dress material shops, boutiques, kids wear stores and men's and ladies' readymade shops all use the same size, colour and design number features."],
      ["Does it work on a phone?", "Yes. The Android app shows the owner today's sale, stock and dues, and you can bill from the phone."],
      DEMO_FAQ,
    ],
    trade: "Garments & textiles",
    guides: ["/blog/gst-on-clothes-above-2500", "/blog/garment-barcode-label-size", "/blog/size-and-colour-stock-management-garment-shop"],
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
    ],
    faqs: [
      ["What is the best billing software for a footwear shop?", "Pick software that tracks stock by article and size, bills at MRP, and prints barcode labels for every box. Ezzy ERP does this, along with GST, schemes, customer ledgers and an Android app."],
      ["Can I track footwear stock size-wise?", "Yes. Purchases are entered in a size grid and stock is kept by article, size and colour, with reorder and dead stock reports."],
      ["Does it support MRP billing with GST?", "Yes. The POS has an MRP pricing mode, and every bill line carries GST for your GST register and returns."],
      ["Can I run more than one footwear showroom?", "Yes. Switch between firms and branches on one login, each with its own books and staff rights."],
      ["How do I handle size exchanges?", "Do the exchange on the billing screen. The returned pair goes back into stock in its size and the new pair comes out, so stock stays correct."],
      ["Does it work for footwear wholesale?", "Yes. Wholesalers use sale orders, delivery challans, party-wise rates and customer ledgers, with statements and payment reminders on WhatsApp."],
      DEMO_FAQ,
    ],
    trade: "Footwear",
    guides: ["/blog/garment-barcode-label-size", "/blog/gst-on-clothes-above-2500"],
  },
  {
    path: "/wholesale-billing-software",
    label: "Wholesale billing software",
    title: "Wholesale Billing Software — Orders, Challans, Party Rates & GST | Ezzy ERP",
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
    title: "Retail Inventory Management Software — Size, Barcode & Reorder | Ezzy ERP",
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
    title: "Billing Software for Manufacturers — Quotation, E-Invoice, E-Way Bill & Stock | Ezzy ERP",
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
    title: "E-Invoice Software for GST — Generate IRN & QR from Your Bill | Ezzy ERP",
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
    title: "Garment Manufacturing Software — Fabric, Lots, Job Work & Billing | Ezzy ERP",
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
