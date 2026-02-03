import {
  Barcode,
  ShoppingCart,
  Calculator,
  FileSpreadsheet,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Barcode,
      title: "Stock Maintain With Barcoding",
      description:
        "Complete inventory management with barcode scanning. Track stock levels, set alerts, and manage multiple warehouses effortlessly.",
      benefits: ["Barcode Generation", "Stock Alerts", "Multi-warehouse Support"],
    },
    {
      icon: ShoppingCart,
      title: "Sale Maintain With POS",
      description:
        "Fast and intuitive Point of Sale system. Process sales quickly with touch-friendly interface designed for retail.",
      benefits: ["Touch POS", "Quick Billing", "Multiple Payment Modes"],
    },
    {
      icon: Calculator,
      title: "Accounts Maintain",
      description:
        "Complete accounting solution with ledgers, trial balance, and financial reports. Keep your books clean and accurate.",
      benefits: ["Ledger Management", "Trial Balance", "Profit & Loss"],
    },
    {
      icon: FileSpreadsheet,
      title: "GST Analysis",
      description:
        "Automated GST calculations and ready-to-file reports. GSTR-1, GSTR-3B, and HSN summary at your fingertips.",
      benefits: ["Auto GST Calculation", "GSTR Reports", "HSN Summary"],
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Integration",
      description:
        "Send invoices, payment reminders, and promotional messages directly via WhatsApp. Stay connected with customers.",
      benefits: ["Invoice Sharing", "Payment Reminders", "Bulk Messaging"],
    },
  ];

  return (
    <section className="py-16 px-4" id="features">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features for Your Business
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage billing, inventory, accounts, and customer
            relationships in one place.
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center`}
            >
              {/* Content */}
              <div className="flex-1 space-y-4">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Screenshot Placeholder */}
              <div className="flex-1 w-full">
                <div className="bg-gradient-to-br from-primary/10 to-accent rounded-2xl p-4 shadow-xl">
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center screenshot-enhance overflow-hidden">
                    <div className="text-center p-8">
                      <feature.icon className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                      <p className="text-muted-foreground text-sm">
                        Screenshot: {feature.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
