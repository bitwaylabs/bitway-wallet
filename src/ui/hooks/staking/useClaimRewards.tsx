import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { CHAINS_ENUM } from '@/shared/constant';
import { useNavigate } from '@/ui/pages/MainRoute';
import { IGetRewardsData } from '@/ui/services/staking/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';

export function useClaimRewards({
  rewards,
  validatorAddress
}: {
  rewards: IGetRewardsData['rewards'];
  validatorAddress?: string;
}) {
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const claim = async () => {
    setLoading(true);

    let msgs = rewards.map((item) => {
      return {
        typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
        value: {
          delegatorAddress: currentAccount?.address,
          validatorAddress: item.validator_address
        }
      };
    });

    if (validatorAddress?.trim() != '') {
      const _msg = msgs.find((item) => item.value.validatorAddress == validatorAddress);
      if (_msg) {
        msgs = [_msg];
      }
    }

    try {
      const result = await signAndBroadcastTxRaw({
        messages: msgs,
        memo: ''
      });

      navigate('TxSuccessScreen', {
        txid: result.tx_response.txhash,
        chain: CHAINS_ENUM.BITWAY,
        title: 'Rewards Claimed!'
      });
      setTimeout(() => {
        queryClient.invalidateQueries('stakingGetRewards');
      }, 1000);
      setOpen(false);
    } catch (err) {
      const errorString = err instanceof Error ? err.message : typeof err == 'string' ? err : '';

      navigate('TxFailScreen', { error: errorString });
    } finally {
      setLoading(false);
    }
  };

  return {
    claim,
    loading,
    open,
    setOpen
  };
}
