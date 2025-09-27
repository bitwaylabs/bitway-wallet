import { useQuery } from 'react-query';

import { IPoolItem } from '@/ui/services/dex/type';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { SwapActions } from '@/ui/state/swap/reducer';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import { useGetBitwayBalanceList } from '../useGetBitwayBalanceList';
import { useGetAllPairs } from './useGetAllPairs';

export function useGetAllPools() {
  const { bitwayChain } = useEnvironment();
  const currentAccount = useCurrentAccount();
  const { balanceList } = useGetBitwayBalanceList(currentAccount?.address);
  const { data: pairs } = useGetAllPairs();
  const dispatch = useAppDispatch();

  const { data, isLoading: loading } = useQuery({
    queryKey: ['getAllPools', { bitwayChain }],
    enabled: !!pairs.length,
    queryFn: async () => {
      // debugger;
      if (!currentAccount?.address) return;
      // debugger;
      const cosmWasmClient = await CosmWasmClient.connect(bitwayChain.restUrl);

      // debugger;
      const pools = await Promise.all(
        pairs.map(async (p) => {
          const address = p.contract_addr;
          const msg = {
            pool: {}
          };
          const pool = await cosmWasmClient.queryContractSmart(address, msg);
          const assetsMeta = pool.assets.map((a: any) => {
            return balanceList.find((item) => item.denom === a.info.native_token.denom);
          });

          // debugger;
          return {
            ...pool,
            contract_addr: address,
            pair: p,
            assetsMeta: assetsMeta?.reduce((pre: any, cur: any) => {
              return {
                ...pre,
                [cur.base]: cur
              };
            }, {})
          };
        })
      );

      dispatch(SwapActions.update({ allPools: pools }));

      return pools as IPoolItem[];
    }
  });

  return {
    data: (data || []).filter((item) => !!item.total_share),
    loading
  };
}
