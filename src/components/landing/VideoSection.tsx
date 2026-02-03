import { Play } from "lucide-react";
import { useState } from "react";
import videoThumbnail from "@/assets/video-thumbnail.png";
import promoVideo from "@/assets/promo-video.mp4";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            See Ezzy ERP in Action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch how Ezzy ERP can transform your business operations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {!isPlaying ? (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                {/* Thumbnail */}
                <img
                  src={videoThumbnail}
                  alt="Ezzy ERP Demo"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Play button */}
                <div className="relative z-10 w-20 h-20 rounded-full gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>
            ) : (
              <video
                src={promoVideo}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                autoPlay
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
