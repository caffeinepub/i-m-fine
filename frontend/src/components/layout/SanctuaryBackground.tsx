interface SanctuaryBackgroundProps {
  children: React.ReactNode;
}

const STATIC_BACKGROUND = '/assets/generated/im-fine-bg-beach.dim_1920x1080.optim.png';

export default function SanctuaryBackground({ children }: SanctuaryBackgroundProps) {
  return (
    <div className="relative min-h-screen">
      {/* Static background image layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${STATIC_BACKGROUND})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'oklch(0.85 0.02 180)', // Fallback color matching sanctuary theme
        }}
        aria-hidden="true"
      />
      
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
