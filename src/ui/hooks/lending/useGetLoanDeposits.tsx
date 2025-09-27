import { useQuery } from 'react-query';

import services from '@/ui/services';
import { Loan } from '@/ui/services/lending/types';
import { useEnvironment } from '@/ui/state/environment/hooks';

export default function useGetLoanDeposits(loan?: Loan) {
  const { bitwayChain } = useEnvironment();

  const { data: loanDeposits } = useQuery({
    queryKey: ['getLoanDeposits', { loan_id: loan?.vault_address, loan_status: loan?.status }],
    queryFn: async () => {
      return services.lending.getLoanDeposits(loan!.vault_address, { baseURL: bitwayChain.restUrl });
    },
    refetchIntervalInBackground: true,
    refetchInterval: 6000,
    enabled: !!loan && (loan?.status === 'Requested' || loan?.status === 'Cancelled' || loan?.status === 'Rejected'),
    refetchOnMount: true,
    staleTime: 0
  });

  return {
    loanDeposits
  };
}
