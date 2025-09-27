import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export function useGetBitcoinConfirms(tx: string, disabled?: boolean) {
  const { BITWAY_BTC_EXPLORER } = useEnvironment();
  const { data: btcTxInfo } = useQuery({
    queryKey: ['getBtcBridgeTx', { tx }],
    queryFn: () => {
      return services.bridge.getTx(tx, BITWAY_BTC_EXPLORER);
    },
    enabled: !!tx,
    refetchInterval: 60000,
    refetchIntervalInBackground: true
  });

  const { data: btcBlockHeight } = useQuery({
    queryKey: ['getBtcBlockHeight'],
    queryFn: () => {
      return services.bridge.getBlockHeight(BITWAY_BTC_EXPLORER);
    },
    enabled: !disabled && !!btcTxInfo?.status.confirmed,
    refetchInterval: 60000,
    refetchIntervalInBackground: true
  });

  return {
    confirms: btcTxInfo?.status.confirmed && btcBlockHeight ? btcBlockHeight - btcTxInfo.status.block_height + 1 : 0
  };
}
