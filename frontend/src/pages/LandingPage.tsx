import LandingHeader from '../components/landing/LandingHeader';
import HeroSection from '../components/landing/HeroSection';
import ValueProposition from '../components/landing/ValueProposition';
import FeatureAndBenefitsBlocks from '../components/landing/FeatureAndBenefitsBlocks';
import PricingSection from '../components/landing/PricingSection';
import FAQSection from '../components/landing/FAQSection';
import PrivacySafetySection from '../components/landing/PrivacySafetySection';
import SanctuaryBackground from '../components/layout/SanctuaryBackground';
import AppFooter from '../components/layout/AppFooter';

interface LandingPageProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export default function LandingPage({ hideHeader = false, hideFooter = false }: LandingPageProps) {
  return (
    <SanctuaryBackground>
      <div className="min-h-screen">
        {!hideHeader && <LandingHeader />}
        <main>
          <HeroSection />
          <ValueProposition />
          <FeatureAndBenefitsBlocks />
          <PricingSection />
          <FAQSection />
          <PrivacySafetySection />
        </main>
        
        {!hideFooter && <AppFooter />}
      </div>
    </SanctuaryBackground>
  );
}
