import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { CHAINS_ENUM } from '@/shared/constant';
import { useGetBitwayBalanceList } from '@/ui/hooks/useGetBitwayBalanceList';
import services from '@/ui/services';
import { Validator } from '@/ui/services/staking/types';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { formatUnitAmount, parseUnitAmount } from '@/ui/utils';

import { useNavigate } from '../../pages/MainRoute';

export function useStaking() {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { sideChain } = useEnvironment();
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState<Validator | null>(null);
  const [validatorDst, setValidatorDst] = useState<Validator | null>(null);
  const { balanceList } = useGetBitwayBalanceList(currentAccount?.address);

  const delegateToken = balanceList.find((item) => item.denom === sideChain?.denom);
  const balanceView = delegateToken?.formatAmount || '0';

  const { data: delegationInfo } = useQuery({
    queryKey: [
      'stakingGetValidatorByAddress',
      {
        validatorAddress: validator?.operator_address,
        delegatorAddress: currentAccount?.address
      }
    ],
    queryFn: () => {
      if (!validator?.operator_address || !currentAccount?.address) return;
      return services.staking.getValidatorByDelegation(
        {
          validatorAddress: validator?.operator_address,
          delegatorAddress: currentAccount?.address
        },
        {
          baseURL: sideChain?.restUrl
        }
      );
    },
    enabled: !!validator?.operator_address
  });

  const { data: delegationInfoDst } = useQuery({
    queryKey: [
      'stakingGetValidatorDstByAddress',
      {
        validatorAddress: validatorDst?.operator_address,
        delegatorAddress: currentAccount?.address
      }
    ],
    queryFn: () => {
      if (!validatorDst?.operator_address || !currentAccount?.address) return;
      return services.staking.getValidatorByDelegation(
        {
          validatorAddress: validatorDst?.operator_address,
          delegatorAddress: currentAccount?.address
        },
        {
          baseURL: sideChain?.restUrl
        }
      );
    },
    enabled: !!validatorDst?.operator_address
  });

  const handleDelegate = async () => {
    if (!currentAccount?.address || !validator) return;
    const msg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: {
        delegatorAddress: currentAccount?.address,
        validatorAddress: validator.operator_address,
        amount: {
          amount: parseUnitAmount(amount, 6),
          denom: sideChain?.denom
        }
      }
    };
    handleSend(msg, 'Delegated!');
  };

  const handleUnDelegate = async () => {
    if (!currentAccount?.address || !validator) return;
    const msg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
      value: {
        delegatorAddress: currentAccount?.address,
        validatorAddress: validator.operator_address,
        amount: {
          amount: parseUnitAmount(amount, 6),
          denom: sideChain?.denom
        }
      }
    };
    handleSend(msg, 'Undelegated!');
  };

  const handleReDelegate = async () => {
    if (!currentAccount?.address || !validator || !validatorDst) return;
    const msg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
      value: {
        delegatorAddress: currentAccount?.address,
        validatorSrcAddress: validator.operator_address,
        validatorDstAddress: validatorDst.operator_address,
        amount: {
          amount: parseUnitAmount(amount, 6),
          denom: sideChain?.denom
        }
      }
    };
    handleSend(msg, 'Redelegated!');
  };

  async function handleSend(msg: any, successtext: string) {
    setLoading(true);
    try {
      const result = await signAndBroadcastTxRaw({
        messages: [msg],
        memo: ''
      });
      let hashResponse: GetTxByHashResponse | null = null;
      while (!hashResponse) {
        try {
          hashResponse = await services.tx.getTxByHash(result.tx_response.txhash, {
            baseURL: sideChain?.restUrl
          });
        } catch (err) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
      if (hashResponse.tx_response.code === 0) {
        setTimeout(() => {
          queryClient.invalidateQueries('stakingGetValidatorByOverview');
          queryClient.invalidateQueries('stakingGetValidatorBy');
          queryClient.invalidateQueries('stakingGetRewards');
          queryClient.invalidateQueries('stakingGetDelegations');
          queryClient.invalidateQueries('stakingGetValidators');
          queryClient.invalidateQueries('stakingGetValidatorByAddress');
          queryClient.invalidateQueries('stakingGetValidatorDstByAddress');
        }, 2000);
        navigate('TxSuccessScreen', {
          txid: result.tx_response.txhash,
          chain: CHAINS_ENUM.BITWAY,
          title: successtext
        });
      }
    } catch (err) {
      const errorString = err instanceof Error ? err.message : typeof err == 'string' ? err : '';

      navigate('TxFailScreen', { error: errorString });
    } finally {
      setLoading(false);
    }
  }

  const yourDelegation = formatUnitAmount(delegationInfo?.delegation_response.balance.amount || '0', 6);
  const yourDelegationDst = formatUnitAmount(delegationInfoDst?.delegation_response.balance.amount || '0', 6);

  return {
    delegateToken,
    amount,
    setAmount,
    validator,
    setValidator,
    validatorDst,
    setValidatorDst,
    balanceView,
    yourDelegation,
    yourDelegationDst,
    handleDelegate,
    handleUnDelegate,
    handleReDelegate,
    loading
  };
}
