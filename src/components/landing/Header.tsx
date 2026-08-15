import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/ezzylogo.png.asset.json";
const logo = logoAsset.url;

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Ezzy ERP" className="h-10 w-auto" />
        </div>

        {/* CTA Button */}
        <Button
          asChild
          size="sm"
          className="gradient-primary hover:opacity-90 transition-opacity"
        >
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
