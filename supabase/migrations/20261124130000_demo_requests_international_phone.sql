-- Leads from outside India: accept mobile numbers written with a country code.
--
-- The website is now aimed at shops worldwide. "+971 50 123 4567" is 16 characters and
-- "+44 (0)20 7946 0958" is 19, and the rule from 20261124120000 allowed only 10 to 15.
-- Everything else about the rule is unchanged: the public key can add a lead, and can read none.
DROP POLICY IF EXISTS "Allow anon insert demo_requests" ON public.demo_requests;
DROP POLICY IF EXISTS "Website forms add a lead" ON public.demo_requests;

CREATE POLICY "Website forms add a lead" ON public.demo_requests
    FOR INSERT TO anon
    WITH CHECK (
        phone IS NOT NULL AND char_length(phone) BETWEEN 8 AND 20
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
