import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetLoanById({ loanId }: { loanId: string }) {
  const { bitwayChain } = useEnvironment();
  const { data } = useQuery({
    queryKey: ['getLoanById', { loanId, bitwayChain }],
    queryFn: async () => {
      return services.lending.getLoanById(loanId, { baseURL: bitwayChain.restUrl });
    }
  });

  return {
    loan: data
  };
}
