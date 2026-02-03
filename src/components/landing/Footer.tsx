import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/ezzylogo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Ezzy ERP" className="h-12 w-auto" />
            </div>
            <p className="text-background/70 text-sm">
              Complete Billing & Inventory Management Software for Indian Businesses.
              GST compliant, easy to use, and built for growth.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="tel:+917385432144"
                className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                91-7385432144
              </a>
              <a
                href="mailto:support@ezzyerp.com"
                className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                support@ezzyerp.com
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Office Address</h3>
            <div className="flex items-start gap-3 text-background/70">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p>
                Shop No.2, Mittal Tower, Sector Number 1 Rd, Sector 1, Kopar
                Khairane, Navi Mumbai, Maharashtra 400709
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Ezzy ERP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
