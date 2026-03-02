import { useGetUserTrophies } from '../hooks/useTrophies';
import { useGetUserGoals } from '../hooks/useGoals';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import TrophyBadge from '../components/trophies/TrophyBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trophy as TrophyType } from '../backend';

// Predefined trophy templates for locked display
const TROPHY_TEMPLATES: Omit<TrophyType, 'userId' | 'dateEarned' | 'discountCode'>[] = [
  {
    id: BigInt(1),
    title: 'First Session',
    description: 'Complete your first therapy session with Serenity',
    imageIdentifier: 'trophy-badge-first-session',
    discountPercentage: BigInt(10),
  },
  {
    id: BigInt(2),
    title: 'Mood Tracker',
    description: 'Log your mood consistently to build self-awareness',
    imageIdentifier: 'trophy-badge-mood-streak',
    discountPercentage: BigInt(5),
  },
  {
    id: BigInt(3),
    title: 'Journal Keeper',
    description: 'Maintain a journaling streak to process your thoughts',
    imageIdentifier: 'trophy-badge-journal-streak',
    discountPercentage: BigInt(5),
  },
  {
    id: BigInt(4),
    title: 'Wellness Champion',
    description: 'Use wellness tools regularly to build healthy habits',
    imageIdentifier: 'trophy-badge-wellness-tools',
    discountPercentage: BigInt(15),
  },
  {
    id: BigInt(5),
    title: 'Group Session Star',
    description: 'Attend group sessions to connect with the community',
    imageIdentifier: 'trophy-badge-group-session',
    discountPercentage: BigInt(10),
  },
  {
    id: BigInt(6),
    title: 'Breathing Master',
    description: 'Complete breathing exercises to manage stress and anxiety',
    imageIdentifier: 'trophy-badge-breathing-streak',
    discountPercentage: BigInt(5),
  },
];

const UNLOCK_HINTS: Record<string, string> = {
  'trophy-badge-first-session': 'Complete your first therapy session with Serenity',
  'trophy-badge-mood-streak': 'Log your mood daily to build a streak',
  'trophy-badge-journal-streak': 'Write journal entries consistently',
  'trophy-badge-wellness-tools': 'Use breathing, grounding, or reframing tools',
  'trophy-badge-group-session': 'Attend a group session on the calendar',
  'trophy-badge-breathing-streak': 'Complete breathing exercises regularly',
};

export default function TrophiesPage() {
  const { identity } = useInternetIdentity();
  const { data: earnedTrophies, isLoading: trophiesLoading } = useGetUserTrophies();
  const { isLoading: goalsLoading } = useGetUserGoals();

  const isLoading = trophiesLoading || goalsLoading;

  if (!identity) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Please log in to view your trophies.</p>
      </div>
    );
  }

  const earnedIds = new Set((earnedTrophies ?? []).map((t) => t.imageIdentifier));

  // Build locked templates (not yet earned)
  const lockedTemplates = TROPHY_TEMPLATES.filter((t) => !earnedIds.has(t.imageIdentifier));

  const totalEarned = earnedTrophies?.length ?? 0;
  const totalPossible = TROPHY_TEMPLATES.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold text-foreground font-display">My Trophies</h1>
        </div>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Celebrate your achievements on your healing journey. Each trophy represents real progress.
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => { window.location.hash = 'goals'; }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to Goals
          </Button>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {totalEarned} of {totalPossible} Trophies Earned
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Keep going — each trophy may unlock a session discount!
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary font-display">{totalEarned}</div>
          <div className="text-xs text-muted-foreground">badges</div>
        </div>
      </div>

      {/* Earned Trophies */}
      {isLoading ? (
        <div>
          <h2 className="text-xl font-bold text-foreground font-display mb-4">Earned Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-52 rounded-xl" />
            ))}
          </div>
        </div>
      ) : (earnedTrophies?.length ?? 0) > 0 ? (
        <section>
          <h2 className="text-xl font-bold text-foreground font-display mb-4 flex items-center gap-2">
            <span className="text-primary">✨</span> Earned Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {earnedTrophies!.map((trophy) => (
              <TrophyBadge key={String(trophy.id)} trophy={trophy} locked={false} />
            ))}
          </div>
        </section>
      ) : (
        <div className="bg-card/60 border border-border rounded-xl p-8 text-center">
          <Trophy className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm font-medium">No trophies earned yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Complete goals to earn your first badge!
          </p>
        </div>
      )}

      {/* Locked Trophies */}
      {!isLoading && lockedTemplates.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-foreground font-display mb-4 flex items-center gap-2">
            <span className="text-muted-foreground">🔒</span> Locked Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {lockedTemplates.map((template) => {
              const trophyAsEarned: TrophyType = {
                ...template,
                userId: identity.getPrincipal(),
                dateEarned: undefined,
                discountCode: undefined,
              };
              return (
                <TrophyBadge
                  key={String(template.id)}
                  trophy={trophyAsEarned}
                  locked={true}
                  unlockHint={UNLOCK_HINTS[template.imageIdentifier]}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Discount Info */}
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-2 text-sm">🎁 Trophy Discounts</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Many trophies unlock exclusive discount codes for therapy sessions. When you earn a trophy with a discount,
          the code will appear on the badge and be saved to your account. Use it at checkout when purchasing a session plan.
        </p>
      </div>
    </div>
  );
}
