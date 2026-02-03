import { Shield, Headphones, Zap, IndianRupee } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: IndianRupee,
      title: "Affordable Pricing",
      description: "Best value for Indian businesses. No hidden charges.",
    },
    {
      icon: Zap,
      title: "Easy to Use",
      description: "Simple interface. Learn in minutes, not days.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help. Call or WhatsApp anytime.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is safe. Regular backups included.",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "10L+", label: "Invoices Generated" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.8★", label: "Customer Rating" },
  ];

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Ezzy ERP?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by businesses across India for reliable, affordable, and
            powerful billing software.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 text-center shadow-lg border border-border"
            >
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reasons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-border"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <reason.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
