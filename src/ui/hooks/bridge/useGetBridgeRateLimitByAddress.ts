import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetBridgeRateLimitByAddress() {
  const currentAccount = useCurrentAccount();
  const { bitwayChain } = useEnvironment();
  const { data, isLoading } = useQuery({
    queryKey: ['getBridgeRateLimitByAddress', { address: currentAccount.address }],
    queryFn: async () => {
      return services.bridge.getRateLimitByAddress(currentAccount.address, bitwayChain.restUrl);
    }
  });

  return {
    data,
    loading: isLoading
  };
}
