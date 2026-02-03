import { Phone, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const benefits = [
    "GST Ready Billing",
    "Real-time Inventory",
    "WhatsApp Integration",
  ];

  return (
    <section className="pt-24 pb-16 px-4 md:pt-32 md:pb-24">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            #1 Billing Software for Indian Businesses
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Simplify Your Business with{" "}
            <span className="text-gradient">Ezzy ERP</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete Billing & Inventory Management Software designed for Indian
            businesses. GST compliant, easy to use, and built for growth.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="gradient-primary hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
            >
              <a href="tel:+917385432144" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call: 91-7385432144
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
            >
              <a
                href="https://wa.me/917385432144?text=Hi, I'm interested in Ezzy ERP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="mt-8 text-sm text-muted-foreground">
            Trusted by 500+ businesses across India
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
