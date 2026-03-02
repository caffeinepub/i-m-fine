import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useRecordToolUsage } from '../../hooks/useGoals';
import { GoalCategory } from '../../backend';

const STEPS = [
  {
    number: 5,
    sense: 'See',
    prompt: 'Name 5 things you can see around you',
    placeholder: 'e.g., a lamp, a book, a plant...',
  },
  {
    number: 4,
    sense: 'Touch',
    prompt: 'Name 4 things you can touch',
    placeholder: 'e.g., your chair, your clothes, the floor...',
  },
  {
    number: 3,
    sense: 'Hear',
    prompt: 'Name 3 things you can hear',
    placeholder: 'e.g., birds chirping, traffic, your breathing...',
  },
  {
    number: 2,
    sense: 'Smell',
    prompt: 'Name 2 things you can smell',
    placeholder: 'e.g., coffee, fresh air, soap...',
  },
  {
    number: 1,
    sense: 'Taste',
    prompt: 'Name 1 thing you can taste',
    placeholder: 'e.g., mint, coffee, or just notice your mouth...',
  },
];

export default function Grounding54321() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(Array(5).fill(''));
  const [isComplete, setIsComplete] = useState(false);

  const { mutate: recordToolUsage } = useRecordToolUsage();
  const step = STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      // Record grounding tool usage on completion
      recordToolUsage(GoalCategory.groundingTool);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setResponses(Array(5).fill(''));
    setIsComplete(false);
  };

  const updateResponse = (value: string) => {
    const newResponses = [...responses];
    newResponses[currentStep] = value;
    setResponses(newResponses);
  };

  if (isComplete) {
    return (
      <div className="text-center space-y-6 py-8">
        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-foreground">Well Done!</h3>
          <p className="text-muted-foreground">
            You've completed the 5-4-3-2-1 grounding exercise.
          </p>
          <p className="text-sm text-primary font-medium mt-2">Goal progress recorded! 🎉</p>
        </div>
        <Button onClick={handleReset} size="lg">
          Start Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-12 rounded-full transition-colors ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {STEPS.length}
        </span>
      </div>

      <div className="space-y-4">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-primary">{step.number}</div>
          <h3 className="text-xl font-semibold text-foreground">{step.prompt}</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="response">Your response (optional)</Label>
          <Textarea
            id="response"
            placeholder={step.placeholder}
            value={responses[currentStep]}
            onChange={(e) => updateResponse(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext} className="gap-2">
          {currentStep === STEPS.length - 1 ? 'Complete' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium mb-2 text-foreground">About this exercise:</p>
        <p>
          The 5-4-3-2-1 technique helps ground you in the present moment by engaging all five senses.
          It&apos;s particularly helpful during moments of anxiety or stress.
        </p>
      </div>
    </div>
  );
}
