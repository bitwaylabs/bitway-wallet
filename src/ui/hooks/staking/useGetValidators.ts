import { useQuery } from 'react-query';

import services from '@/ui/services';

export function useGetValidators(restUrl: string, status = 'BOND_STATUS_BONDED', enabled = true) {
  const {
    data: validatorsData,
    refetch,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: ['stakingGetValidators', { status }],
    queryFn: () =>
      services.staking.getValidators(
        {
          status,
          'pagination.limit': '500'
        },
        { baseURL: restUrl }
      ),
    enabled
  });

  return {
    validators: validatorsData?.validators || [],
    isLoading,
    isSuccess,
    refetch
  };
}
