import { useState, useEffect } from 'react';

interface SanctuaryBackgroundProps {
  children: React.ReactNode;
}

const backgroundImages = [
  '/assets/generated/im-fine-bg-landscape.dim_1920x1080.optim.png',
  '/assets/generated/im-fine-bg-beach.dim_1920x1080.optim.png',
  '/assets/generated/im-fine-bg-ocean.dim_1920x1080.optim.png',
  '/assets/generated/im-fine-bg-clouds.dim_1920x1080.optim.png',
];

export default function SanctuaryBackground({ children }: SanctuaryBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  // Preload all images on mount
  useEffect(() => {
    backgroundImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(index));
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentImageIndex + 1) % backgroundImages.length;
      
      // Only transition if the next image is loaded
      if (loadedImages.has(next)) {
        setNextImageIndex(next);
        setIsTransitioning(true);
        
        // Complete transition after fade duration
        setTimeout(() => {
          setCurrentImageIndex(next);
          setIsTransitioning(false);
        }, 1000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [currentImageIndex, loadedImages]);

  return (
    <div className="relative min-h-screen">
      {/* Current background image layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'oklch(0.85 0.02 180)', // Fallback color matching sanctuary theme
        }}
        aria-hidden="true"
      />
      
      {/* Next background image layer (for crossfade) */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${backgroundImages[nextImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 1,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Overlay for readability */}
      <div
        className="fixed inset-0 z-0 bg-background/85 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
