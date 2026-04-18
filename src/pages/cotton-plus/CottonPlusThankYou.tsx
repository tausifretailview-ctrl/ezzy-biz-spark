import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram, MessageCircle, Facebook, Star, Check } from "lucide-react";
import { useCottonPlusSettings } from "@/hooks/useCottonPlusSettings";
import { CottonPlusLogo } from "@/components/cotton-plus/CottonPlusLogo";

export default function CottonPlusThankYou() {
  const { state } = useLocation() as { state: { name?: string } };
  const { data: settings } = useCottonPlusSettings();
  const primary = settings?.primary_color || "#0b1120";
  const accent = settings?.accent_color || "#22d3ee";
  const name = state?.name || "";

  const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${primary} 0%, ${primary} 60%, ${accent}22 100%)`,
        fontFamily: "DM Sans, system-ui, sans-serif",
      }}
    >
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
        <CottonPlusLogo logoUrl={settings?.logo_url} storeName={settings?.store_name} />

        <div
          className="mx-auto mt-6 w-16 h-16 rounded-full flex items-center justify-center animate-in zoom-in duration-500"
          style={{ backgroundColor: `${accent}33` }}
        >
          <Check className="h-8 w-8" style={{ color: accent }} strokeWidth={3} />
        </div>

        <h1 className="text-2xl font-bold mt-4 text-gray-900">
          Thank you{name ? `, ${name}` : ""}! 🎉
        </h1>
        <p className="text-sm text-gray-500 mt-2 mb-6">
          {settings?.thank_you_message ||
            "Thank you for your details! Please help us grow by leaving a review."}
        </p>

        <div className="space-y-3">
          {settings?.google_review_url && (
            <Button
              onClick={() => open(settings.google_review_url)}
              className="w-full h-14 rounded-xl text-base font-semibold bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
            >
              <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
              Rate us on Google
            </Button>
          )}

          {settings?.instagram_url && (
            <Button
              onClick={() => open(settings.instagram_url)}
              className="w-full h-14 rounded-xl text-base font-semibold text-white hover:opacity-90"
              style={{
                background:
                  "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              }}
            >
              <Instagram className="h-5 w-5 mr-2" />
              Follow us on Instagram
            </Button>
          )}

          {settings?.whatsapp_number && (
            <Button
              onClick={() =>
                open(`https://wa.me/91${settings.whatsapp_number.replace(/\D/g, "")}`)
              }
              className="w-full h-14 rounded-xl text-base font-semibold text-white bg-green-500 hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat on WhatsApp
            </Button>
          )}

          {settings?.facebook_url && (
            <Button
              onClick={() => open(settings.facebook_url)}
              className="w-full h-14 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700"
            >
              <Facebook className="h-5 w-5 mr-2" />
              Like us on Facebook
            </Button>
          )}
        </div>

        <Link
          to="/cotton-plus"
          className="inline-block mt-6 text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to form
        </Link>
      </div>
    </div>
  );
}
