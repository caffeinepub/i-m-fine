import LandingSection from './LandingSection';
import { Shield, Heart, Sparkles } from 'lucide-react';

export default function ValueProposition() {
  return (
    <LandingSection className="bg-card/40 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            You're not weak.<br />You're healing.
          </h2>
          <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <p>If you've ever said "I'm Fine" when you weren't...</p>
            <p>If you've ever felt stuck in survival mode...</p>
            <p>If you've lost pieces of yourself trying to stay strong...</p>
          </div>
          <p className="text-xl md:text-2xl text-foreground font-semibold mt-8 max-w-3xl mx-auto">
            You're not broken. You're human.
          </p>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            I'm Fine exists to help you feel safe in your own mind again.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
            What makes I'm Fine different?
          </h3>
          <p className="text-center text-lg text-muted-foreground mb-8">
            This is a recovery toolkit for real life.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">Trauma-Aware Tools</h4>
            <p className="text-sm text-muted-foreground">
              Designed with understanding of how trauma affects the mind and body.
            </p>
          </div>
          
          <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">Judgment-Free Support</h4>
            <p className="text-sm text-muted-foreground">
              No pressure. No shame. No pretending. Just you, healing at your own pace.
            </p>
          </div>
          
          <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">Built for Emotional Safety</h4>
            <p className="text-sm text-muted-foreground">
              Designed with dignity. Every feature respects your journey and your boundaries.
            </p>
          </div>

          <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-foreground">Private and Secure</h4>
            <p className="text-sm text-muted-foreground">
              Your data belongs to you. Everything stays private, encrypted, and safe.
            </p>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
