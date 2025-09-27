import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export default function useGetAttestationByEventId({ eventId }: { eventId?: string }) {
  const { bitwayChain } = useEnvironment();
  const { data } = useQuery({
    queryKey: ['getAttestationByEventId', eventId],
    queryFn: async () => {
      return services.lending.getDlcAttestationById(eventId!, { baseURL: bitwayChain.restUrl });
    },
    enabled: !!eventId
  });

  return {
    attestation: data
  };
}
