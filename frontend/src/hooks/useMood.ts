import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Mood, MoodEntry, GoalCategory } from '../backend';

export function useGetMoodHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<MoodEntry[]>({
    queryKey: ['moodHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMoodHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMood() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mood: Mood) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addMood(mood);
      // addMood already increments moodLog goals server-side,
      // but we also invalidate goals/trophies to refresh UI
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moodHistory'] });
      queryClient.invalidateQueries({ queryKey: ['userGoals'] });
      queryClient.invalidateQueries({ queryKey: ['userTrophies'] });
    },
  });
}
