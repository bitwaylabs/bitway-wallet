import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetDlcEventById(id?: string) {
  const { bitwayChain } = useEnvironment();
  const { data: dlcEvent, isLoading: loading } = useQuery({
    queryKey: ['getDlcEventById', { id, bitwayChain }],
    queryFn: async () => {
      return services.lending.getDlcEventById(id!, { baseURL: bitwayChain.restUrl });
    },
    enabled: !!id,
    refetchIntervalInBackground: true
  });

  return {
    loading,
    dlcEvent
  };
}
