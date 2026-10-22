// Stand-in for the Supabase client while prerendering pages at build time.
// Pages only call it from event handlers, which never run during prerender.
export const supabase = {} as typeof import("@/integrations/supabase/client").supabase;
