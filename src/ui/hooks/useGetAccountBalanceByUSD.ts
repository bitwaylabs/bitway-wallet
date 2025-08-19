import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { useCurrentAccount } from '../state/accounts/hooks';
import useGetBitcoinBalanceList from './useGetBitcoinBalanceList';
import { useGetBitwayBalanceList } from './useGetBitwayBalanceList';

export default function useGetAccountBalanceByUSD() {
  const currentAccount = useCurrentAccount();
  const { balanceList: bitwayBalanceList } = useGetBitwayBalanceList(currentAccount.address);
  const { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount.address);

  return useMemo(() => {
    const initValueSide = new BigNumber(0);
    const initValueBtc = new BigNumber(0);
    const sideTotalValue = bitwayBalanceList.reduce((pre, cur) => {
      return pre.plus(cur.totalValue);
    }, initValueSide);
    const btcTotalValue = btcBalanceList.reduce((pre, cur) => {
      return pre.plus(cur.totalValue);
    }, initValueBtc);
    const totalValue = sideTotalValue.plus(btcTotalValue);

    return totalValue.toFixed(2);
  }, [bitwayBalanceList, btcBalanceList]);
}
