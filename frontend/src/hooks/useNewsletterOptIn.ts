import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useNewsletterOptIn() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (optIn: boolean) => {
      if (!actor) throw new Error('Actor not available');
      await actor.toggleNewsletterOptIn(optIn);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
