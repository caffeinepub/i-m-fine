import { Goal, GoalType } from '../../backend';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Target, Flame, Trophy } from 'lucide-react';
import { formatTimestamp } from '../../utils/time';

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const current = Number(goal.currentProgress);
  const target = Number(goal.targetValue);
  const progressPercent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  const isStreak = goal.goalType === GoalType.streak;

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-200 ${
        goal.isCompleted
          ? 'border-primary/50 bg-primary/5'
          : 'border-border bg-card hover:border-primary/30'
      }`}
    >
      {goal.isCompleted && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-2 right-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
        </div>
      )}

      <CardContent className="pt-5 pb-5">
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              goal.isCompleted
                ? 'bg-primary/20 text-primary'
                : isStreak
                ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                : 'bg-secondary/30 text-secondary-foreground'
            }`}
          >
            {goal.isCompleted ? (
              <Trophy className="h-5 w-5" />
            ) : isStreak ? (
              <Flame className="h-5 w-5" />
            ) : (
              <Target className="h-5 w-5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-sm leading-tight">{goal.title}</h3>
              {goal.isCompleted && (
                <Badge variant="default" className="text-xs shrink-0">
                  Completed
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{goal.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {current} / {target}
              {isStreak ? ' days' : ''}
            </span>
          </div>
          <Progress
            value={progressPercent}
            className="h-2"
          />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{progressPercent}% complete</span>
            {goal.isCompleted && goal.completionTimestamp && (
              <span className="text-primary font-medium">
                Earned {formatTimestamp(goal.completionTimestamp)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
