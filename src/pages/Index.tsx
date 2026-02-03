import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import Features from "@/components/landing/Features";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Gallery from "@/components/landing/Gallery";
import VideoSection from "@/components/landing/VideoSection";
import Pricing from "@/components/landing/Pricing";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problems />
        <Features />
        <WhyChooseUs />
        <Gallery />
        <VideoSection />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
