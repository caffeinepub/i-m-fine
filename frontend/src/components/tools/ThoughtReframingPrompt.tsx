import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useRecordToolUsage } from '../../hooks/useGoals';
import { GoalCategory } from '../../backend';

const PROMPTS = [
  'What evidence do I have for this thought?',
  'What evidence do I have against this thought?',
  'Am I looking at the whole picture?',
  'What would I tell a friend who had this thought?',
  'Is this thought helpful or harmful?',
  "What's a more balanced way to look at this situation?",
];

export default function ThoughtReframingPrompt() {
  const [negativeThought, setNegativeThought] = useState('');
  const [reframedThought, setReframedThought] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { mutate: recordToolUsage } = useRecordToolUsage();

  const handleStart = () => {
    if (negativeThought.trim()) {
      setShowPrompts(true);
    }
  };

  const handleSubmit = () => {
    if (reframedThought.trim()) {
      setSubmitted(true);
      // Record reframing tool usage on completion
      recordToolUsage(GoalCategory.reframingTool);
    }
  };

  const handleReset = () => {
    setNegativeThought('');
    setReframedThought('');
    setShowPrompts(false);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6 py-8">
        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-foreground">Great Work!</h3>
          <p className="text-muted-foreground">
            You&apos;ve completed the thought reframing exercise.
          </p>
          <p className="text-sm text-primary font-medium mt-2">Goal progress recorded! 🎉</p>
        </div>
        <Card className="bg-muted/30 text-left">
          <CardContent className="pt-4">
            <Label className="text-xs text-muted-foreground">Your reframed thought:</Label>
            <p className="mt-1 text-foreground text-sm italic">&quot;{reframedThought}&quot;</p>
          </CardContent>
        </Card>
        <Button onClick={handleReset} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Start Over
        </Button>
      </div>
    );
  }

  if (!showPrompts) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="negative-thought">What negative thought are you experiencing?</Label>
            <Textarea
              id="negative-thought"
              placeholder="e.g., I'm not good enough, I always fail, Nobody likes me..."
              value={negativeThought}
              onChange={(e) => setNegativeThought(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          <Button
            onClick={handleStart}
            disabled={!negativeThought.trim()}
            size="lg"
            className="w-full gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Start Reframing
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium mb-2 text-foreground">What is thought reframing?</p>
          <p>
            Thought reframing is a cognitive technique that helps you challenge negative thinking patterns
            and develop more balanced, realistic perspectives. It&apos;s a core skill in cognitive behavioral therapy (CBT).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <Label className="text-sm text-muted-foreground">Your negative thought:</Label>
          <p className="mt-2 text-foreground italic">&quot;{negativeThought}&quot;</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Label className="text-base font-semibold">Consider these questions:</Label>
        <div className="space-y-2">
          {PROMPTS.map((prompt, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
            >
              <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <p className="text-sm text-card-foreground pt-0.5">{prompt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reframed-thought">Write a more balanced thought:</Label>
        <Textarea
          id="reframed-thought"
          placeholder="After considering the questions above, how can you reframe this thought in a more balanced way?"
          value={reframedThought}
          onChange={(e) => setReframedThought(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!reframedThought.trim()}
          className="flex-1 gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          Complete Exercise
        </Button>
        <Button onClick={handleReset} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Start Over
        </Button>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium mb-2 text-foreground">Remember:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Be patient with yourself - this takes practice</li>
          <li>Look for evidence, not just feelings</li>
          <li>Aim for balance, not just positive thinking</li>
          <li>Consider what you&apos;d tell a friend in this situation</li>
        </ul>
      </div>
    </div>
  );
}
