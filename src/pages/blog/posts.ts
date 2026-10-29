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
};

export const BLOG_POSTS: BlogPost[] = [
  {
    path: "/blog/gst-on-clothes-above-2500",
    label: "GST on clothes: 5% up to ₹2,500, 18% above",
    title: "GST on Clothes in 2026: 5% up to ₹2,500, 18% Above — How to Bill It | Ezzy ERP",
    description: "GST on readymade garments is 5% up to ₹2,500 per piece and 18% above it. How the slab is decided, what discounts and MRP-inclusive prices do to it, and how to bill it right.",
    h1: "GST on clothes in 2026: 5% up to ₹2,500, 18% above, and how to bill it right",
    published: "2026-10-29",
    updated: "2026-10-29",
    readMinutes: 6,
    intro: [
      "Since 22 September 2025, readymade garments in India carry GST of 5% when the sale value of a piece is ₹2,500 or less, and 18% when it is more. Before that the line was ₹1,000, with 5% below it and 12% above.",
      "The rule is simple to state but easy to get wrong at the counter, because the slab depends on the value of each piece, not the bill, and discounts can move a piece from one slab to the other. This guide explains how it works and how to set up your billing so every line gets the right rate.",
    ],
    heroShot: ["shot-pos.jpg", "Ezzy ERP POS billing screen where each bill line carries its own GST rate"],
    body: [
      {
        h2: "The GST rates on clothing at a glance",
        table: {
          head: ["What you sell", "Value per piece", "GST"],
          rows: [
            ["Readymade garments and made-up textile articles", "Up to ₹2,500", "5%"],
            ["Readymade garments and made-up textile articles", "Above ₹2,500", "18%"],
            ["Footwear", "Up to ₹2,500 per pair", "5%"],
            ["Footwear", "Above ₹2,500 per pair", "18%"],
          ],
        },
        note: "Rates as notified from 22 September 2025. Fabric, yarn and some specific items have their own rates, so confirm the HSN code and rate of each product with your CA.",
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
          "Discounts given later, such as a year-end scheme from the brand, follow different rules. Ask your CA.",
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
