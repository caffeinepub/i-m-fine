import LandingSection from './LandingSection';
import LandingCTA from './LandingCTA';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function PricingSection() {
  return (
    <LandingSection id="pricing">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Choose Your Path to Healing
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Start free, upgrade anytime. No pressure, no judgment—just support when you need it.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription className="text-lg font-semibold text-foreground">
                $0<span className="text-sm font-normal text-muted-foreground">/forever</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Perfect for getting started</p>
              <ul className="space-y-3">
                <PricingFeature>Basic tools</PricingFeature>
                <PricingFeature>Limited journaling</PricingFeature>
                <PricingFeature>Grounding exercises</PricingFeature>
                <PricingFeature>Community resources</PricingFeature>
                <PricingFeature>What is Trauma? 5 part guide and activities</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <LandingCTA className="w-full">
                Begin Free
              </LandingCTA>
            </CardFooter>
          </Card>

          {/* Basic Plan */}
          <Card className="border-2 border-primary shadow-lg relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription className="text-lg font-semibold text-foreground">
                $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Everything you need to thrive</p>
              <ul className="space-y-3">
                <PricingFeature>Everything in the free plan</PricingFeature>
                <PricingFeature>Full journal access</PricingFeature>
                <PricingFeature>Intention Setting</PricingFeature>
                <PricingFeature>Reflection prompts</PricingFeature>
                <PricingFeature>Life Audit</PricingFeature>
                <PricingFeature>Habit tracker package</PricingFeature>
                <PricingFeature>Mindful changes package</PricingFeature>
                <PricingFeature>Progress tracking tools and activities</PricingFeature>
                <PricingFeature>Trigger support tools</PricingFeature>
                <PricingFeature>Free monthly newsletter with priority updates</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <LandingCTA className="w-full">
                Get Started
              </LandingCTA>
            </CardFooter>
          </Card>

          {/* Premier Plan */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl">Premier</CardTitle>
              <CardDescription className="text-lg font-semibold text-foreground">
                $24.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Maximum support & features</p>
              <ul className="space-y-3">
                <PricingFeature>Everything in the free and basic plans</PricingFeature>
                <PricingFeature>Better you Challenge trackers</PricingFeature>
                <PricingFeature>Reset work</PricingFeature>
                <PricingFeature>All trackers</PricingFeature>
                <PricingFeature>One on One AI Guidance</PricingFeature>
                <PricingFeature>Deep trauma tools</PricingFeature>
                <PricingFeature>Premium content</PricingFeature>
                <PricingFeature>Early access to new features</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <LandingCTA className="w-full">
                Go Premier
              </LandingCTA>
            </CardFooter>
          </Card>
        </div>

        {/* Pricing Policy */}
        <div className="mt-12 max-w-3xl mx-auto bg-muted/30 rounded-lg p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-3">Transparent Pricing Policy</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Cancellation:</strong> Cancel paid plans anytime with 30-day notice. Your access continues until the end of your billing period.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Refunds:</strong> Full refund available within 3 days of purchase. No refunds after 3 days.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Billing:</strong> Recurring monthly billing. No hidden fees. Upgrade or downgrade anytime.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Premier Plans:</strong> No refunds on premier plans.</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground italic">
            No penalties. No guilt. You're in control.
          </p>
        </div>
      </div>
    </LandingSection>
  );
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <span className="text-muted-foreground">{children}</span>
    </li>
  );
}
