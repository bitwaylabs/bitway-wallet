import BigNumber from 'bignumber.js';
import { Fragment, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { Button, CheckBox, Content, Footer, Icon, Image, Layout, LightTooltip, Row, Text } from '@/ui/components';
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
  const [isChecked, setIsChecked] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
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
    if (!+bitcoinAmount || !+borrowTokenAmount || !poolData?.baseData.config || !dlcPrice) {
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
  }, [liquidationPrice]);

  const { createLoan, loading, referralCode } = useCreateLoan();

  const minBorrowAmount = formatUnitAmount(
    poolData?.baseData.config.min_borrow_amount || '0',
    poolData?.token.asset.exponent || 6
  );
  const maxBorrowAmount = formatUnitAmount(
    poolData?.baseData.config.max_borrow_amount || '0',
    poolData?.token.asset.exponent || 6
  );

  const { isDisabled, buttonText, isWarning } = useMemo(() => {
    let isDisabled = false,
      buttonText = step === 1 ? 'Next' : 'Request Loan',
      isWarning = false,
      _liquidationPrice = '0';
    if (poolData?.baseData.config.lending_asset.is_base_price_asset) {
      _liquidationPrice = new BigNumber(1).div(liquidationPrice?.price || 1).toString();
    } else {
      _liquidationPrice = liquidationPrice?.price || '0';
    }
    if (loading || !+_liquidationPrice) {
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
    } else if (+_liquidationPrice >= +dlcPrice) {
      isDisabled = true;
      buttonText = 'Liquidation Price Too High';
    } else if (healthFactor === '-') {
      isDisabled = true;
    } else if (+healthFactor <= 1.2) {
      isWarning = true;
      if (!isChecked) {
        isDisabled = true;
      }
    }

    return { isDisabled, buttonText, isWarning };
  }, [
    loading,
    dlcEventCount,
    healthFactor,
    poolData,
    minBorrowAmount,
    maxBorrowAmount,
    requestFeeToken,
    healthFactor,
    isChecked,
    liquidationPrice,
    step
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
          {step === 1 ? (
            <Stack>
              <Row full justifyBetween itemsCenter mt="lg">
                <Text
                  color={isLight ? 'black' : 'white'}
                  size="lg"
                  style={{
                    fontWeight: 600
                  }}>
                  Borrow
                </Text>

                <Stack
                  direction="row"
                  alignItems="center"
                  gap="4px"
                  onClick={() => {
                    navigate('MyLoansScreen');
                  }}
                  sx={{
                    cursor: 'pointer',
                    p: {
                      color: colors.grey12,
                      transition: '.4s'
                    },
                    div: {
                      transition: '.4s'
                    },
                    ':hover': {
                      p: {
                        color: isLight ? colors.black : colors.white
                      },
                      div: {
                        div: {
                          color: `${isLight ? colors.black : colors.white} !important`,
                          bgcolor: `${isLight ? colors.black : colors.white} !important`
                        }
                      }
                    }
                  }}>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      mt: '-1px'
                    }}>
                    My Loans
                  </Typography>
                  <Icon icon="arrow-right" color="white_muted" size={16} />
                </Stack>
              </Row>

              <BaseBox
                sx={{
                  p: '16px',
                  mt: '12px'
                }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" gap="4px">
                    <LightTooltip
                      title={
                        'Your collateral remains in a non-custodial Bitcoin vault (2-of-2 multisig). You do not transfer custody to Bitway or to any third party, and any movement of funds requires your authorization. We are technically unable to rehypothecate your Bitcoin. For more details, see our technical documentation.'
                      }
                      placement="top"
                      arrow>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.99935 7.66691L7.33268 9.00024L10.3327 6.00024M13.3327 8.00024C13.3327 11.2725 9.76338 13.6525 8.46468 14.4102C8.31708 14.4963 8.24328 14.5393 8.13914 14.5617C8.05831 14.579 7.94039 14.579 7.85956 14.5617C7.75541 14.5393 7.68162 14.4963 7.53402 14.4102C6.23532 13.6525 2.66602 11.2725 2.66602 8.00024V4.81197C2.66602 4.27897 2.66602 4.01246 2.75319 3.78338C2.8302 3.581 2.95534 3.40042 3.11779 3.25726C3.30168 3.0952 3.55121 3.00162 4.05029 2.81447L7.62482 1.47402C7.76341 1.42205 7.83271 1.39606 7.904 1.38576C7.96724 1.37662 8.03146 1.37662 8.09469 1.38576C8.16599 1.39606 8.23528 1.42205 8.37388 1.47402L11.9484 2.81447C12.4475 3.00162 12.697 3.0952 12.8809 3.25726C13.0434 3.40042 13.1685 3.581 13.2455 3.78338C13.3327 4.01246 13.3327 4.27897 13.3327 4.81197V8.00024Z"
                          stroke={isLight ? colors.black : colors.white}
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </LightTooltip>

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
                  p: '16px 16px 10px',
                  mt: '8px'
                }}>
                <Stack direction="row" alignItems="center" gap="4px">
                  <LightTooltip
                    title="LTV (Loan-to-Value) is the ratio of a loan amount to the value of the collateral."
                    placement="top"
                    arrow>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_27227_3213)">
                        <path
                          d="M8 0C3.58178 0 0 3.58178 0 8C0 12.4182 3.58178 16 8 16C12.4182 16 16 12.4182 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 14.6667C4.31822 14.6667 1.33333 11.6818 1.33333 8C1.33333 4.31822 4.31822 1.33333 8 1.33333C11.6818 1.33333 14.6667 4.31822 14.6667 8C14.6667 8.87548 14.4942 9.74239 14.1592 10.5512C13.8242 11.3601 13.3331 12.095 12.714 12.714C12.095 13.3331 11.3601 13.8242 10.5512 14.1592C9.74239 14.4942 8.87548 14.6667 8 14.6667ZM8 3.45333C7.29276 3.45333 6.61448 3.73428 6.11438 4.23438C5.61428 4.73448 5.33333 5.41276 5.33333 6.12C5.33333 6.29681 5.40357 6.46638 5.5286 6.5914C5.65362 6.71643 5.82319 6.78667 6 6.78667C6.17681 6.78667 6.34638 6.71643 6.4714 6.5914C6.59643 6.46638 6.66667 6.29681 6.66667 6.12C6.66667 5.85629 6.74487 5.59851 6.89137 5.37924C7.03788 5.15997 7.24612 4.98908 7.48976 4.88816C7.73339 4.78724 8.00148 4.76084 8.26012 4.81229C8.51876 4.86373 8.75634 4.99072 8.94281 5.17719C9.12928 5.36366 9.25627 5.60124 9.30771 5.85988C9.35916 6.11852 9.33276 6.38661 9.23184 6.63024C9.13092 6.87388 8.96003 7.08212 8.74076 7.22863C8.52149 7.37513 8.26371 7.45333 8 7.45333C7.82319 7.45333 7.65362 7.52357 7.5286 7.6486C7.40357 7.77362 7.33333 7.94319 7.33333 8.12V9.86C7.33333 10.0368 7.40357 10.2064 7.5286 10.3314C7.65362 10.4564 7.82319 10.5267 8 10.5267C8.17681 10.5267 8.34638 10.4564 8.4714 10.3314C8.59643 10.2064 8.66667 10.0368 8.66667 9.86V8.7C9.29333 8.53622 9.83897 8.14996 10.2017 7.61333C10.5644 7.0767 10.7194 6.4264 10.6378 5.78385C10.5561 5.1413 10.2434 4.55043 9.75801 4.12157C9.27261 3.69271 8.64771 3.45518 8 3.45333ZM7.33333 11.9267C7.33333 12.1035 7.40357 12.273 7.5286 12.3981C7.65362 12.5231 7.82319 12.5933 8 12.5933C8.17681 12.5933 8.34638 12.5231 8.4714 12.3981C8.59643 12.273 8.66667 12.1035 8.66667 11.9267C8.66667 11.7499 8.59643 11.5803 8.4714 11.4553C8.34638 11.3302 8.17681 11.26 8 11.26C7.82319 11.26 7.65362 11.3302 7.5286 11.4553C7.40357 11.5803 7.33333 11.7499 7.33333 11.9267Z"
                          fill={isLight ? colors.black : colors.white}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_27227_3213">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </LightTooltip>

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
                </Stack>
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
                    mt: '10px'
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
                        color: isLight ? colors.black : colors.white,
                        fontWeight: 500
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
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    flexShrink: 0
                  }}>
                  <path
                    d="M5.99935 7.66691L7.33268 9.00024L10.3327 6.00024M13.3327 8.00024C13.3327 11.2725 9.76338 13.6525 8.46468 14.4102C8.31708 14.4963 8.24328 14.5393 8.13914 14.5617C8.05831 14.579 7.94039 14.579 7.85956 14.5617C7.75541 14.5393 7.68162 14.4963 7.53402 14.4102C6.23532 13.6525 2.66602 11.2725 2.66602 8.00024V4.81197C2.66602 4.27897 2.66602 4.01246 2.75319 3.78338C2.8302 3.581 2.95534 3.40042 3.11779 3.25726C3.30168 3.0952 3.55121 3.00162 4.05029 2.81447L7.62482 1.47402C7.76341 1.42205 7.83271 1.39606 7.904 1.38576C7.96724 1.37662 8.03146 1.37662 8.09469 1.38576C8.16599 1.39606 8.23528 1.42205 8.37388 1.47402L11.9484 2.81447C12.4475 3.00162 12.697 3.0952 12.8809 3.25726C13.0434 3.40042 13.1685 3.581 13.2455 3.78338C13.3327 4.01246 13.3327 4.27897 13.3327 4.81197V8.00024Z"
                    stroke={isLight ? colors.black : colors.white}
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Typography fontSize={'12px'} color={colors.grey12}>
                  Your collateral remains in a non-custodial Bitcoin vault (2-of-2 multisig). You do not transfer
                  custody to Bitway or to any third party, and any movement of funds requires your authorization. We are
                  technically unable to rehypothecate your Bitcoin. For more details, see our&nbsp;
                  <Link
                    sx={{
                      color: colors.grey12,
                      textDecoration: 'underline',
                      textDecorationColor: colors.grey12,
                      ':hover': {
                        color: isLight ? colors.black : colors.white
                      }
                    }}
                    target="_blank"
                    href={'https://docs.bitway.com'}>
                    technical documentation
                  </Link>
                  .
                </Typography>
              </BaseBox>

              {isWarning && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="4px"
                  borderRadius={'10px'}
                  p="12px"
                  bgcolor={colors.red1}
                  mt="8px"
                  sx={{
                    fontSize: '12px',
                    color: colors.red
                  }}>
                  <CheckBox
                    sx={{
                      position: 'relative',
                      bottom: '6px',
                      padding: 0
                    }}
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}></CheckBox>
                  <Box>
                    <Typography fontSize={'12px'}>
                      I acknowledge that borrowing this amount reduces my health factor and increases the risk of
                      liquidation.
                    </Typography>
                  </Box>
                </Stack>
              )}

              <Row style={{ marginTop: '16px' }} full>
                <Button
                  onClick={() => {
                    setStep(2);
                  }}
                  disabled={isDisabled}
                  loading={loading}
                  preset="primary"
                  text={buttonText}
                  full></Button>
              </Row>
            </Stack>
          ) : (
            <Stack>
              <BaseBox
                sx={{
                  p: '16px',
                  mt: '12px'
                }}>
                {loanData.map((item) => (
                  <Stack
                    key={item.label}
                    sx={{
                      '&:not(:first-of-type)': {
                        mt: '10px'
                      }
                    }}>
                    <Typography
                      sx={{
                        fontSize: '18px',
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
                          fontSize: '10px',
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
                          sx={{
                            fontSize: '12px',
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
          )}
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
          }}
          sx={{
            '.MuiPaper-root': {
              mt: '4px',
              p: '8px',
              borderRadius: '10px',
              bgcolor: isLight ? colors.white : colors.black
            }
          }}>
          <Stack onClick={(event) => event.stopPropagation()} direction="column" gap="4px">
            {(Object.keys(durationMap) as TimePeriod[]).map((item) => (
              <Box
                key={item}
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
                  fontSize: '14px',
                  lineHeight: '18px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  p: '8px 10px',
                  borderRadius: '10px',
                  bgcolor: isLight ? colors.white : colors.black,
                  transition: '.4s',
                  ':hover': {
                    bgcolor: isLight ? colors.light_bg : colors.dark_bg
                  }
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
