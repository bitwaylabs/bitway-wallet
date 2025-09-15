import { useEffect } from 'react';
import 'swiper/css';

import { ButtonGroupV2, Column, Content, Header, Layout } from '@/ui/components';
import { useGetValidators } from '@/ui/hooks/staking';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { useStakeState } from '@/ui/state/stake/hooks';
import { OperateType, buttonList, stakeActions } from '@/ui/state/stake/reducer';
import { colors } from '@/ui/theme/colors';

import Claim from './Claim';
import Delegate from './Delegate';
import Redelegate from './Redelegate';
import Undelegate from './Undelegate';

export default function StakeScreen() {
  const dispatch = useAppDispatch();
  const { validator, operateType } = useStakeState();
  const { sideChain } = useEnvironment();
  const isLight = useIsLight();

  const { validators: bondedValidators } = useGetValidators(sideChain?.restUrl, 'BOND_STATUS_BONDED');
  const { validators: unBondingValidators } = useGetValidators(sideChain?.restUrl, 'BOND_STATUS_UNBONDING');
  const { validators: unBondedValidators } = useGetValidators(sideChain?.restUrl, 'BOND_STATUS_UNBONDED');

  useEffect(() => {
    if (!validator && bondedValidators.length > 0) {
      const pingPubValidator = bondedValidators.find((item) =>
        item.description?.moniker.toLocaleLowerCase().includes('ping')
      );
      const f2poolValidator = bondedValidators.find((item) =>
        item.description?.moniker.toLocaleLowerCase().includes('f2pool')
      );
      if (pingPubValidator) {
        dispatch(stakeActions.updateStakeState({ validator: pingPubValidator }));
      } else if (f2poolValidator) {
        dispatch(stakeActions.updateStakeState({ validator: f2poolValidator }));
      } else {
        dispatch(stakeActions.updateStakeState({ validator: bondedValidators[0] }));
      }
    }
  }, [bondedValidators]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title={'Stake'}
      />
      <Content
        mt="lg"
        classname="fadeIn-page"
        style={{
          padding: '0 16px 70px'
        }}>
        <Column gap="lg" py="md">
          <ButtonGroupV2
            list={buttonList}
            value={operateType}
            size="small"
            onChange={(value) => {
              dispatch(stakeActions.updateStakeState({ operateType: value as OperateType, amount: '' }));
            }}
            rowProps={{
              style: {
                width: '100%',
                backgroundColor: isLight ? colors.white : colors.black,
                borderRadius: '10px'
              }
            }}
          />
          {operateType === OperateType.delegate ? (
            <Delegate activeValidators={bondedValidators} />
          ) : operateType === OperateType.undelegate ? (
            <Undelegate
              activeValidators={bondedValidators}
              inactiveValidators={[...unBondingValidators, ...unBondedValidators]}
            />
          ) : operateType === OperateType.redelegate ? (
            <Redelegate
              activeValidators={bondedValidators}
              inactiveValidators={[...unBondingValidators, ...unBondedValidators]}
            />
          ) : operateType === OperateType.claim ? (
            <Claim />
          ) : null}
        </Column>
      </Content>
    </Layout>
  );
}
