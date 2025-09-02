import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import SearchInput from '@/ui/components/Input/Search';
import { Validator } from '@/ui/services/staking/types';
import { useAppDispatch } from '@/ui/state/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { useStakeState } from '@/ui/state/stake/hooks';
import { stakeActions } from '@/ui/state/stake/reducer';
import { getTruncate } from '@/ui/utils';
import { Stack } from '@mui/material';

import { ValidatorLogo } from './ValidatorLogo';

export default function ValidatorSelectScreen() {
  const dispatch = useAppDispatch();
  const [keywords, setKeywords] = useState('');
  const { state } = useLocation();
  const isLight = useIsLight();
  const { type, selectValidator } = state as { type: 'validator' | 'validatorDst'; selectValidator?: Validator };
  const { validatorList } = useStakeState();

  const filterValidators = useMemo(() => {
    return (validatorList || []).filter((item) => {
      return item.description?.moniker.toLocaleLowerCase().includes(keywords.toLocaleLowerCase());
    });
  }, [keywords, validatorList]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select validator"
      />
      <Content
        style={{
          padding: 0,
          marginTop: 16
        }}>
        <Column px="xl" gap="md">
          <SearchInput value={keywords} onChange={setKeywords} placeholder="Search validator" />
          {filterValidators?.map((item) => {
            return (
              <Stack
                key={item.description?.identity}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
                onClick={() => {
                  if (type === 'validator') {
                    dispatch(stakeActions.updateStakeState({ validator: item, amount: '' }));
                  } else {
                    dispatch(stakeActions.updateStakeState({ validatorDst: item, amount: '' }));
                  }
                  window.history.go(-1);
                }}
                sx={{
                  padding: '10px 16px',
                  cursor: 'pointer'
                }}>
                <Row>
                  <ValidatorLogo
                    sx={{
                      width: '38px',
                      height: '38px',
                      mr: '13px',
                      overflow: 'hidden'
                    }}
                    data={item.description?.identity}
                  />
                  <Column
                    style={{
                      gap: '0px'
                    }}>
                    <Text preset="regular" text={item.description?.moniker} color={isLight ? 'black' : 'white'}></Text>
                    <Text
                      preset="sub"
                      text={`${getTruncate(
                        new BigNumber(item?.commission?.commission_rates?.rate || '0').multipliedBy(100).toString(),
                        2
                      )}%`}></Text>
                  </Column>
                </Row>
              </Stack>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
