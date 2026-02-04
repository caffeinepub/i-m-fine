import LandingHeader from '../components/landing/LandingHeader';
import HeroSection from '../components/landing/HeroSection';
import ValueProposition from '../components/landing/ValueProposition';
import FeatureAndBenefitsBlocks from '../components/landing/FeatureAndBenefitsBlocks';
import SocialProofSection from '../components/landing/SocialProofSection';
import PricingSection from '../components/landing/PricingSection';
import FAQSection from '../components/landing/FAQSection';
import PrivacySafetySection from '../components/landing/PrivacySafetySection';
import SanctuaryBackground from '../components/layout/SanctuaryBackground';
import { Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <SanctuaryBackground>
      <div className="min-h-screen">
        <LandingHeader />
        <main>
          <HeroSection />
          <ValueProposition />
          <FeatureAndBenefitsBlocks />
          <SocialProofSection />
          <PricingSection />
          <FAQSection />
          <PrivacySafetySection />
        </main>
        
        {/* Footer */}
        <footer className="py-6 sm:py-8 border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-2">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-3 px-2">
                <a href="#" className="hover:text-foreground transition-colors">About</a>
                <span className="hidden sm:inline">|</span>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <span className="hidden sm:inline">|</span>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <span className="hidden sm:inline">|</span>
                <a href="#" className="hover:text-foreground transition-colors">Support</a>
                <span className="hidden sm:inline">|</span>
                <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              </div>
              <p className="mb-2 text-xs sm:text-sm">© 2026 I'm Fine. All Rights Reserved.</p>
              <p className="text-xs">
                Built with <Heart className="inline h-3 w-3 text-destructive" /> using{' '}
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
      </div>
    </SanctuaryBackground>
  );
}
