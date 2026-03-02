import { Trophy } from '../../backend';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { formatTimestamp } from '../../utils/time';

interface TrophyBadgeProps {
  trophy: Trophy;
  locked?: boolean;
  unlockHint?: string;
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

export default function TrophyBadge({ trophy, locked = false, unlockHint }: TrophyBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (trophy.discountCode) {
      navigator.clipboard.writeText(trophy.discountCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const badgeImageSrc = getBadgeImage(trophy.imageIdentifier);

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-200 text-center ${
        locked
          ? 'border-border/50 bg-muted/30 opacity-70'
          : 'border-primary/30 bg-card hover:border-primary/60 hover:shadow-md'
      }`}
    >
      {locked && (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-6 h-6 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            <Lock className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
      )}

      <CardContent className="pt-5 pb-5 flex flex-col items-center gap-3">
        <div className="relative">
          <img
            src={badgeImageSrc}
            alt={trophy.title}
            className={`w-20 h-20 object-contain transition-all duration-200 ${
              locked ? 'grayscale opacity-50' : 'drop-shadow-md'
            }`}
          />
          {!locked && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs">✓</span>
            </div>
          )}
        </div>

        <div className="space-y-1 w-full">
          <h3 className={`font-semibold text-sm leading-tight ${locked ? 'text-muted-foreground' : 'text-foreground'}`}>
            {trophy.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{trophy.description}</p>
        </div>

        {!locked && trophy.dateEarned && (
          <Badge variant="secondary" className="text-xs">
            Earned {formatTimestamp(trophy.dateEarned)}
          </Badge>
        )}

        {locked && unlockHint && (
          <p className="text-xs text-muted-foreground italic border-t border-border/50 pt-2 w-full">
            🔒 {unlockHint}
          </p>
        )}

        {!locked && trophy.discountPercentage && (
          <div className="w-full border-t border-border/50 pt-3 space-y-2">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs font-semibold text-primary">
                🎉 {Number(trophy.discountPercentage)}% Session Discount Unlocked!
              </span>
            </div>
            {trophy.discountCode && (
              <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
                <code className="text-xs font-mono text-primary flex-1 text-left truncate">
                  {trophy.discountCode}
                </code>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 shrink-0"
                  onClick={handleCopyCode}
                  title="Copy discount code"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
