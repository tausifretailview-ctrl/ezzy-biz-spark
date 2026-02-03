import { XCircle, Clock, FileWarning, Calculator, Users } from "lucide-react";

const Problems = () => {
  const problems = [
    {
      icon: Clock,
      title: "Wasting Hours on Manual Billing?",
      description: "Stop writing bills by hand. Automate your entire billing process.",
    },
    {
      icon: FileWarning,
      title: "Stock Management Chaos?",
      description: "No more guessing. Track every item in real-time.",
    },
    {
      icon: Calculator,
      title: "GST Filing Headaches?",
      description: "Auto-calculate GST and generate ready-to-file reports.",
    },
    {
      icon: Users,
      title: "Customer Follow-ups Missing?",
      description: "Automated WhatsApp reminders for payments and promotions.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Are You Facing These Problems?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Most Indian businesses struggle with these daily challenges. Ezzy ERP
            solves them all.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
