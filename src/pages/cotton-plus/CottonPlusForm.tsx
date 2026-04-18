import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { customerSchema } from "@/lib/cottonPlus";
import { useCottonPlusSettings } from "@/hooks/useCottonPlusSettings";
import { CottonPlusLogo } from "@/components/cotton-plus/CottonPlusLogo";

export default function CottonPlusForm() {
  const navigate = useNavigate();
  const { data: settings, isLoading } = useCottonPlusSettings();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState<Date | undefined>();
  const [anniversary, setAnniversary] = useState<Date | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const primary = settings?.primary_color || "#0b1120";
  const accent = settings?.accent_color || "#22d3ee";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed = customerSchema.safeParse({
      name,
      mobile,
      birthday: birthday ? format(birthday, "yyyy-MM-dd") : null,
      anniversary: anniversary ? format(anniversary, "yyyy-MM-dd") : null,
      store_location: settings?.store_location || null,
    });

    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        fe[err.path[0] as string] = err.message;
      });
      setErrors(fe);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("cotton_plus_customers").insert(parsed.data);
    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        toast.success("Welcome back! Your details are already with us 🙏");
        navigate("/cotton-plus/thank-you", { state: { name } });
        return;
      }
      toast.error("Something went wrong. Please try again.");
      return;
    }

    navigate("/cotton-plus/thank-you", { state: { name } });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${primary} 0%, ${primary} 60%, ${accent}22 100%)`,
        fontFamily: "DM Sans, system-ui, sans-serif",
      }}
    >
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        {isLoading ? (
          <div className="h-20 animate-pulse bg-gray-100 rounded-xl mb-4" />
        ) : (
          <CottonPlusLogo logoUrl={settings?.logo_url} storeName={settings?.store_name} />
        )}

        <div className="text-center mt-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {settings?.form_heading || "Share Your Details"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {settings?.form_subheading || "Get special offers on your birthday & anniversary"}
          </p>
          {settings?.store_location && (
            <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
              <MapPin className="h-3 w-3" /> {settings.store_location}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="h-12 rounded-xl mt-1 focus:ring-2"
              style={{ borderColor: errors.name ? "#ef4444" : undefined }}
              maxLength={100}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="mobile" className="text-gray-700">Mobile Number *</Label>
            <Input
              id="mobile"
              inputMode="numeric"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit mobile"
              className="h-12 rounded-xl mt-1"
              style={{ fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.05em" }}
            />
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DateField label="Birthday" value={birthday} onChange={setBirthday} />
            <DateField label="Anniversary" value={anniversary} onChange={setAnniversary} />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-14 rounded-xl text-base font-semibold mt-2 text-white hover:opacity-90 transition"
            style={{ backgroundColor: accent, color: primary }}
          >
            {submitting ? "Saving..." : "Save & Continue →"}
          </Button>
        </form>

        <p className="text-center text-[10px] text-gray-400 mt-6">
          Powered by{" "}
          <a
            href="https://ezzyerp.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Ezzy ERP
          </a>
        </p>
      </div>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: Date;
  onChange: (d?: Date) => void;
}) {
  return (
    <div>
      <Label className="text-gray-700">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-xl mt-1 justify-start font-normal text-left"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            {value ? format(value, "dd MMM") : <span className="text-gray-400">Pick</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            captionLayout="dropdown-buttons"
            fromYear={1950}
            toYear={new Date().getFullYear()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
