import { Phone, Check, Crown, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  const plans = [
    {
      name: "Basic Plan",
      icon: Zap,
      price: "₹25,000",
      priceLabel: "Starting at",
      popular: false,
      features: [
        "Smart Billing",
        "GST Billing",
        "Stock Maintenance",
        "Product & Customer Management",
        "Purchase & Sales Entry",
        "Basic Reports",
        "Desktop / Web Access",
        "Standard Support",
        "1 User",
      ],
      cta: "Call Now",
      ctaLink: "tel:+917385432144",
    },
    {
      name: "Pro Plan",
      icon: Star,
      price: "₹35,000",
      priceLabel: "",
      popular: true,
      features: [
        "All Basic features",
        "POS Billing System",
        "Barcoding Billing",
        "Advanced Reports (Sales & Profit)",
        "Multiple Payment Modes",
        "Faster Billing Workflow",
        "2 Users",
        "Priority Support",
      ],
      cta: "Call for Free Demo",
      ctaLink: "tel:+917385432144",
    },
    {
      name: "Advance Plan",
      icon: Crown,
      price: "₹50,000",
      priceLabel: "",
      popular: false,
      premium: true,
      features: [
        "All Pro features",
        "📱 Mobile App (Android)",
        "💬 WhatsApp Integration",
        "📊 Tally Data Support / Export",
        "☁️ Unlimited Cloud Storage",
        "Real-Time Live Data Access",
        "🔐 Backup & Security",
        "👥 3 Users",
        "🛠️ 24×7 Service & Support",
      ],
      cta: "Call Now",
      ctaLink: "tel:+917385432144",
    },
  ];

  return (
    <section className="py-16 px-4 bg-secondary/30" id="pricing">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-primary shadow-lg scale-[1.02] lg:scale-105"
                  : plan.premium
                  ? "border-primary/50"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <Badge className="w-full rounded-none py-2 gradient-primary text-primary-foreground justify-center text-sm font-medium">
                    ⭐ Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-6"}`}>
                <div
                  className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                    plan.premium
                      ? "gradient-hero"
                      : plan.popular
                      ? "gradient-primary"
                      : "bg-accent"
                  }`}
                >
                  <plan.icon
                    className={`w-7 h-7 ${
                      plan.premium || plan.popular ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                {plan.priceLabel && (
                  <p className="text-sm text-muted-foreground mt-1">{plan.priceLabel}</p>
                )}
                <p className="text-3xl sm:text-4xl font-bold text-gradient mt-2">{plan.price}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className={`w-full py-6 text-base font-medium ${
                    plan.popular || plan.premium
                      ? "gradient-primary hover:opacity-90"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  <a href={plan.ctaLink} className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    {plan.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          Prices may vary based on business requirements.{" "}
          <a
            href="tel:+917385432144"
            className="text-primary hover:underline font-medium"
          >
            Contact us for custom plans.
          </a>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
