import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Placeholder posters - will be replaced with actual images
  const posters = [
    { id: 1, title: "Promotional Poster 1" },
    { id: 2, title: "Promotional Poster 2" },
    { id: 3, title: "Promotional Poster 3" },
    { id: 4, title: "Promotional Poster 4" },
    { id: 5, title: "Promotional Poster 5" },
    { id: 6, title: "Promotional Poster 6" },
    { id: 7, title: "Promotional Poster 7" },
    { id: 8, title: "Promotional Poster 8" },
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posters.map((poster, index) => (
            <div
              key={poster.id}
              onClick={() => openLightbox(index)}
              className="aspect-square bg-gradient-to-br from-primary/10 to-accent rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg"
            >
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
                {poster.title}
              </div>
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

            <div className="max-w-4xl max-h-[80vh] bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center p-8">
              <p className="text-white text-lg">
                {posters[selectedIndex].title}
              </p>
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
