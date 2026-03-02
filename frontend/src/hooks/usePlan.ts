import { useGetCallerUserProfile } from './useCurrentUserProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PlanOption } from '../backend';
import { getPlanLevel, isPaidPlan, type PlanLevel } from '../utils/plan';
import { isExpired } from '../utils/time';

interface UsePlanReturn {
  selectedPlan: PlanOption | null;
  effectivePlanLevel: PlanLevel;
  isExpired: boolean;
  isLoading: boolean;
  selectPlan: (plan: PlanOption) => Promise<void>;
  recordPayment: (plan: PlanOption) => Promise<void>;
  isPaidPlan: (plan: PlanOption) => boolean;
}

export function usePlan(): UsePlanReturn {
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { actor } = useActor();
  const queryClient = useQueryClient();

  // Distinguish between "still loading" and "loaded but null"
  const selectedPlan = userProfile?.selectedPlan || null;
  const planExpired = isExpired(userProfile?.planExpirationTimestamp);

  // Compute effective plan level based on expiration
  const effectivePlanLevel: PlanLevel = 
    selectedPlan && !planExpired 
      ? getPlanLevel(selectedPlan) 
      : 'free';

  const selectPlanMutation = useMutation({
    mutationFn: async (plan: PlanOption) => {
      if (!actor) throw new Error('Actor not available');
      await actor.selectPlan(plan);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });

  const recordPaymentMutation = useMutation({
    mutationFn: async (plan: PlanOption) => {
      if (!actor) throw new Error('Actor not available');
      await actor.recordPayment(plan);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });

  return {
    selectedPlan,
    effectivePlanLevel,
    isExpired: planExpired,
    isLoading: profileLoading,
    selectPlan: selectPlanMutation.mutateAsync,
    recordPayment: recordPaymentMutation.mutateAsync,
    isPaidPlan,
  };
}
