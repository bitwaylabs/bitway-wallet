import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { Empty } from '@/ui/components/Empty';
import { useGetDlcPrice, useGetLoansData, useGetPoolDataById, useGetPoolsData } from '@/ui/hooks/lending';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetBitwayBalanceList } from '@/ui/hooks/useGetBitwayBalanceList';
import { Loan, LoanStatus } from '@/ui/services/lending/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { formatTimeWithUTC } from '@/ui/utils/formatter';
import { Box, BoxProps, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export const loanStatusStyle: Record<
  LoanStatus,
  {
    lightBgColor: string;
    lightColor: string;
    darkBgColor: string;
    darkColor: string;
  }
> = {
  Unspecified: { lightBgColor: '', lightColor: '', darkBgColor: '', darkColor: '' },
  Requested: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.grey62,
    lightBgColor: colors.light_bg,
    lightColor: colors.grey62
  },
  Cancelled: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.grey64,
    lightBgColor: colors.light_bg,
    lightColor: colors.grey64
  },
  Authorized: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.grey62,
    lightBgColor: colors.light_bg,
    lightColor: colors.grey62
  },
  Rejected: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.grey64,
    lightBgColor: colors.light_bg,
    lightColor: colors.grey64
  },
  Open: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.green,
    lightBgColor: colors.light_bg,
    lightColor: colors.green
  },
  Repaid: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.green,
    lightBgColor: colors.light_bg,
    lightColor: colors.green
  },
  Defaulted: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.red,
    lightBgColor: colors.light_bg,
    lightColor: colors.red
  },
  Liquidated: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.red,
    lightBgColor: colors.light_bg,
    lightColor: colors.red
  },
  Closed: {
    darkBgColor: colors.dark_bg,
    darkColor: colors.grey64,
    lightBgColor: colors.light_bg,
    lightColor: colors.grey64
  }
};

export default function MyLoansScreen() {
  const currentAccount = useCurrentAccount();
  const { data } = useGetLoansData();
  const { balanceList: bitwayBalanceList } = useGetBitwayBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);
  const [isHoverId, setIsHoverId] = useState('');
  const navigate = useNavigate();
  const isLight = useIsLight();
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="My Loans"
      />
      <Content
        style={{
          marginTop: 16,
          padding: '0 16px'
        }}>
        {data?.length > 0 ? (
          <>
            {data.map((item) => {
              const borrowToken = bitwayBalanceList.find((o) => o.denom === item.borrow_amount.denom);
              const collateralToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
              const collateralAmount = formatUnitAmount(item.collateral_amount, collateralToken?.asset.exponent || 6);
              const borrowTokenAmount = formatUnitAmount(item.borrow_amount.amount, borrowToken?.asset.exponent || 6);

              return (
                <Stack
                  key={item.create_at}
                  gap="8px"
                  onMouseOver={() => {
                    setIsHoverId(item.vault_address);
                  }}
                  onMouseLeave={() => {
                    setIsHoverId('');
                  }}
                  onClick={() => {
                    navigate('LoanDetailScreen', { loan_id: item.vault_address });
                  }}
                  sx={{
                    padding: '16px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: isLight ? colors.light_bg : colors.dark_bg
                  }}>
                  <Row full justifyBetween itemsCenter>
                    <Row itemsCenter gap="md">
                      <Image src={borrowToken?.asset.logo} height={28} width={28}></Image>
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: isLight ? colors.black : colors.white
                        }}>
                        {borrowTokenAmount}
                      </Text>
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: colors.grey12
                        }}>
                        {borrowToken?.asset.symbol}
                      </Text>
                      <Box
                        sx={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          color: isLight
                            ? loanStatusStyle[item.status].lightColor
                            : loanStatusStyle[item.status].darkColor,
                          bgcolor: isLight
                            ? loanStatusStyle[item.status].lightBgColor
                            : loanStatusStyle[item.status].darkBgColor
                        }}>
                        {item.status}
                      </Box>
                    </Row>
                    <Icon
                      icon="arrow-right"
                      color={isHoverId === item.vault_address ? 'main' : isLight ? 'black' : 'white'}
                      size={16}
                    />
                  </Row>
                  <Row full justifyBetween itemsCenter>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      Collateral
                    </Text>
                    <Row justifyEnd itemsCenter gap="xs">
                      <Text
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: isLight ? colors.black : colors.white
                        }}>
                        {+collateralAmount > 0 ? collateralAmount : '-'}
                      </Text>
                      <Text
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: colors.grey12
                        }}>
                        {collateralToken?.asset.symbol}
                      </Text>
                      <Image src={collateralToken?.asset.logo} height={16} width={16}></Image>
                    </Row>
                  </Row>
                  <Row full justifyBetween itemsCenter>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      Health Factor
                    </Text>
                    <HealthFactor loan={item} />
                  </Row>
                  <Row full justifyBetween itemsCenter>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      Max Interest
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: isLight ? colors.black : colors.white
                      }}>
                      {getTruncate(
                        formatUnitAmount(item.interest, borrowToken?.asset.exponent || 6),
                        borrowToken?.asset.precision || 6
                      )}
                    </Text>
                  </Row>
                  <Row full justifyBetween itemsCenter>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      Maturity
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: isLight ? colors.black : colors.white
                      }}>
                      {formatTimeWithUTC(+item.maturity_time * 1000)}
                    </Text>
                  </Row>
                </Stack>
              );
            })}
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12,
                textAlign: 'center',
                marginTop: '4px'
              }}>
              No more data
            </Text>
          </>
        ) : (
          <Empty style={{ marginTop: '100px' }} />
        )}
      </Content>
    </Layout>
  );
}

export function HealthFactor({ loan }: { loan: Loan }) {
  const currentAccount = useCurrentAccount();
  const { balanceList: bitwayBalanceList } = useGetBitwayBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);
  const { data: lendingPool } = useGetPoolDataById({ poolId: loan.pool_id });
  const borrowToken = bitwayBalanceList.find((o) => o.denom === loan.borrow_amount.denom);
  const collateralToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
  const collateralAmount = formatUnitAmount(loan.collateral_amount, collateralToken?.asset.exponent || 6);
  const borrowTokenAmount = formatUnitAmount(loan.borrow_amount.amount, borrowToken?.asset.exponent || 6);

  const { data: poolsData } = useGetPoolsData();

  const poolData = poolsData.find((p) => p.token.denom === loan.borrow_amount?.denom);
  const { dlcPrice } = useGetDlcPrice(poolData?.baseData.config);

  // 健康因子: 比特币数量 * 比特币相对价格(BTC/xx) * 清算LTV / 借入数量
  const { healthFactor } = useMemo(() => {
    if (
      BigNumber(collateralAmount || 0).eq(0) ||
      BigNumber(borrowTokenAmount || 0).eq(0) ||
      !lendingPool?.pool?.config
    ) {
      return {
        healthFactor: '-'
      };
    }
    return {
      healthFactor: new BigNumber(collateralAmount)
        .times(dlcPrice || 0)
        .times(lendingPool?.pool?.config?.liquidation_threshold || 0)
        .div(borrowTokenAmount || 1)
        .toFixed(2)
    };
  }, [borrowTokenAmount, collateralAmount, borrowToken?.denomPrice, collateralToken?.denomPrice, lendingPool]);

  return (
    <Text
      style={{
        fontSize: '12px',
        fontWeight: 500,
        color:
          +healthFactor > 2
            ? colors.green
            : +healthFactor <= 1.2
            ? colors.red
            : +healthFactor > 1.5
            ? colors.yellow
            : colors.main
      }}>
      {healthFactor}
    </Text>
  );
}

export function LoanLTV({ loan, sx }: { loan: Loan; sx?: BoxProps['sx'] }) {
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetBitwayBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { data: lendingPool } = useGetPoolDataById({ poolId: loan.pool_id });
  const { dlcPrice } = useGetDlcPrice(lendingPool?.pool.config);

  const borrowToken = balanceList.find((item) => item.denom === loan.borrow_amount.denom);
  const bitcoinToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
  const bitcoinAmount = formatUnitAmount(loan.collateral_amount, bitcoinToken?.asset.exponent || 8);
  const borrowTokenAmount = formatUnitAmount(loan.borrow_amount.amount, borrowToken?.asset.exponent || 6);

  const { healthFactor } = useMemo(() => {
    if (BigNumber(bitcoinAmount || 0).eq(0) || BigNumber(borrowTokenAmount || 0).eq(0) || !lendingPool?.pool?.config) {
      return {
        healthFactor: '-'
      };
    }
    return {
      healthFactor: new BigNumber(bitcoinAmount)
        .times(dlcPrice)
        .times(lendingPool?.pool?.config?.liquidation_threshold || 0)
        .div(borrowTokenAmount || 1)
        .toFixed(2)
    };
  }, [loan.vault_address, lendingPool, bitcoinAmount, borrowTokenAmount, borrowToken]);

  if (+bitcoinAmount && +borrowTokenAmount && bitcoinToken?.denomPrice && ['Requested', 'Open'].includes(loan.status)) {
    return (
      <Typography
        sx={{
          color:
            +healthFactor > 2
              ? colors.green
              : +healthFactor <= 1.2
              ? colors.red
              : +healthFactor > 1.5
              ? colors.yellow
              : colors.main,
          fontSize: '14px',
          fontWeight: 600,
          ...sx
        }}>
        {new BigNumber(borrowTokenAmount || 0)
          .div(bitcoinAmount || 1)
          .div(dlcPrice || '1')
          .times(100)
          .toFixed(2) + '%'}
      </Typography>
    );
  }
  return (
    <Typography
      sx={{
        fontSize: '14px',
        fontWeight: 600,
        ...sx
      }}>
      -
    </Typography>
  );
}
