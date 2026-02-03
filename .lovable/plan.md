
# Remove Lovable Branding from Website

## What You're Seeing
The browser shows "Lovable App" with a Lovable logo icon because the website's title and favicon haven't been updated to Ezzy ERP branding yet.

## What I'll Change

### 1. Update Website Title & Meta Tags
Change all instances of "Lovable App" to "Ezzy ERP - Smart Billing & Inventory Software" in `index.html`:
- Page title (shown in browser tab)
- Open Graph title (for Facebook/social sharing)
- Twitter title (for Twitter sharing)
- Author name

### 2. Replace Favicon
- Copy the Ezzy ERP logo to the `public` folder as `favicon.png`
- Update the HTML to use the new Ezzy ERP favicon instead of the default Lovable one

## Technical Details

**File to modify:** `index.html`

Changes:
- Line 7: `<title>Lovable App</title>` to `<title>Ezzy ERP - Smart Billing & Inventory Software</title>`
- Line 9: Author from "Lovable" to "Ezzy ERP"
- Line 18: Twitter site from "@Lovable" to "@EzzyERP"
- Line 20-21: og:title and twitter:title to "Ezzy ERP - Smart Billing & Inventory Software"
- Add favicon link to use Ezzy ERP logo

**New file:** Copy `src/assets/ezzylogo.png` to `public/favicon.png` and add a link tag in the HTML head.
