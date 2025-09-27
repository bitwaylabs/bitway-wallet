import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetPoolDataById({ poolId }: { poolId?: string }) {
  const { bitwayChain } = useEnvironment();
  const { data: lendingPool, isLoading: loading } = useQuery({
    queryKey: ['getLendingPoolsData', { poolId, bitwayChain }],
    queryFn: async () => {
      return services.lending.getLeadingPoolById(poolId!, { baseURL: bitwayChain.restUrl });
    },
    enabled: !!poolId
  });

  return {
    data: lendingPool,
    loading
  };
}
