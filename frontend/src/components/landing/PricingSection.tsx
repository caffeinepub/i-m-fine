import LandingSection from './LandingSection';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import GreenButton from '../GreenButton';

export default function PricingSection() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const handlePricingCTA = (planType: 'demo' | 'basic' | 'premier') => {
    if (isAuthenticated) {
      // Navigate to My Account with plan section query parameter
      window.location.hash = 'account?section=plan';
    } else {
      // Trigger login for unauthenticated users
      login();
    }
  };

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
          {/* Demo Plan */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl">Demo</CardTitle>
              <CardDescription className="text-lg font-semibold text-foreground">
                $0<span className="text-sm font-normal text-muted-foreground"> / 6 weeks then $4.99/month</span>
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
              <GreenButton 
                className="w-full"
                onClick={() => handlePricingCTA('demo')}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing in...' : isAuthenticated ? 'Select Demo' : 'Try Demo'}
              </GreenButton>
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
                $14.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Everything you need to thrive</p>
              <ul className="space-y-3">
                <PricingFeature>Everything in the demo plan</PricingFeature>
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
              <GreenButton 
                className="w-full"
                onClick={() => handlePricingCTA('basic')}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing in...' : isAuthenticated ? 'Select Basic' : 'Choose Basic'}
              </GreenButton>
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
                <PricingFeature>Everything in the demo and basic plans</PricingFeature>
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
              <GreenButton 
                className="w-full"
                onClick={() => handlePricingCTA('premier')}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing in...' : isAuthenticated ? 'Select Premier' : 'Choose Premier'}
              </GreenButton>
            </CardFooter>
          </Card>
        </div>

        {/* Pricing Policy */}
        <div className="mt-12 max-w-3xl mx-auto bg-muted/30 rounded-lg p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-3">Transparent Pricing Policy</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Cancellation:</strong> All paid subscriptions can be canceled with a 30 day written notice. User will still have access until the end of the billing cycle, additional charge may be incurred during that time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Refunds:</strong> No refunds are given at all.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Billing:</strong> Recurring monthly billing. No hidden fees. Upgrade or downgrade at any time with proper notice.</span>
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
