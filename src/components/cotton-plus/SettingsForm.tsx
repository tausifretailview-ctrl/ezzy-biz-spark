import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ExternalLink, Upload, Trash2 } from "lucide-react";
import {
  useCottonPlusSettings,
  useUpdateCottonPlusSettings,
  type CottonPlusSettings,
} from "@/hooks/useCottonPlusSettings";
import { uploadLogo } from "@/lib/cottonPlus";
import { CottonPlusLogo } from "./CottonPlusLogo";

export function SettingsForm() {
  const { data, isLoading } = useCottonPlusSettings();
  const update = useUpdateCottonPlusSettings();
  const [form, setForm] = useState<CottonPlusSettings | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (isLoading || !form) return <div className="p-8 text-center">Loading settings...</div>;

  const set = <K extends keyof CottonPlusSettings>(k: K, v: CottonPlusSettings[K]) =>
    setForm({ ...form, [k]: v });

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be under 2MB");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadLogo(file);
      set("logo_url", url);
      toast.success("Logo uploaded — click Save to apply");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  function handleSave() {
    if (!form) return;
    const { id, updated_at, ...rest } = form;
    update.mutate(rest, {
      onSuccess: () => toast.success("Settings saved ✓"),
      onError: (e) => toast.error((e as Error).message),
    });
  }

  const testLink = (url: string) => {
    if (!url) return toast.error("URL is empty");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Branding */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Branding</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Logo</Label>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-24 h-24 border rounded-xl flex items-center justify-center bg-slate-50 overflow-hidden">
                {form.logo_url ? (
                  <img src={form.logo_url} alt="logo" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-xs text-muted-foreground">No logo</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" hidden onChange={handleLogoUpload} disabled={uploading} />
                  <Button type="button" variant="outline" disabled={uploading} asChild>
                    <span><Upload className="h-4 w-4 mr-2" />{uploading ? "Uploading..." : "Upload Logo"}</span>
                  </Button>
                </label>
                {form.logo_url && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => set("logo_url", null)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Field label="Store Name" value={form.store_name} onChange={(v) => set("store_name", v)} />
          <Field label="Store Tagline" value={form.store_tagline} onChange={(v) => set("store_tagline", v)} />
          <Field label="Store Location" value={form.store_location} onChange={(v) => set("store_location", v)} />
          <Field label="Form Heading" value={form.form_heading} onChange={(v) => set("form_heading", v)} />
          <Field label="Form Subheading" value={form.form_subheading} onChange={(v) => set("form_subheading", v)} />
          <div>
            <Label>Thank You Message</Label>
            <Textarea
              value={form.thank_you_message}
              onChange={(e) => set("thank_you_message", e.target.value)}
              rows={3}
              className="rounded-xl mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Colors</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ColorField label="Primary" value={form.primary_color} onChange={(v) => set("primary_color", v)} />
            <ColorField label="Accent" value={form.accent_color} onChange={(v) => set("accent_color", v)} />
          </div>
          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${form.primary_color}, ${form.accent_color}33)`,
            }}
          >
            <div className="bg-white rounded-xl p-4 max-w-xs mx-auto">
              <CottonPlusLogo logoUrl={form.logo_url} storeName={form.store_name} />
              <Button
                className="w-full mt-3 h-11 rounded-xl text-white"
                style={{ backgroundColor: form.accent_color, color: form.primary_color }}
              >
                Preview Button
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Social & Review Links</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <LinkField
            label="Google Review URL"
            help="From Google Maps → your business → Share → Short URL"
            value={form.google_review_url}
            onChange={(v) => set("google_review_url", v)}
            onTest={() => testLink(form.google_review_url)}
          />
          <LinkField
            label="Instagram URL"
            value={form.instagram_url}
            onChange={(v) => set("instagram_url", v)}
            onTest={() => testLink(form.instagram_url)}
          />
          <LinkField
            label="WhatsApp Number (10-digit)"
            value={form.whatsapp_number}
            onChange={(v) => set("whatsapp_number", v.replace(/\D/g, "").slice(0, 10))}
            onTest={() => testLink(`https://wa.me/91${form.whatsapp_number}`)}
          />
          <LinkField
            label="Facebook URL"
            value={form.facebook_url}
            onChange={(v) => set("facebook_url", v)}
            onTest={() => testLink(form.facebook_url)}
          />
        </CardContent>
      </Card>

      <div className="sticky bottom-4">
        <Button
          className="w-full h-12 rounded-xl text-base"
          onClick={handleSave}
          disabled={update.isPending}
        >
          {update.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl mt-1" />
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 mt-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-16 rounded-xl border cursor-pointer"
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl font-mono" />
      </div>
    </div>
  );
}

function LinkField({
  label, value, onChange, onTest, help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onTest: () => void;
  help?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 mt-1">
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl" />
        <Button type="button" variant="outline" onClick={onTest} className="rounded-xl shrink-0">
          <ExternalLink className="h-4 w-4 mr-1" /> Test
        </Button>
      </div>
      {help && <p className="text-xs text-muted-foreground mt-1">{help}</p>}
    </div>
  );
}
