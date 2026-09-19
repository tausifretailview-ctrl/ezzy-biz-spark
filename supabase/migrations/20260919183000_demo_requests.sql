-- Lead capture table for the Ezzy ERP marketing landing page (/home) demo form.
CREATE TABLE public.demo_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text,
    phone text,
    shop text,
    city text,
    trade text,
    note text,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS. The public landing page submits anonymously, so allow anon
-- inserts only (no read access) — mirrors the existing anon-insert pattern.
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert demo_requests" ON public.demo_requests
    FOR INSERT TO anon WITH CHECK (true);

CREATE INDEX idx_demo_requests_created_at ON public.demo_requests(created_at);
