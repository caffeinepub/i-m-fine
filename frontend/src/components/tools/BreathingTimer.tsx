import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useRecordToolUsage } from '../../hooks/useGoals';
import { GoalCategory } from '../../backend';

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

const PHASES: { phase: Phase; duration: number; instruction: string }[] = [
  { phase: 'inhale', duration: 4, instruction: 'Breathe in slowly through your nose' },
  { phase: 'hold', duration: 4, instruction: 'Hold your breath' },
  { phase: 'exhale', duration: 6, instruction: 'Breathe out slowly through your mouth' },
  { phase: 'rest', duration: 2, instruction: 'Rest and prepare for the next breath' },
];

const TARGET_CYCLES = 3;

export default function BreathingTimer() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);
  const [cycleCount, setCycleCount] = useState(0);
  const completionRecorded = useRef(false);

  const { mutate: recordToolUsage } = useRecordToolUsage();
  const currentPhase = PHASES[currentPhaseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const nextIndex = (currentPhaseIndex + 1) % PHASES.length;
      setCurrentPhaseIndex(nextIndex);
      setTimeLeft(PHASES[nextIndex].duration);

      if (nextIndex === 0) {
        setCycleCount((count) => {
          const newCount = count + 1;
          // Record completion after TARGET_CYCLES cycles (once per session)
          if (newCount >= TARGET_CYCLES && !completionRecorded.current) {
            completionRecorded.current = true;
            recordToolUsage(GoalCategory.breathingTool);
          }
          return newCount;
        });
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, currentPhaseIndex, recordToolUsage]);

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhaseIndex(0);
    setTimeLeft(PHASES[0].duration);
    setCycleCount(0);
    completionRecorded.current = false;
  };

  const getPhaseColor = () => {
    switch (currentPhase.phase) {
      case 'inhale':
        return 'bg-green-500/20 border-green-500';
      case 'hold':
        return 'bg-amber-500/20 border-amber-500';
      case 'exhale':
        return 'bg-orange-500/20 border-orange-500';
      case 'rest':
        return 'bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div
          className={`mx-auto w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${getPhaseColor()}`}
        >
          <div className="text-center">
            <div className="text-5xl font-bold text-foreground">{timeLeft}</div>
            <div className="text-sm text-muted-foreground mt-1">seconds</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold capitalize text-foreground">
            {currentPhase.phase}
          </h3>
          <p className="text-muted-foreground">{currentPhase.instruction}</p>
        </div>

        {cycleCount > 0 && (
          <p className="text-sm text-muted-foreground">
            Completed {cycleCount} {cycleCount === 1 ? 'cycle' : 'cycles'}
            {cycleCount >= TARGET_CYCLES && (
              <span className="text-primary font-medium ml-1">— Goal progress recorded! 🎉</span>
            )}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-3">
        <Button
          onClick={() => setIsActive(!isActive)}
          size="lg"
          className="gap-2"
        >
          {isActive ? (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {cycleCount > 0 ? 'Resume' : 'Start'}
            </>
          )}
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium mb-2 text-foreground">How it works:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Find a comfortable position</li>
          <li>Follow the on-screen instructions</li>
          <li>Complete {TARGET_CYCLES} cycles to record goal progress</li>
          <li>Focus on the rhythm of your breath</li>
        </ul>
      </div>
    </div>
  );
}
