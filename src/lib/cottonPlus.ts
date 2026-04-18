import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  mobile: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),
  birthday: z.string().optional().nullable(),
  anniversary: z.string().optional().nullable(),
  store_location: z.string().optional().nullable(),
});

export type CustomerInput = z.infer<typeof customerSchema>;

export const settingsSchema = z.object({
  logo_url: z.string().nullable().optional(),
  store_name: z.string().max(100),
  store_tagline: z.string().max(200),
  store_location: z.string().max(200),
  google_review_url: z.string().max(500),
  instagram_url: z.string().max(500),
  whatsapp_number: z.string().max(20),
  facebook_url: z.string().max(500),
  primary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be hex color"),
  accent_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be hex color"),
  thank_you_message: z.string().max(500),
  form_heading: z.string().max(100),
  form_subheading: z.string().max(200),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

export async function uploadLogo(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "png";
  const path = `logo-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from("cotton-plus-assets")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from("cotton-plus-assets").getPublicUrl(path);
  return data.publicUrl;
}

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
