import { useState } from 'react';
import 'swiper/css';

import { ButtonGroupV2, Column, Content, Header, Layout } from '@/ui/components';
import { useGetValidators } from '@/ui/hooks/staking';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { colors } from '@/ui/theme/colors';

import Claim from './Claim';
import Delegate from './Delegate';
import Redelegate from './Redelegate';
import Undelegate from './Undelegate';

enum OperateType {
  delegate = 'delegate',
  undelegate = 'undelegate',
  redelegate = 'redelegate',
  claim = 'claim'
}

const buttonList = [
  {
    label: 'Delegate',
    key: OperateType.delegate
  },
  {
    label: 'Undelegate',
    key: OperateType.undelegate
  },
  {
    label: 'Redelegate',
    key: OperateType.redelegate
  },
  {
    label: 'Claim',
    key: OperateType.claim
  }
];

export default function StakeScreen() {
  const { sideChain } = useEnvironment();
  const [curTab, setCurTab] = useState<string>(OperateType.delegate);

  const { validators: bondedValidators } = useGetValidators(sideChain?.restUrl, 'BOND_STATUS_BONDED');
  const { validators: unBondingValidators } = useGetValidators(sideChain?.restUrl, 'BOND_STATUS_UNBONDING');
  const { validators: unBondedValidators } = useGetValidators(sideChain?.restUrl, 'BOND_STATUS_UNBONDED');

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
            value={curTab}
            size="small"
            onChange={(value) => {
              setCurTab(value as string);
            }}
            rowProps={{
              style: {
                width: '100%',
                backgroundColor: colors.card_bgColor,
                borderRadius: '10px'
              }
            }}
          />
          {curTab === OperateType.delegate ? (
            <Delegate activeValidators={bondedValidators} />
          ) : curTab === OperateType.undelegate ? (
            <Undelegate
              activeValidators={bondedValidators}
              inactiveValidators={[...unBondingValidators, ...unBondedValidators]}
            />
          ) : curTab === OperateType.redelegate ? (
            <Redelegate
              activeValidators={bondedValidators}
              inactiveValidators={[...unBondingValidators, ...unBondedValidators]}
            />
          ) : curTab === OperateType.claim ? (
            <Claim />
          ) : null}
        </Column>
      </Content>
    </Layout>
  );
}
