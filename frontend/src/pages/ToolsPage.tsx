import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import BreathingTimer from '../components/tools/BreathingTimer';
import Grounding54321 from '../components/tools/Grounding54321';
import ThoughtReframingPrompt from '../components/tools/ThoughtReframingPrompt';
import EntitlementToolCard from '../components/tools/EntitlementToolCard';
import { usePlan } from '../hooks/usePlan';
import { FEATURE_ENTITLEMENTS } from '../utils/plan';
import { AlertCircle } from 'lucide-react';
import GreenButton from '../components/GreenButton';

export default function ToolsPage() {
  const { selectedPlan, effectivePlanLevel } = usePlan();

  // If no plan is selected, show a prompt
  if (!selectedPlan) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Self-Help Tools</h1>
          <p className="text-muted-foreground">
            Guided exercises to help you manage stress and anxiety.
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Plan Selection Required</AlertTitle>
          <AlertDescription className="mt-2 space-y-4">
            <p>Please select a plan in My Account to access the self-help tools.</p>
            <GreenButton onClick={() => window.location.reload()}>
              Go to My Account
            </GreenButton>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Get tool features
  const toolFeatures = FEATURE_ENTITLEMENTS.filter(f => f.category === 'tools');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Self-Help Tools</h1>
        <p className="text-muted-foreground">
          Guided exercises and tools to support your mental wellness journey.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Current plan: <span className="font-semibold capitalize">{effectivePlanLevel}</span>
        </p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="grounding">Grounding</TabsTrigger>
          <TabsTrigger value="reframing">Reframing</TabsTrigger>
        </TabsList>

        <TabsContent value="breathing" className="mt-6">
          <EntitlementToolCard
            title="Breathing Exercise"
            description="A simple breathing technique to help calm your mind and reduce anxiety"
            requiredPlan="free"
            userPlanLevel={effectivePlanLevel}
            isImplemented={true}
          >
            <BreathingTimer />
          </EntitlementToolCard>
        </TabsContent>

        <TabsContent value="grounding" className="mt-6">
          <EntitlementToolCard
            title="5-4-3-2-1 Grounding Technique"
            description="Use your senses to ground yourself in the present moment"
            requiredPlan="free"
            userPlanLevel={effectivePlanLevel}
            isImplemented={true}
          >
            <Grounding54321 />
          </EntitlementToolCard>
        </TabsContent>

        <TabsContent value="reframing" className="mt-6">
          <EntitlementToolCard
            title="Thought Reframing"
            description="Challenge negative thoughts and develop healthier thinking patterns"
            requiredPlan="basic"
            userPlanLevel={effectivePlanLevel}
            isImplemented={true}
          >
            <ThoughtReframingPrompt />
          </EntitlementToolCard>
        </TabsContent>
      </Tabs>

      {/* All Available Tools */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">All Tools & Features</h2>
        <div className="grid gap-4">
          {toolFeatures.map((feature) => (
            <EntitlementToolCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              requiredPlan={feature.requiredPlan}
              userPlanLevel={effectivePlanLevel}
              isImplemented={feature.isImplemented}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
