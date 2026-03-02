import { useEffect, useState } from 'react';
import { X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trophy as TrophyType } from '../../backend';

interface TrophyEarnedToastProps {
  trophy: TrophyType;
  onDismiss: () => void;
}

const BADGE_IMAGE_MAP: Record<string, string> = {
  'trophy-badge-first-session': '/assets/generated/trophy-badge-first-session.dim_256x256.png',
  'trophy-badge-mood-streak': '/assets/generated/trophy-badge-mood-streak.dim_256x256.png',
  'trophy-badge-journal-streak': '/assets/generated/trophy-badge-journal-streak.dim_256x256.png',
  'trophy-badge-wellness-tools': '/assets/generated/trophy-badge-wellness-tools.dim_256x256.png',
  'trophy-badge-group-session': '/assets/generated/trophy-badge-group-session.dim_256x256.png',
  'trophy-badge-breathing-streak': '/assets/generated/trophy-badge-breathing-streak.dim_256x256.png',
};

function getBadgeImage(imageIdentifier: string): string {
  return BADGE_IMAGE_MAP[imageIdentifier] || '/assets/generated/trophy-badge-wellness-tools.dim_256x256.png';
}

export default function TrophyEarnedToast({ trophy, onDismiss }: TrophyEarnedToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setVisible(true), 50);
    // Auto-dismiss after 6 seconds
    const dismissTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] max-w-sm w-full transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-card border-2 border-primary/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-primary/10 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Trophy Earned! 🎉</span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={handleDismiss}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <div className="p-4 flex items-center gap-4">
          <img
            src={getBadgeImage(trophy.imageIdentifier)}
            alt={trophy.title}
            className="w-16 h-16 object-contain drop-shadow-md shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-foreground text-sm">{trophy.title}</h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Congratulations! You've earned this badge for your dedication to your wellness journey.
            </p>
            {trophy.discountPercentage && (
              <p className="text-xs text-primary font-semibold mt-1">
                🎁 {Number(trophy.discountPercentage)}% session discount unlocked!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
