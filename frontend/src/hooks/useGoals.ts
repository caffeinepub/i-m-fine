import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Goal, GoalType, GoalCategory } from '../backend';

export function useGetUserGoals() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Goal[]>({
    queryKey: ['userGoals'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getUserGoals(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useCreateGoal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      goalType,
      category,
      targetValue,
      trophyId,
    }: {
      title: string;
      description: string;
      goalType: GoalType;
      category: GoalCategory;
      targetValue: bigint;
      trophyId: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createGoal(title, description, goalType, category, targetValue, trophyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGoals'] });
    },
  });
}

export function useUpdateGoalProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ goalId, progress }: { goalId: bigint; progress: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGoalProgress(goalId, progress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGoals'] });
      queryClient.invalidateQueries({ queryKey: ['userTrophies'] });
    },
  });
}

export function useRecordToolUsage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (toolCategory: GoalCategory) => {
      if (!actor) throw new Error('Actor not available');
      return actor.recordToolUsage(toolCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGoals'] });
      queryClient.invalidateQueries({ queryKey: ['userTrophies'] });
    },
  });
}
