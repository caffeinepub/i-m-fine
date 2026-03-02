import LandingSection from './LandingSection';
import { Shield, Lock, Eye, UserX, Database, Key } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function PrivacySafetySection() {
  return (
    <LandingSection className="bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            🔐 Your Privacy Is Non-Negotiable
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your healing is personal. We treat it that way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <SafetyCard
            icon={<Lock className="h-6 w-6" />}
            title="End-to-end data protection"
            description="Your information is encrypted and secure. This app is here to protect you, not drain you."
          />
          <SafetyCard
            icon={<UserX className="h-6 w-6" />}
            title="No selling your information"
            description="We will never sell your data to third parties. Ever. Your privacy is not a product."
          />
          <SafetyCard
            icon={<Eye className="h-6 w-6" />}
            title="No ads tracking your emotions"
            description="No advertisements. No tracking. Your healing journey is yours alone."
          />
          <SafetyCard
            icon={<Database className="h-6 w-6" />}
            title="Secure storage"
            description="All your data is stored securely on the Internet Computer blockchain with complete privacy."
          />
          <SafetyCard
            icon={<Key className="h-6 w-6" />}
            title="Optional anonymous use"
            description="You control your data. Use the app on your terms, with the privacy level you choose."
          />
          <SafetyCard
            icon={<Shield className="h-6 w-6" />}
            title="You control your data"
            description="Your story stays yours. You decide what to share, what to keep, and when to delete."
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center mb-8">
          <p className="text-muted-foreground leading-relaxed italic">
            Your story stays yours.
          </p>
        </div>

        {/* Safety Notice */}
        <Alert className="mb-8 border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-sm leading-relaxed ml-2">
            <strong className="font-semibold text-foreground">🛡️ Safety Notice:</strong> If you are in immediate crisis, please contact local emergency services or the Suicide & Crisis Lifeline (988 in the U.S.). You matter. Help is available.
          </AlertDescription>
        </Alert>

        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-3 text-foreground">
            Important: We're Here to Support, Not Replace Professional Care
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            I'm Fine supports your healing journey. It does not replace licensed professionals. If you're experiencing a mental health crisis, please reach out to a licensed professional or crisis hotline immediately.
          </p>
          <p className="text-sm text-muted-foreground italic">
            This app is a way to make meaning out of pain. A way to help others not feel as alone as I once did. A way to turn survival into purpose.
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Take this journey for you and find your way back to peace, back to you.
          </p>
        </div>
      </div>
    </LandingSection>
  );
}

function SafetyCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="text-primary mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
