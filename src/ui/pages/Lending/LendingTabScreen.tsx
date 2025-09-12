import BigNumber from 'bignumber.js';
import { Fragment, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { Button, Content, Footer, Icon, Image, Layout, LightTooltip, Row } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { Slider } from '@/ui/components/Slider';
import {
  useCreateLoan,
  useGetDlcEventCount,
  useGetDlcPrice,
  useGetLiquidationPrice,
  useGetPoolsData
} from '@/ui/hooks/lending';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetBitwayBalanceList } from '@/ui/hooks/useGetBitwayBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useLendingState } from '@/ui/state/lending/hook';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate, parseUnitAmount } from '@/ui/utils';
import { convertTimePeriod, TimePeriod } from '@/ui/utils/formatter';
import { Box, BoxProps, Link, Popover, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

const periodTextMap: Record<TimePeriod, string> = {
  Y: 'Years',
  M: 'Months',
  W: 'Weeks',
  days: 'Days',
  H: 'Hours',
  m: 'Minutes',
  s: 'Seconds'
};

const BaseBox = (props: PropsWithChildren & BoxProps) => {
  const { sx, ...restProps } = props;
  const isLight = useIsLight();
  return (
    <Box
      sx={{
        borderRadius: '10px',
        background: isLight ? colors.light_bg : colors.dark_bg,
        ...sx
      }}
      {...restProps}>
      {props.children}
    </Box>
  );
};

export default function Index() {
  const isLight = useIsLight();
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { balanceList } = useGetBitwayBalanceList(currentAccount?.address);
  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);
  const { poolTokenDenom } = useLendingState();
  const [bitcoinAmount, setBitcoinAmount] = useState('');
  const { data: poolsData } = useGetPoolsData();
  const poolData = poolsData.find((p) => p.token.denom === poolTokenDenom);
  const { dlcPrice } = useGetDlcPrice(poolData?.baseData.config);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [currentLtv, setCurrentLtv] = useState(80);
  useEffect(() => {
    if (!poolData) return;
    setCurrentLtv(poolData.baseData.config.max_ltv * 100);
  }, [poolData]);

  const { bitcoinToken, requestFeeToken } = useMemo(() => {
    const bitcoinToken = bitcoinBalanceList.find((item) => item.denom === 'sat');
    const requestFeeToken = balanceList.find((item) => item.denom === poolData?.baseData.config.request_fee.denom);
    return { bitcoinToken, requestFeeToken };
  }, [bitcoinBalanceList, balanceList, poolData?.baseData.config.request_fee.denom]);

  const borrowTokenAmount = useMemo(() => {
    if (!bitcoinAmount || !dlcPrice || !currentLtv) return '0';
    return new BigNumber(bitcoinAmount)
      .multipliedBy(dlcPrice)
      .multipliedBy(currentLtv)
      .div(100)
      .toFixed(poolData?.token.asset.precision || 6, BigNumber.ROUND_DOWN);
  }, [bitcoinAmount, dlcPrice, currentLtv]);

  const durationMap = useMemo(() => {
    const _durationMap: Record<
      TimePeriod,
      Array<{
        maturity: string;
        value: number;
        index: number;
        borrow_apr: number;
      }>
    > = {};
    (poolData?.baseData.config.tranches || [])
      .sort((a, b) => +b.maturity - +a.maturity)
      .forEach((item) => {
        const { value, period } = convertTimePeriod(`${item.maturity}s`);
        if (_durationMap[period]) {
          _durationMap[period].push({
            maturity: item.maturity,
            value,
            index: _durationMap[period].length,
            borrow_apr: item.borrow_apr
          });
        } else {
          _durationMap[period] = [
            {
              maturity: item.maturity,
              value,
              index: 0,
              borrow_apr: item.borrow_apr
            }
          ];
        }
      });
    return _durationMap;
  }, [poolData]);

  const [durationData, setDurationData] = useState<
    | {
        maturity: string;
        value: number;
        period: TimePeriod;
        index: number;
        borrow_apr: number;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const periodArr = Object.keys(durationMap) as TimePeriod[];
    if (periodArr.length > 0) {
      const period = periodArr[0];
      const index = 0;
      setDurationData({
        maturity: durationMap[period][index].maturity,
        value: durationMap[period][index].value,
        period: period,
        index: index,
        borrow_apr: durationMap[period][index].borrow_apr
      });
    }
  }, [durationMap]);

  const annualPercentageRate = useMemo(() => {
    if (!durationData || durationData.index === -1) return '-';
    return new BigNumber(365)
      .multipliedBy(24)
      .multipliedBy(60)
      .multipliedBy(60)
      .div(durationData.maturity)
      .multipliedBy(poolData?.baseData.config.origination_fee_factor || '0')
      .plus(durationData.borrow_apr)
      .multipliedBy(100)
      .toFixed(2, BigNumber.ROUND_DOWN);
  }, [durationData, poolData]);

  const { liquidationPrice } = useGetLiquidationPrice({
    bitcoinAmount,
    borrowToken: poolData?.token,
    borrowTokenAmount,
    poolId: poolData?.baseData.id || '',
    maturity: durationData?.maturity || ''
  });

  const { data: dlcEventCount } = useGetDlcEventCount();

  // 健康因子: 比特币数量 * 比特币相对价格(BTC/xx) * 清算LTV / 借入数量
  const { healthFactor } = useMemo(() => {
    if (BigNumber(bitcoinAmount || 0).eq(0) || BigNumber(borrowTokenAmount || 0).eq(0) || !poolData?.baseData.config) {
      return {
        healthFactor: '-'
      };
    }
    return {
      healthFactor: new BigNumber(bitcoinAmount)
        .times(dlcPrice)
        .times(poolData?.baseData.config.liquidation_threshold || 0)
        .div(borrowTokenAmount || 1)
        .toFixed(2)
    };
  }, [borrowTokenAmount, bitcoinAmount, poolData?.token.denomPrice, bitcoinToken?.denomPrice, poolData?.baseData]);

  const { createLoan, loading, referralCode } = useCreateLoan();

  const minBorrowAmount = formatUnitAmount(
    poolData?.baseData.config.min_borrow_amount || '0',
    poolData?.token.asset.exponent || 6
  );
  const maxBorrowAmount = formatUnitAmount(
    poolData?.baseData.config.max_borrow_amount || '0',
    poolData?.token.asset.exponent || 6
  );

  const { isDisabled, buttonText } = useMemo(() => {
    let isDisabled = false,
      buttonText = 'Request Loan';
    if (loading) {
      isDisabled = true;
    } else if (poolData?.baseData.config.paused) {
      isDisabled = true;
      buttonText = 'Pool is paused';
    } else if (bitcoinAmount && +bitcoinAmount === +(bitcoinToken?.formatAmount || '0')) {
      isDisabled = true;
      buttonText = 'Insufficient for Network Fees';
    } else if (!+bitcoinAmount || !+borrowTokenAmount) {
      isDisabled = true;
    } else if (+borrowTokenAmount < +minBorrowAmount) {
      isDisabled = true;
      buttonText = `Min borrow amount: ${minBorrowAmount} ${poolData?.token.asset.symbol}`;
    } else if (+borrowTokenAmount > +maxBorrowAmount) {
      isDisabled = true;
      buttonText = `Max borrow amount: ${maxBorrowAmount} ${poolData?.token.asset.symbol}`;
    } else if (+(requestFeeToken?.amount || '0') < +(poolData?.baseData.config.request_fee.amount || '0')) {
      isDisabled = true;
      buttonText = 'Insufficient BTW Balance';
    } else if (!dlcEventCount || +dlcEventCount?.count === 0) {
      isDisabled = true;
      buttonText = 'No available DLC events';
    }
    return { isDisabled, buttonText };
  }, [
    loading,
    bitcoinAmount,
    borrowTokenAmount,
    dlcEventCount,
    healthFactor,
    poolData,
    minBorrowAmount,
    maxBorrowAmount,
    requestFeeToken
  ]);

  const data = [
    {
      label: 'Health Factor',
      value:
        healthFactor !== '-' ? (
          <Typography
            sx={{
              fontSize: '14px',
              color:
                healthFactor === '-'
                  ? isLight
                    ? colors.black
                    : colors.white
                  : +healthFactor > 2
                  ? colors.green
                  : +healthFactor <= 1.2
                  ? colors.red
                  : +healthFactor > 1.5
                  ? colors.yellow
                  : colors.main
            }}>
            {healthFactor}
          </Typography>
        ) : (
          '-'
        ),
      tips: 'A measure of how safe your loan is. A value above 1.0 means you’re safe from liquidation'
    },
    {
      label: `Liquidation Price (${
        +bitcoinAmount && +borrowTokenAmount && liquidationPrice ? liquidationPrice?.pair : '-'
      })`,
      value: `${liquidationPrice ? getTruncate(liquidationPrice?.price, 8) : '-'}`,
      tips: 'The collateral price at which liquidation would be triggered'
    },
    {
      label: 'Request Fee',
      value: (
        <>
          {formatUnitAmount(
            poolData?.baseData.config.request_fee.amount || '0',
            requestFeeToken?.asset.exponent || '6'
          )}
          <small
            style={{
              fontSize: '100%',
              color: colors.grey12,
              marginLeft: '2px'
            }}>
            {requestFeeToken?.asset.symbol}
          </small>
        </>
      ),
      tips: 'Upfront fees required to initiate the loan'
    },
    {
      label: 'Referral',
      value: referralCode || '-',
      tips: ''
    }
  ];

  const loanData = [
    {
      label: `Loan Amount (in ${poolData?.token.asset.symbol})`,
      value: bitcoinAmount ? getTruncate(borrowTokenAmount, poolData?.token.asset.precision || 6) : '-'
    },
    {
      label: 'Annual Percentage Rate',
      tips: `(APR includes an ${new BigNumber(durationData?.borrow_apr || 0)
        .multipliedBy(100)
        .toFixed(2)}% annual interest rate plus a ${new BigNumber(
        poolData?.baseData.config.origination_fee_factor || '0'
      )
        .multipliedBy(100)
        .toFixed(2)}% origination fee, annualized.)`,
      value: `${annualPercentageRate}%`
    },
    {
      label: `Origination Fee (in ${poolData?.token.asset.symbol})`,
      tips: '(deducted from disbursement at origination)',
      value: bitcoinAmount
        ? `${new BigNumber(poolData?.baseData.config.origination_fee_factor || '0')
            .multipliedBy(borrowTokenAmount)
            .toFixed(poolData?.token.asset.precision || 6, BigNumber.ROUND_DOWN)}`
        : '-'
    }
  ];

  return (
    <>
      <Layout>
        <MainHeader title="" />
        <Content
          style={{
            gap: '0'
          }}>
          <Stack>
            <BaseBox
              sx={{
                p: '16px'
              }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" gap="4px">
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: isLight ? colors.black : colors.white
                    }}>
                    Collateral
                  </Typography>
                  {bitcoinAmount ? (
                    <Typography
                      sx={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      ~$
                      {getTruncate(
                        new BigNumber(bitcoinToken?.denomPrice || '0')
                          .multipliedBy(bitcoinAmount || 0)
                          .toFixed(2, BigNumber.ROUND_DOWN),
                        2
                      )}
                    </Typography>
                  ) : null}
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Icon icon="wallet-icon" color="white_muted" size={12} />
                  &nbsp;
                  <Typography
                    sx={{
                      fontSize: '10px',
                      color: colors.grey12
                    }}>
                    {getTruncate(bitcoinToken?.formatAmount || '0', bitcoinToken?.asset.precision || 8)}
                  </Typography>
                </Stack>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  gap: '4px',
                  mt: '2px',
                  padding: '8px',
                  height: '50px',
                  bgcolor: isLight ? colors.white : colors.black
                }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  flexShrink={0}
                  gap="4px"
                  sx={{
                    height: '100%',
                    bgcolor: isLight ? colors.light_bg : colors.dark_bg,
                    borderRadius: '8px',
                    p: '0 8px'
                  }}>
                  <Image src={bitcoinToken?.asset.logo} height={24} width={24}></Image>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: isLight ? colors.black : colors.white
                    }}>
                    {bitcoinToken?.asset.symbol || 'BTC'}
                  </Typography>
                </Stack>
                <CoinInput
                  size={22}
                  coin={{
                    amount: bitcoinAmount,
                    denom: bitcoinToken?.denom || 'sat'
                  }}
                  max={bitcoinToken?.formatAmount || '0'}
                  onChange={(value) => {
                    setBitcoinAmount(value);
                  }}
                />
              </Box>
            </BaseBox>

            <BaseBox
              sx={{
                p: '16px',
                mt: '8px'
              }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: isLight ? colors.black : colors.white
                }}>
                LTV&nbsp;
                <small
                  style={{
                    fontSize: '100%',
                    color: colors.grey12
                  }}>
                  ({poolData ? poolData.baseData.config.max_ltv * 100 : 80}% max)
                </small>
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  gap: '4px',
                  mt: '2px',
                  padding: '8px',
                  height: '50px',
                  bgcolor: isLight ? colors.white : colors.black
                }}>
                <Stack direction="row" alignItems="center">
                  <CoinInput
                    size={22}
                    coin={{
                      amount: `${currentLtv}`,
                      denom: ''
                    }}
                    max={poolData ? `${poolData.baseData.config.max_ltv * 100}` : '80'}
                    onChange={(value) => {
                      setCurrentLtv(+value);
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '20px',
                      color: isLight ? colors.black : colors.white,
                      position: 'absolute',
                      top: '50%',
                      right: '24px',
                      transform: 'translateY(-50%)'
                    }}>
                    %
                  </Typography>
                </Stack>
              </Box>
              <Stack
                sx={{
                  mt: '16px'
                }}>
                <Slider
                  maxProcess={poolData ? poolData.baseData.config.max_ltv * 100 : 80}
                  onChange={(value) => {
                    setCurrentLtv(value);
                  }}
                  value={currentLtv}
                  isLight={isLight}
                />
              </Stack>
            </BaseBox>

            <BaseBox
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: '16px',
                mt: '8px',
                gap: '8px'
              }}>
              <Stack>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: isLight ? colors.black : colors.white
                  }}>
                  Loan Duration&nbsp;
                  <small
                    style={{
                      fontSize: '100%',
                      color: colors.grey12
                    }}>
                    ({convertTimePeriod(`${poolData?.baseData.config.tranches[0].maturity}s`).label}
                    &nbsp;max)
                  </small>
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '10px',
                    gap: '4px',
                    mt: '2px',
                    padding: '8px',
                    height: '50px',
                    bgcolor: isLight ? colors.white : colors.black
                  }}>
                  <CoinInput
                    size={22}
                    coin={{
                      amount: `${durationData?.value}`,
                      denom: ''
                    }}
                    onChange={(value) => {
                      if (!durationData) return;
                      const regex = /^\d+(\.\d+)?$/;
                      if (!value || (regex.test(value) && +value >= 0)) {
                        const index = durationMap[durationData.period].findIndex((item) => item.value === +value);
                        setDurationData({
                          value: +value,
                          index,
                          period: durationData.period,
                          borrow_apr: durationMap[durationData.period][index]?.borrow_apr || 0,
                          maturity: durationMap[durationData.period][index]?.maturity || '1'
                        });
                      }
                    }}
                    onBlur={() => {
                      if (!durationData) return;
                      if (!durationMap[durationData.period].find((item) => item.value === durationData.value)) {
                        const index = 0;
                        setDurationData({
                          index,
                          period: durationData.period,
                          borrow_apr: durationMap[durationData.period][index].borrow_apr,
                          value: durationMap[durationData.period][index].value,
                          maturity: durationMap[durationData.period][index].maturity
                        });
                      }
                    }}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap="16px"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: '8px',
                      transform: 'translateY(-50%)'
                    }}>
                    <Stack
                      gap="4px"
                      sx={{
                        svg: {
                          cursor: 'pointer',
                          path: {
                            fill: colors.grey12,
                            transition: '.4s'
                          },
                          ':hover': {
                            path: {
                              fill: isLight ? colors.black : colors.white
                            }
                          }
                        }
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        onClick={() => {
                          if (!durationData) return;
                          const lastIndex = durationData.index - 1;
                          if (durationMap[durationData.period][lastIndex]) {
                            setDurationData({
                              maturity: durationMap[durationData.period][lastIndex].maturity,
                              value: durationMap[durationData.period][lastIndex].value,
                              period: durationData.period,
                              index: lastIndex,
                              borrow_apr: durationMap[durationData.period][lastIndex].borrow_apr
                            });
                          }
                        }}>
                        <path d="M0 8.75L6 0.75L12 8.75H0Z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        onClick={() => {
                          if (!durationData) return;
                          const nextIndex = durationData.index + 1;
                          if (durationMap[durationData.period][nextIndex]) {
                            setDurationData({
                              maturity: durationMap[durationData.period][nextIndex].maturity,
                              value: durationMap[durationData.period][nextIndex].value,
                              period: durationData.period,
                              index: nextIndex,
                              borrow_apr: durationMap[durationData.period][nextIndex].borrow_apr
                            });
                          }
                        }}>
                        <path d="M0 0.75L6 8.75L12 0.75H0Z" />
                      </svg>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap="2px"
                      sx={{
                        cursor: 'pointer'
                      }}
                      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        event.stopPropagation();
                        if (Object.keys(durationMap).length > 1) {
                          setAnchorEl(event.currentTarget);
                        }
                      }}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: isLight ? colors.black : colors.white,
                          fontWeight: 500
                        }}>
                        {durationData ? periodTextMap[durationData.period] : ''}
                      </Typography>
                      {Object.keys(durationMap).length > 0 && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: '.4s'
                          }}>
                          <g id="Component/icon/ic_Chevron Down">
                            <path
                              id="Shape"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 13.5858L16.2929 9.29289C16.6834 8.90237 17.3166 8.90237 17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L12 13.5858Z"
                              fill={anchorEl ? colors.main : isLight ? colors.black : colors.white}
                            />
                          </g>
                        </svg>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Stack
                sx={{
                  flexShrink: 0,
                  width: '120px'
                }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: isLight ? colors.black : colors.white
                  }}>
                  Funded in
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap="8px"
                  sx={{
                    mt: '2px',
                    height: '50px',
                    bgcolor: isLight ? colors.white : colors.black,
                    borderRadius: '10px',
                    p: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    navigate('LendingSelectTokenScreen', {
                      poolsData
                    });
                  }}>
                  <Image src={poolData?.token.asset.logo} height={24} width={24}></Image>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: isLight ? colors.black : colors.white
                    }}>
                    {poolData?.token.asset.symbol || 'BTC'}
                  </Typography>
                  <Icon icon="down" size={10} color={isLight ? 'black' : 'white'}></Icon>
                </Stack>
              </Stack>
            </BaseBox>

            <BaseBox
              sx={{
                p: '14px 10px',
                mt: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                style={{
                  flexShrink: 0
                }}>
                <path
                  d="M5.4987 9.58314L7.16536 11.2498L10.9154 7.49981M14.6654 9.99981C14.6654 14.0902 10.2037 17.0651 8.58036 18.0122C8.39586 18.1198 8.30362 18.1737 8.17343 18.2016C8.0724 18.2232 7.925 18.2232 7.82396 18.2016C7.69378 18.1737 7.60153 18.1198 7.41704 18.0122C5.79367 17.0651 1.33203 14.0902 1.33203 9.99981V6.01448C1.33203 5.34822 1.33203 5.01509 1.441 4.72873C1.53726 4.47576 1.69368 4.25004 1.89675 4.07109C2.12661 3.86851 2.43853 3.75154 3.06237 3.5176L7.53053 1.84204C7.70378 1.77707 7.7904 1.74459 7.87952 1.73171C7.95856 1.72029 8.03883 1.72029 8.11788 1.73171C8.20699 1.74459 8.29362 1.77707 8.46686 1.84204L12.935 3.5176C13.5589 3.75154 13.8708 3.86851 14.1006 4.07109C14.3037 4.25004 14.4601 4.47576 14.5564 4.72873C14.6654 5.01509 14.6654 5.34822 14.6654 6.01448V9.99981Z"
                  stroke={isLight ? colors.black : colors.white}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Typography fontSize={'12px'} color={colors.grey12}>
                Your collateral remains in a non-custodial Bitcoin vault (2-of-2 multisig). You do not transfer custody
                to Bitway or to any third party, and any movement of funds requires your authorization. We are
                technically unable to rehypothecate your Bitcoin. For more details, see our&nbsp;
                <Link
                  sx={{
                    color: colors.grey12,
                    textDecoration: 'underline',
                    textDecorationColor: colors.grey12
                  }}
                  target="_blank"
                  href={'https://docs.bitway.com'}>
                  technical documentation
                </Link>
                .
              </Typography>
            </BaseBox>

            <BaseBox
              sx={{
                p: '16px',
                mt: '8px'
              }}>
              {loanData.map((item) => (
                <Stack
                  key={item.label}
                  sx={{
                    pb: '16px',
                    borderBottom: `1px solid ${isLight ? colors.white1 : colors.grey1}`,
                    '&:not(:first-of-type)': {
                      mt: '16px'
                    }
                  }}>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: isLight ? colors.black : colors.white
                    }}>
                    {item.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: isLight ? colors.black : colors.white,
                      mt: '4px'
                    }}>
                    {item.label}
                  </Typography>
                  {item.tips && (
                    <Typography
                      sx={{
                        fontSize: '12px',
                        color: colors.grey12
                      }}>
                      {item.tips}
                    </Typography>
                  )}
                </Stack>
              ))}
              <BaseBox
                sx={{
                  p: '12px',
                  mt: '16px',
                  bgcolor: isLight ? colors.white : colors.black
                }}>
                {data.map((item, index) => (
                  <Fragment key={index}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        ':not(:first-of-type)': {
                          mt: '8px'
                        }
                      }}>
                      <LightTooltip title={item.tips} arrow placement="top">
                        <Typography
                          sx={{
                            fontSize: '14px',
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
                        sx={{
                          fontSize: '14px',
                          color: isLight ? colors.black : colors.white
                        }}>
                        {item.value}
                      </Stack>
                    </Stack>
                  </Fragment>
                ))}
              </BaseBox>
            </BaseBox>
            <Row style={{ marginTop: '16px' }} full>
              <Button
                onClick={() => {
                  if (!poolData || !durationData) {
                    return;
                  }
                  createLoan({
                    borrowAmount: {
                      denom: poolData.token.denom,
                      amount: parseUnitAmount(borrowTokenAmount, poolData.token.asset.exponent)
                    },
                    maturityTime: durationData.maturity || '0',
                    poolId: poolData.baseData.id,
                    btcUnitAmount: parseUnitAmount(bitcoinAmount, bitcoinToken?.asset.exponent || 8)
                  });
                }}
                disabled={isDisabled}
                loading={loading}
                preset="primary"
                text={buttonText}
                full></Button>
            </Row>
          </Stack>
        </Content>
        <Footer px="zero" py="zero">
          <NavTabBar tab="loans" />
        </Footer>
        <Popover
          disableEscapeKeyDown
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={(event: React.MouseEvent<HTMLDivElement>) => {
            setAnchorEl(null);
            event.stopPropagation();
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <Stack onClick={(event) => event.stopPropagation()} direction="column">
            {(Object.keys(durationMap) as TimePeriod[]).map((item) => (
              <Box
                key={item}
                className={`item ${durationData?.period === item && 'active'}`}
                onClick={() => {
                  setAnchorEl(null);
                  setDurationData({
                    maturity: durationMap[item][0].maturity,
                    value: durationMap[item][0].value,
                    period: item,
                    index: durationMap[item][0].index,
                    borrow_apr: durationMap[item][0].borrow_apr
                  });
                }}
                sx={{
                  color: isLight ? colors.black : colors.white,
                  fontSize: '16px',
                  lineHeight: '18px',
                  whiteSpace: 'nowrap'
                }}>
                {periodTextMap[item]}
              </Box>
            ))}
          </Stack>
        </Popover>
      </Layout>
    </>
  );
}
