import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ProductSuggestion } from '../backend';

export function useSubmitProductSuggestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (suggestion: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitProductSuggestion(suggestion);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productSuggestions'] });
    },
  });
}

export function useListProductSuggestions() {
  const { actor, isFetching } = useActor();

  return useQuery<ProductSuggestion[]>({
    queryKey: ['productSuggestions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.listProductSuggestions();
    },
    enabled: !!actor && !isFetching,
  });
}
