import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import BreathingTimer from '../components/tools/BreathingTimer';
import Grounding54321 from '../components/tools/Grounding54321';
import ThoughtReframingPrompt from '../components/tools/ThoughtReframingPrompt';
import { usePlan } from '../hooks/usePlan';
import { AlertCircle, Lock } from 'lucide-react';
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

  // Define which tools are available for each plan level
  const availableTools = {
    free: ['breathing', 'grounding'],
    basic: ['breathing', 'grounding', 'reframing'],
    premier: ['breathing', 'grounding', 'reframing'],
  };

  const tools = availableTools[effectivePlanLevel] || [];
  const hasReframing = tools.includes('reframing');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Self-Help Tools</h1>
        <p className="text-muted-foreground">
          Guided exercises to help you manage stress and anxiety.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Current plan: <span className="font-semibold capitalize">{effectivePlanLevel}</span>
        </p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="grounding">Grounding</TabsTrigger>
          <TabsTrigger value="reframing" disabled={!hasReframing}>
            Reframing {!hasReframing && <Lock className="ml-1 h-3 w-3" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breathing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Breathing Exercise</CardTitle>
              <CardDescription>
                A simple breathing technique to help calm your mind and reduce anxiety.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BreathingTimer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grounding" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>5-4-3-2-1 Grounding Technique</CardTitle>
              <CardDescription>
                Use your senses to ground yourself in the present moment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grounding54321 />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reframing" className="mt-6">
          {hasReframing ? (
            <Card>
              <CardHeader>
                <CardTitle>Thought Reframing</CardTitle>
                <CardDescription>
                  Challenge negative thoughts and develop healthier thinking patterns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThoughtReframingPrompt />
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertTitle>Upgrade Required</AlertTitle>
              <AlertDescription>
                The Thought Reframing tool is available on Basic and Premier plans. Upgrade your plan in My Account to access this feature.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
