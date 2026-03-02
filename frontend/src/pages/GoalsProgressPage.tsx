import { useGetUserGoals } from '../hooks/useGoals';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import GoalCard from '../components/goals/GoalCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Target, Flame, Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoalType } from '../backend';

export default function GoalsProgressPage() {
  const { identity } = useInternetIdentity();
  const { data: goals, isLoading, error } = useGetUserGoals();

  if (!identity) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Please log in to view your goals.</p>
      </div>
    );
  }

  const milestoneGoals = goals?.filter((g) => g.goalType === GoalType.milestone) ?? [];
  const streakGoals = goals?.filter((g) => g.goalType === GoalType.streak) ?? [];

  const completedMilestones = milestoneGoals.filter((g) => g.isCompleted).length;
  const completedStreaks = streakGoals.filter((g) => g.isCompleted).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold text-foreground font-display">Goals & Progress</h1>
        </div>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Track your therapy milestones and personal wellness streaks. Every step forward is a victory worth celebrating.
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => { window.location.hash = 'trophies'; }}
          >
            <Trophy className="h-3.5 w-3.5" />
            View My Trophies
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
          <p className="text-destructive text-sm">Failed to load goals. Please try again.</p>
        </div>
      )}

      {/* Therapy Milestones Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-secondary/30 flex items-center justify-center">
            <Target className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground font-display">Therapy Milestones</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading ? '...' : `${completedMilestones} of ${milestoneGoals.length} completed`}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : milestoneGoals.length === 0 ? (
          <div className="bg-card/60 border border-border rounded-xl p-8 text-center">
            <Target className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Your therapy milestones will appear here as Serenity builds your personalized plan.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Complete your intake session to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {milestoneGoals.map((goal) => (
              <GoalCard key={String(goal.id)} goal={goal} />
            ))}
          </div>
        )}
      </section>

      {/* Wellness Streaks Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground font-display">Wellness Streaks</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading ? '...' : `${completedStreaks} of ${streakGoals.length} completed`}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : streakGoals.length === 0 ? (
          <div className="bg-card/60 border border-border rounded-xl p-8 text-center">
            <Flame className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Your wellness streaks will appear here once your plan is active.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Log moods, journal entries, and use wellness tools to build streaks.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {streakGoals.map((goal) => (
              <GoalCard key={String(goal.id)} goal={goal} />
            ))}
          </div>
        )}
      </section>

      {/* Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-2 text-sm">💡 How Goals Work</h3>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li>• <strong className="text-foreground">Therapy Milestones</strong> track your progress through sessions with Serenity and group classes</li>
          <li>• <strong className="text-foreground">Wellness Streaks</strong> reward consistent daily habits like mood logging, journaling, and using wellness tools</li>
          <li>• Completing goals earns you <strong className="text-foreground">Trophy Badges</strong> that may unlock session discounts</li>
          <li>• Your goals are personalized by Serenity based on your therapy plan</li>
        </ul>
      </div>
    </div>
  );
}
