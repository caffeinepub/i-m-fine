import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useCouponCode() {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<string | null>({
    queryKey: ['couponCode'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCouponCode();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const saveMutation = useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCouponCode(code);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couponCode'] });
    },
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    saveMutation,
  };
}
