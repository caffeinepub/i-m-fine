import { Heart } from 'lucide-react';

export default function AppFooter() {
  const handleNavigation = (hash: string) => {
    window.location.hash = hash;
  };

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleNavigation('legal')}
              className="hover:text-foreground transition-colors underline"
            >
              Legal
            </button>
            <button
              onClick={() => handleNavigation('landing')}
              className="hover:text-foreground transition-colors underline"
            >
              Business
            </button>
            <button
              onClick={() => handleNavigation('landing')}
              className="hover:text-foreground transition-colors underline"
            >
              About Me
            </button>
          </div>
          <p className="text-center">
            © 2026. Built with <Heart className="inline h-4 w-4 text-destructive" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
