
# Cotton Plus Customer Capture + Admin Panel

A new isolated module at `/cotton-plus` for in-store customer data capture, with a password-protected admin panel for managing customers, settings, and QR code. Zero changes to existing pages, routes, or styles.

## Database (new migration)

**Tables:**
- `cotton_plus_customers` — name, mobile (unique), birthday, anniversary, store_location, created_at + indexes
- `cotton_plus_settings` — single-row (id=1) settings: logo_url, store_name, tagline, location, google/instagram/whatsapp/facebook URLs, colors, headings, thank_you_message
- Storage bucket `cotton-plus-assets` (public) for logo uploads

**RLS:**
- Customers: anon INSERT only; authenticated full CRUD
- Settings: anon SELECT (form needs it); authenticated UPDATE
- Bucket: public read; authenticated write

## Authentication

Use Supabase Auth (email/password) — separate from existing `/work-report` custom auth. Admin user created manually in Cloud → Users. No signup UI.

## Routes (added to `App.tsx`, no existing routes touched)

- `/cotton-plus` → public form
- `/cotton-plus/thank-you` → success + review/social CTAs
- `/cotton-plus/admin` → login → tabbed dashboard

## Files to create

```
src/pages/cotton-plus/
  CottonPlusForm.tsx          # Public mobile-first form
  CottonPlusThankYou.tsx      # Success + Google/Instagram buttons
  CottonPlusAdmin.tsx         # Auth gate + tabs container
src/components/cotton-plus/
  CottonPlusLogo.tsx          # logo_url or text fallback
  ProtectedAdmin.tsx          # supabase.auth gate + login card
  CustomerTable.tsx           # search, month filters, pagination, edit/delete, export, copy mobiles
  SettingsForm.tsx            # branding, colors, links, logo upload
  QrCodeTab.tsx               # qrcode.react + download PNG
src/hooks/
  useCottonPlusSettings.ts    # react-query fetch single settings row
src/lib/
  cottonPlus.ts               # supabase helpers + zod validators
```

## Key behaviors

- **Form:** zod validation (10-digit mobile, name min 2). Insert via anon client; on unique-violation (mobile exists) → friendly toast + still navigate to thank-you. Pass name via router state.
- **Thank-you:** conditionally render Google / Instagram / WhatsApp / Facebook buttons only if URL set. Big tap targets (h-14).
- **Admin Customers tab:** summary cards (total, this month, birthdays this month, anniversaries this month), search (name OR mobile via `.or()`), month filters for birthday/anniversary, date range, 25/page pagination, edit dialog, delete confirm, Excel export of filtered rows (xlsx), copy comma-separated mobiles to clipboard.
- **Admin Settings tab:** branding (logo upload to bucket → save public URL), text fields, color pickers with live preview card, social/review URLs each with "Test link" button, single Save button updating row id=1.
- **QR tab:** 300×300 QR encoding `https://ezzyerp.in/cotton-plus`, download as PNG via canvas.

## Libraries to install
`xlsx`, `qrcode.react` (others already present)

## Design isolation
All styling via Tailwind utilities scoped within Cotton Plus components. No edits to `index.css`, `tailwind.config.ts`, or any global file. Colors driven by settings at runtime via inline styles for primary/accent.

## Setup notes (in code comments)
README block in `CottonPlusAdmin.tsx` listing: create admin user in Cloud → Users, log in, configure settings, download QR, print poster.

## Deliverables order
1. Migration: tables + RLS + storage bucket + policies + default settings row
2. Install xlsx + qrcode.react
3. Helpers (`lib/cottonPlus.ts`, `useCottonPlusSettings.ts`)
4. Public pages (Form + ThankYou)
5. Admin (ProtectedAdmin + CustomerTable + SettingsForm + QrCodeTab + CottonPlusAdmin)
6. Add 3 routes to `App.tsx`
