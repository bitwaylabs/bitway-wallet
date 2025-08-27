import BigNumber from 'bignumber.js';

import { Button, Image, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { useStaking } from '@/ui/hooks/staking';
import { Validator } from '@/ui/services/staking/types';
import { useAppDispatch } from '@/ui/state/hooks';
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
  const dispatch = useAppDispatch();
  const {
    delegateToken,
    amount,
    validator,
    validatorDst,
    yourDelegation,
    yourDelegationDst,
    handleReDelegate,
    loading
  } = useStaking();

  return (
    <>
      <Row full justifyBetween itemsCenter>
        <Row itemsCenter>
          <Text color="white" size="xs">
            From
          </Text>
        </Row>

        <Row itemsCenter gap="sm">
          <Text
            text={`Current Stake: ${getTruncate(yourDelegation, delegateToken?.asset.precision || 8)}`}
            color="white_muted"
            size="xs"></Text>
        </Row>
      </Row>
      <Row full style={{ marginTop: '-8px' }}>
        <ValidatorSelect
          validatorList={[...activeValidators, ...inactiveValidators]}
          selectValidator={validator}
          type="validator"
        />
      </Row>
      <Row full justifyBetween itemsCenter>
        <Row itemsCenter>
          <Text color="white" size="xs">
            To
          </Text>
        </Row>

        <Row itemsCenter gap="sm">
          <Text
            text={`Current Stake: ${getTruncate(yourDelegationDst, delegateToken?.asset.precision || 8)}`}
            color="white_muted"
            size="xs"></Text>
        </Row>
      </Row>
      <Row full style={{ marginTop: '-8px' }}>
        <ValidatorSelect validatorList={activeValidators} type="validatorDst" selectValidator={validatorDst} />
      </Row>
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
      </Row>
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        sx={{
          bgcolor: colors.card_bgColor,
          border: `1px solid ${colors.white20}`,
          borderRadius: '10px',
          marginTop: '-8px',
          p: '8px 10px',
          transition: '.4s',
          ':hover': {
            border: `1px solid ${colors.white_4}`
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
                color: colors.white
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
          <Text text={delegateToken?.asset.symbol} color="white" size="md"></Text>
        </Row>
      </Stack>
      <Row>
        <Button
          onClick={() => {
            handleReDelegate();
          }}
          loading={loading}
          disabled={!+amount || !validator || !validatorDst}
          preset="primary"
          text="Redelegate"
          full
        />
      </Row>
    </>
  );
}
