import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BreathingTimer from '../components/tools/BreathingTimer';
import Grounding54321 from '../components/tools/Grounding54321';
import ThoughtReframingPrompt from '../components/tools/ThoughtReframingPrompt';

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Self-Help Tools</h1>
        <p className="text-muted-foreground">
          Guided exercises to help you manage stress and anxiety.
        </p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="grounding">Grounding</TabsTrigger>
          <TabsTrigger value="reframing">Reframing</TabsTrigger>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
