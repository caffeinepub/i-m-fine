import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Trophy } from '../backend';

export function useGetUserTrophies() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Trophy[]>({
    queryKey: ['userTrophies'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getUserTrophies(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}
