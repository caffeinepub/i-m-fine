import LandingSection from './LandingSection';
import { BookOpen, Wind, Target, Search, Clock } from 'lucide-react';

export default function FeatureAndBenefitsBlocks() {
  return (
    <>
      {/* Features Section */}
      <LandingSection id="features">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Tools That Meet You Where You Are
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to reconnect with yourself, at your own pace.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BookOpen className="h-7 w-7" />}
              title="📝 Guided Healing Journals"
              description="Process your thoughts safely and clearly."
            />
            <FeatureCard
              icon={<Wind className="h-7 w-7" />}
              title="🌬️ Grounding & Trigger Support"
              description="Calm your body when emotions spike."
            />
            <FeatureCard
              icon={<Target className="h-7 w-7" />}
              title="🎯 Confidence & Life Rebuilding Plans"
              description="Create small, realistic steps forward."
            />
            <FeatureCard
              icon={<Search className="h-7 w-7" />}
              title="🔍 Self-Awareness Check-Ins"
              description="Understand patterns. Reclaim control."
            />
            <FeatureCard
              icon={<Clock className="h-7 w-7" />}
              title='⏳ "Stay in the Now" Exercises'
              description="Bring yourself back when the past tries to pull you under."
            />
          </div>
        </div>
      </LandingSection>

      {/* Benefits Section */}
      <LandingSection className="bg-card/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            ❤️ Real Benefits. Real Change.
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            With I'm Fine, you can:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <BenefitItem text="✓ Feel calmer during emotional waves" />
            <BenefitItem text="✓ Understand your triggers" />
            <BenefitItem text="✓ Build confidence again" />
            <BenefitItem text="✓ Reconnect with your identity" />
            <BenefitItem text="✓ Trust yourself" />
            <BenefitItem text="✓ Feel safe in your own thoughts" />
            <BenefitItem text="✓ Stop just surviving—and start living" />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-foreground font-semibold italic">
              This is about progress, not perfection.
            </p>
          </div>
        </div>
      </LandingSection>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all">
      <div className="text-primary mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4 border border-border">
      <p className="text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
