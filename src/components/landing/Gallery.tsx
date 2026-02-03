import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import poster1 from "@/assets/poster-1.jpeg";
import poster2 from "@/assets/poster-2.jpeg";
import poster3 from "@/assets/poster-3.png";
import poster4 from "@/assets/poster-4.png";
import poster5 from "@/assets/poster-5.png";
import poster6 from "@/assets/poster-6.png";

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const posters = [
    { id: 1, title: "Smart Billing & Inventory", image: poster1 },
    { id: 2, title: "Cloud Based ERP", image: poster2 },
    { id: 3, title: "Billing & Inventory Reports", image: poster3 },
    { id: 4, title: "Business Trust", image: poster4 },
    { id: 5, title: "One Solution", image: poster5 },
    { id: 6, title: "Easy Billing Smart Business", image: poster6 },
  ];

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goToPrevious = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + posters.length) % posters.length : null
    );
  const goToNext = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % posters.length : null
    );

  return (
    <section className="py-16 px-4" id="gallery">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Promotional Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our latest offers and features
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posters.map((poster, index) => (
            <div
              key={poster.id}
              onClick={() => openLightbox(index)}
              className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg"
            >
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <div className="max-w-lg max-h-[80vh] rounded-xl overflow-hidden">
              <img
                src={posters[selectedIndex].image}
                alt={posters[selectedIndex].title}
                className="w-full h-full object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={goToNext}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
