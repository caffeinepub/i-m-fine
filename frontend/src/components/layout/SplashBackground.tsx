interface SplashBackgroundProps {
  children: React.ReactNode;
}

const SPLASH_BACKGROUND = '/assets/generated/im-fine-bg-clouds.dim_1920x1080.optim.png';

export default function SplashBackground({ children }: SplashBackgroundProps) {
  return (
    <div className="relative min-h-screen">
      {/* Powder pink clouds background image layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${SPLASH_BACKGROUND})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'oklch(0.90 0.03 350)', // Fallback powder pink
        }}
        aria-hidden="true"
      />
      
      {/* Overlay for readability */}
      <div
        className="fixed inset-0 z-0 bg-background/80 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
