import MoodCheckInCard from '../components/mood/MoodCheckInCard';
import JournalSection from '../components/journal/JournalSection';
import DashboardTrackerCard from '../components/dashboard/DashboardTrackerCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlan } from '../hooks/usePlan';
import { getFeaturesByPlan } from '../utils/plan';
import { CheckCircle2, Lock, Settings } from 'lucide-react';
import GreenButton from '../components/GreenButton';

export default function DashboardPage() {
  const { effectivePlanLevel } = usePlan();
  const availableFeatures = getFeaturesByPlan(effectivePlanLevel);
  const implementedFeatures = availableFeatures.filter(f => f.isImplemented);

  const handleSettingsClick = () => {
    window.location.hash = 'account?section=security';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back. How are you feeling today?
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Current plan: <span className="font-semibold capitalize">{effectivePlanLevel}</span>
          </p>
        </div>
        <GreenButton
          onClick={handleSettingsClick}
          size="default"
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Settings
        </GreenButton>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <MoodCheckInCard />
          <DashboardTrackerCard />
        </div>
        <div className="lg:col-span-2">
          <JournalSection />
        </div>
      </div>

      {/* Available Features Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Your Available Features</CardTitle>
          <CardDescription>
            Features included in your {effectivePlanLevel} plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {implementedFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex items-start gap-2 p-3 rounded-lg border border-border bg-muted/30"
              >
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm text-foreground">{feature.title}</div>
                  <div className="text-xs text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
          
          {effectivePlanLevel === 'free' && (
            <div className="mt-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  Upgrade to Basic or Premier to unlock additional tools, unlimited journaling, and more features.
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
