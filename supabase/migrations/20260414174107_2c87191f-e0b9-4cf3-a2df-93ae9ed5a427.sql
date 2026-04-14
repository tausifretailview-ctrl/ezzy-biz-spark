
-- Create work_report_users table
CREATE TABLE public.work_report_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text UNIQUE NOT NULL,
    name text NOT NULL,
    password_hash text NOT NULL,
    role text NOT NULL DEFAULT 'employee',
    department text,
    created_at timestamptz DEFAULT now()
);

-- Create work_reports table
CREATE TABLE public.work_reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    emp_id text NOT NULL,
    emp_name text NOT NULL,
    report_date date NOT NULL DEFAULT CURRENT_DATE,
    task text NOT NULL,
    status text NOT NULL,
    priority text DEFAULT 'Medium',
    progress integer DEFAULT 0,
    time_spent numeric DEFAULT 0,
    assigned_senior text,
    client_name text,
    remarks text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.work_report_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_reports ENABLE ROW LEVEL SECURITY;

-- RLS policies for work_report_users
CREATE POLICY "Allow anon select for login" ON public.work_report_users
    FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert for registration" ON public.work_report_users
    FOR INSERT TO anon WITH CHECK (true);

-- RLS policies for work_reports
CREATE POLICY "Allow anon select work_reports" ON public.work_reports
    FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert work_reports" ON public.work_reports
    FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update work_reports" ON public.work_reports
    FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow anon delete work_reports" ON public.work_reports
    FOR DELETE TO anon USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_work_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_work_reports_updated_at
    BEFORE UPDATE ON public.work_reports
    FOR EACH ROW EXECUTE FUNCTION public.update_work_reports_updated_at();

-- Indexes
CREATE INDEX idx_work_reports_emp_id ON public.work_reports(emp_id);
CREATE INDEX idx_work_reports_report_date ON public.work_reports(report_date);
CREATE INDEX idx_work_reports_status ON public.work_reports(status);
