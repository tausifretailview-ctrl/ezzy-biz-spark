-- Close the database rules that let anyone with the website's public key through.
--
-- The website's anon key is in every visitor's browser, so a rule "TO anon USING (true)"
-- means anyone on the internet. Lovable's security scan flagged 6 tables and 4 storage rules.

------------------------------------------------------------------------------------------
-- 1. Work Report (staff daily reports)
--    Anyone could read every login and password hash, add themselves as an admin, and
--    read, change or delete every report. The app now reaches these tables only through
--    the work-report-auth edge function (service role), which checks a signed session.
--    RLS stays on with no policies, so the public key gets nothing.
------------------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow anon select for login" ON public.work_report_users;
DROP POLICY IF EXISTS "Allow anon insert for registration" ON public.work_report_users;

DROP POLICY IF EXISTS "Allow anon select work_reports" ON public.work_reports;
DROP POLICY IF EXISTS "Allow anon insert work_reports" ON public.work_reports;
DROP POLICY IF EXISTS "Allow anon update work_reports" ON public.work_reports;
DROP POLICY IF EXISTS "Allow anon delete work_reports" ON public.work_reports;

DROP POLICY IF EXISTS "Allow anon select wr_masters" ON public.wr_masters;
DROP POLICY IF EXISTS "Allow anon insert wr_masters" ON public.wr_masters;
DROP POLICY IF EXISTS "Allow anon update wr_masters" ON public.wr_masters;
DROP POLICY IF EXISTS "Allow anon delete wr_masters" ON public.wr_masters;

ALTER TABLE public.work_report_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wr_masters ENABLE ROW LEVEL SECURITY;

------------------------------------------------------------------------------------------
-- 2. Cotton Plus (test pages, removed from the site on 2026-10-27)
--    Its customers' mobiles, birthdays and anniversaries were readable by any signed-in
--    account, and its admin password is in this repository's history. Nothing uses these
--    tables or the bucket any more, so all access is closed. The rows and files are kept.
------------------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can insert customers" ON public.cotton_plus_customers;
DROP POLICY IF EXISTS "Authenticated can read customers" ON public.cotton_plus_customers;
DROP POLICY IF EXISTS "Authenticated can update customers" ON public.cotton_plus_customers;
DROP POLICY IF EXISTS "Authenticated can delete customers" ON public.cotton_plus_customers;

DROP POLICY IF EXISTS "Anyone can read settings" ON public.cotton_plus_settings;
DROP POLICY IF EXISTS "Authenticated can update settings" ON public.cotton_plus_settings;

ALTER TABLE public.cotton_plus_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cotton_plus_settings ENABLE ROW LEVEL SECURITY;

-- Storage: any signed-in account could replace or delete any file in the bucket.
DROP POLICY IF EXISTS "Public can read cotton-plus-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload cotton-plus-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update cotton-plus-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete cotton-plus-assets" ON storage.objects;

UPDATE storage.buckets SET public = false WHERE id = 'cotton-plus-assets';

------------------------------------------------------------------------------------------
-- 3. Demo bookings and project enquiries (demo_requests)
--    The public forms must be able to add a lead, and the key can still not read any.
--    The rule now accepts only a lead with a mobile number and sensible lengths, instead of
--    anything at all, so the table cannot be filled with junk or huge rows.
------------------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow anon insert demo_requests" ON public.demo_requests;

CREATE POLICY "Website forms add a lead" ON public.demo_requests
    FOR INSERT TO anon
    WITH CHECK (
        phone IS NOT NULL AND char_length(phone) BETWEEN 10 AND 15
        AND coalesce(char_length(name), 0) <= 120
        AND coalesce(char_length(shop), 0) <= 160
        AND coalesce(char_length(city), 0) <= 80
        AND coalesce(char_length(trade), 0) <= 80
        AND coalesce(char_length(note), 0) <= 3000
        AND coalesce(char_length(utm_source), 0) <= 120
        AND coalesce(char_length(utm_medium), 0) <= 120
        AND coalesce(char_length(utm_campaign), 0) <= 120
        AND coalesce(char_length(referrer), 0) <= 300
        AND coalesce(char_length(landing_page), 0) <= 300
    );
