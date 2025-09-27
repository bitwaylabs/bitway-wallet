import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLendingParams() {
  const { bitwayChain } = useEnvironment();
  const { data } = useQuery({
    queryKey: ['getLendingParams', { bitwayChain }],
    queryFn: async () => {
      return services.lending.getLeadingParams({ baseURL: bitwayChain.restUrl });
    }
  });

  return {
    data
  };
}
