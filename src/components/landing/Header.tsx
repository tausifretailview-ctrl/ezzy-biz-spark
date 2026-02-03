import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">E</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            Ezzy<span className="text-primary">ERP</span>
          </span>
        </div>

        <Button asChild className="gradient-primary hover:opacity-90 transition-opacity">
          <a href="tel:+917385432144" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call Now</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
