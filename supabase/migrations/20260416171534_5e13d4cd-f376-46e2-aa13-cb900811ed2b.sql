-- New masters table
CREATE TABLE public.wr_masters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  master_type text NOT NULL,
  label text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_by text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_wr_masters_type ON public.wr_masters(master_type, is_active, sort_order);

ALTER TABLE public.wr_masters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon select wr_masters" ON public.wr_masters FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert wr_masters" ON public.wr_masters FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update wr_masters" ON public.wr_masters FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow anon delete wr_masters" ON public.wr_masters FOR DELETE TO anon USING (true);

-- Add new columns to work_reports
ALTER TABLE public.work_reports
  ADD COLUMN customer_name text,
  ADD COLUMN problem_type text,
  ADD COLUMN call_type text,
  ADD COLUMN time_consumed numeric DEFAULT 0,
  ADD COLUMN work_status text;

-- Seed default masters
INSERT INTO public.wr_masters (master_type, label, sort_order) VALUES
  ('call_type', 'Online', 1),
  ('call_type', 'Telephonic', 2),
  ('call_type', 'WhatsApp Call', 3),
  ('call_type', 'Site Visit', 4),
  ('status', 'Finish', 1),
  ('status', 'Pending', 2),
  ('status', 'Forward to Senior', 3),
  ('problem_type', 'Software Issue', 1),
  ('problem_type', 'Hardware Issue', 2),
  ('problem_type', 'Training Required', 3),
  ('problem_type', 'New Feature Request', 4),
  ('problem_type', 'Bug / Error', 5),
  ('problem_type', 'Data Entry Issue', 6),
  ('problem_type', 'Billing Problem', 7),
  ('problem_type', 'Network Issue', 8);