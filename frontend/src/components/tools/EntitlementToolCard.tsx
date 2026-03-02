import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle2, Clock } from 'lucide-react';
import { type PlanLevel } from '../../utils/plan';

interface EntitlementToolCardProps {
  title: string;
  description: string;
  requiredPlan: PlanLevel;
  userPlanLevel: PlanLevel;
  isImplemented: boolean;
  children?: React.ReactNode;
}

const PLAN_HIERARCHY: Record<PlanLevel, number> = {
  free: 0,
  basic: 1,
  premier: 2,
};

export default function EntitlementToolCard({
  title,
  description,
  requiredPlan,
  userPlanLevel,
  isImplemented,
  children,
}: EntitlementToolCardProps) {
  const hasAccess = PLAN_HIERARCHY[userPlanLevel] >= PLAN_HIERARCHY[requiredPlan];
  const isLocked = !hasAccess;
  const isComingSoon = hasAccess && !isImplemented;

  return (
    <Card className={isLocked ? 'opacity-60' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {title}
              {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
              {hasAccess && isImplemented && <CheckCircle2 className="h-4 w-4 text-primary" />}
              {isComingSoon && <Clock className="h-4 w-4 text-muted-foreground" />}
            </CardTitle>
            <CardDescription className="mt-1.5">{description}</CardDescription>
          </div>
          <div>
            {isLocked && (
              <Badge variant="outline" className="capitalize">
                {requiredPlan} Plan
              </Badge>
            )}
            {isComingSoon && (
              <Badge variant="secondary">Coming Soon</Badge>
            )}
            {hasAccess && isImplemented && (
              <Badge className="bg-primary/10 text-primary border-primary">Available</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      {hasAccess && isImplemented && children && (
        <CardContent>{children}</CardContent>
      )}
      {isLocked && (
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Upgrade to {requiredPlan} plan to unlock this feature.
          </p>
        </CardContent>
      )}
      {isComingSoon && (
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This feature is coming soon and will be available with your {userPlanLevel} plan.
          </p>
        </CardContent>
      )}
    </Card>
  );
}
