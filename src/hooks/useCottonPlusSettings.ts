import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { SettingsInput } from "@/lib/cottonPlus";

export type CottonPlusSettings = {
  id: number;
  logo_url: string | null;
  store_name: string;
  store_tagline: string;
  store_location: string;
  google_review_url: string;
  instagram_url: string;
  whatsapp_number: string;
  facebook_url: string;
  primary_color: string;
  accent_color: string;
  thank_you_message: string;
  form_heading: string;
  form_subheading: string;
  updated_at: string | null;
};

export function useCottonPlusSettings() {
  return useQuery({
    queryKey: ["cotton-plus-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cotton_plus_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data as CottonPlusSettings | null;
    },
    staleTime: 60_000,
  });
}

export function useUpdateCottonPlusSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: Partial<SettingsInput> & { logo_url?: string | null }) => {
      const { data, error } = await supabase
        .from("cotton_plus_settings")
        .update({ ...values, updated_at: new Date().toISOString() })
        .eq("id", 1)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cotton-plus-settings"] }),
  });
}
