-- Customers table
CREATE TABLE public.cotton_plus_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mobile text NOT NULL,
  birthday date,
  anniversary date,
  store_location text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT cotton_plus_mobile_unique UNIQUE (mobile)
);

CREATE INDEX idx_cotton_plus_created ON public.cotton_plus_customers(created_at DESC);
CREATE INDEX idx_cotton_plus_birthday ON public.cotton_plus_customers(birthday);
CREATE INDEX idx_cotton_plus_anniversary ON public.cotton_plus_customers(anniversary);

ALTER TABLE public.cotton_plus_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert customers"
  ON public.cotton_plus_customers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can read customers"
  ON public.cotton_plus_customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update customers"
  ON public.cotton_plus_customers FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete customers"
  ON public.cotton_plus_customers FOR DELETE
  TO authenticated
  USING (true);

-- Settings table (single row)
CREATE TABLE public.cotton_plus_settings (
  id int PRIMARY KEY DEFAULT 1,
  logo_url text,
  store_name text DEFAULT 'Cotton Plus',
  store_tagline text DEFAULT 'Thank you for shopping with us!',
  store_location text DEFAULT '',
  google_review_url text DEFAULT '',
  instagram_url text DEFAULT '',
  whatsapp_number text DEFAULT '',
  facebook_url text DEFAULT '',
  primary_color text DEFAULT '#0b1120',
  accent_color text DEFAULT '#22d3ee',
  thank_you_message text DEFAULT 'Thank you for your details! Please help us grow by leaving a review.',
  form_heading text DEFAULT 'Share Your Details',
  form_subheading text DEFAULT 'Get special offers on your birthday & anniversary',
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO public.cotton_plus_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.cotton_plus_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings"
  ON public.cotton_plus_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can update settings"
  ON public.cotton_plus_settings FOR UPDATE
  TO authenticated
  USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('cotton-plus-assets', 'cotton-plus-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read cotton-plus-assets"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'cotton-plus-assets');

CREATE POLICY "Authenticated can upload cotton-plus-assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'cotton-plus-assets');

CREATE POLICY "Authenticated can update cotton-plus-assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'cotton-plus-assets');

CREATE POLICY "Authenticated can delete cotton-plus-assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'cotton-plus-assets');