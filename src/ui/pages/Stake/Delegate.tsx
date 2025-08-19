import BigNumber from 'bignumber.js';
import { useEffect } from 'react';

import { Button, Column, Icon, Image, LightTooltip, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { useStaking } from '@/ui/hooks/staking';
import { Validator } from '@/ui/services/staking/types';
import { colors } from '@/ui/theme/colors';
import { getTruncate } from '@/ui/utils';
import { Box, Stack, Typography } from '@mui/material';

import ValidatorSelect from './ValidatorSelect';

export default function Index({ activeValidators }: { activeValidators: Validator[] }) {
  const { delegateToken, amount, setAmount, validator, setValidator, handleDelegate, loading } = useStaking();

  useEffect(() => {
    setValidator(activeValidators[0]);
  }, [activeValidators]);

  const data = [
    // {
    //   label: "Staking APY",
    //   value: "-",
    //   tips: "",
    // },
    {
      label: 'Validator Commission',
      value: `${getTruncate(
        new BigNumber(validator?.commission?.commission_rates?.rate || '0').multipliedBy(100).toString(),
        2
      )}%`,
      tips: 'The percentage fee that the validator deducts from staking rewards before distributing the remainder to delegators'
    },
    // {
    //   label: "Effective APY",
    //   value: "-",
    //   tips: "",
    // },
    // {
    //   label: "Expected Annual Rewards",
    //   value: "-",
    //   tips: "",
    // },
    {
      label: 'Unstake Period',
      value: '21 days',
      tips: 'After initiating an unstake, there is a mandatory waiting period before the tokens become liquid and transferable.'
    }
  ];

  return (
    <>
      <ValidatorSelect
        validatorList={activeValidators}
        onChangeValidator={(_validator) => {
          setValidator(_validator);
          setAmount('');
        }}
        selectValidator={validator}
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
          <Icon color="white_muted" icon="wallet-icon" size={12} />
          <Text
            text={getTruncate(delegateToken?.formatAmount || '0', delegateToken?.asset.precision || 8)}
            color="white_muted"
            size="xs"></Text>
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
          max={delegateToken?.formatAmount || '0'}
          onChange={(value) => {
            setAmount(value);
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
              setAmount(delegateToken.formatAmount);
            }}>
            Max
          </Typography>
          <Image src={delegateToken?.asset.logo} height={28} width={28}></Image>
          <Text text={delegateToken?.asset.symbol} color="white" size="md"></Text>
        </Row>
      </Stack>
      <Box
        sx={{
          height: '1px',
          backgroundColor: colors.black_dark
        }}
      />
      <Column bg="black">
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
                    color: colors.white
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
                color: colors.white
              }}>
              {item.value}
            </Stack>
          </Stack>
        ))}
      </Column>
      <Row>
        <Button
          onClick={() => {
            handleDelegate();
          }}
          loading={loading}
          disabled={!+amount || !validator}
          preset="primary"
          text="Delegate"
          full
        />
      </Row>
    </>
  );
}
