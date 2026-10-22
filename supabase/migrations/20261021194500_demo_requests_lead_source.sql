-- Lead source for demo requests from the marketing site: UTM tags from
-- social/ads links, the external referrer and the landing URL.
ALTER TABLE public.demo_requests
    ADD COLUMN IF NOT EXISTS utm_source text,
    ADD COLUMN IF NOT EXISTS utm_medium text,
    ADD COLUMN IF NOT EXISTS utm_campaign text,
    ADD COLUMN IF NOT EXISTS referrer text,
    ADD COLUMN IF NOT EXISTS landing_page text;
