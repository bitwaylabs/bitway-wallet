import BigNumber from 'bignumber.js';

import { Button, Column, Image, LightTooltip, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { useStaking } from '@/ui/hooks/staking';
import { Validator } from '@/ui/services/staking/types';
import { useAppDispatch } from '@/ui/state/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { stakeActions } from '@/ui/state/stake/reducer';
import { colors } from '@/ui/theme/colors';
import { getTruncate } from '@/ui/utils';
import { Stack, Typography } from '@mui/material';

import ValidatorSelect from './ValidatorSelect';

export default function Index({
  activeValidators,
  inactiveValidators
}: {
  activeValidators: Validator[];
  inactiveValidators: Validator[];
}) {
  const { delegateToken, amount, validator, yourDelegation, handleUnDelegate, loading } = useStaking();
  const dispatch = useAppDispatch();
  const isLight = useIsLight();

  const data = [
    {
      label: 'Unstake Period',
      value: '21 days',
      tips: 'After initiating an unstake, there is a mandatory waiting period before the tokens become liquid and transferable.'
    }
  ];

  return (
    <>
      <ValidatorSelect
        validatorList={[...activeValidators, ...inactiveValidators]}
        selectValidator={validator}
        type="validator"
      />

      <Row full justifyBetween itemsCenter>
        <Row itemsCenter>
          <Text color="white" size="xs">
            Token
          </Text>
          {+amount ? (
            <Text
              style={{
                maxWidth: '90px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                textAlign: 'right'
              }}
              size="xs"
              color="white_muted">
              ~$
              {getTruncate(
                new BigNumber(delegateToken?.denomPrice || '0')
                  .multipliedBy(amount || 0)
                  .toFixed(2, BigNumber.ROUND_DOWN),
                2
              )}
            </Text>
          ) : null}
        </Row>

        <Row itemsCenter gap="sm">
          <Text
            text={`Current Stake: ${getTruncate(yourDelegation, delegateToken?.asset.precision || 8)}`}
            color="white_muted"
            size="xs"></Text>
        </Row>
      </Row>

      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        sx={{
          bgcolor: isLight ? colors.light_bg : colors.dark_bg,
          border: `1px solid ${isLight ? colors.light_border : colors.dark_border}`,
          borderRadius: '10px',
          marginTop: '-8px',
          p: '8px 10px',
          transition: '.4s',
          ':hover': {
            border: `1px solid ${isLight ? colors.black : colors.white}`
          }
        }}>
        <CoinInput
          size={22}
          coin={{
            amount: amount,
            denom: ''
          }}
          decimalScale={delegateToken?.asset.precision}
          max={yourDelegation || '0'}
          onChange={(value) => {
            dispatch(stakeActions.updateStakeState({ amount: value }));
          }}
        />
        <Row
          itemsCenter
          gap="md"
          style={{
            flexShrink: 0
          }}>
          <Typography
            sx={{
              color: colors.grey12,
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: '.4s',
              ':hover': {
                color: isLight ? colors.black : colors.white
              }
            }}
            onClick={() => {
              if (!delegateToken?.formatAmount) {
                return;
              }
              dispatch(stakeActions.updateStakeState({ amount: yourDelegation || '0' }));
            }}>
            Max
          </Typography>
          <Image src={delegateToken?.asset.logo} height={28} width={28}></Image>
          <Text text={delegateToken?.asset.symbol} color={isLight ? 'black' : 'white'} size="md"></Text>
        </Row>
      </Stack>
      <Column
        style={{ backgroundColor: isLight ? colors.light_bg : colors.dark_bg, padding: '8px', borderRadius: '10px' }}>
        {data.map((item) => (
          <Stack direction="row" justifyContent="space-between" alignItems="center" key={item.label}>
            <LightTooltip title={item.tips} placement="top" arrow>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: colors.grey12,
                  textDecoration: 'dotted underline',
                  textUnderlineOffset: '2px',
                  cursor: 'pointer',
                  transition: '.4s',
                  ':hover': {
                    color: isLight ? colors.black : colors.white
                  }
                }}>
                {item.label}
              </Typography>
            </LightTooltip>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                fontSize: '12px',
                color: isLight ? colors.black : colors.white
              }}>
              {item.value}
            </Stack>
          </Stack>
        ))}
      </Column>
      <Row>
        <Button
          onClick={() => {
            handleUnDelegate();
          }}
          loading={loading}
          disabled={!+amount || !validator}
          preset="primary"
          text="Undelegate"
          full
        />
      </Row>
    </>
  );
}
