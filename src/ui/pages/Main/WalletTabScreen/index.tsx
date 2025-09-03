import { useEffect, useState } from 'react';

import { AddressFlagType } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { checkAddressFlag } from '@/shared/utils';
import { Column, Footer, Layout, Row, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetAccountBalanceByUSD from '@/ui/hooks/useGetAccountBalanceByUSD';
import { useAddressSummary, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useBlockstreamUrl, useIsLight, useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate, useWallet } from '@/ui/utils';
import { Stack, Typography } from '@mui/material';

import { BuyBTCModal } from '../../BuyBTC/BuyBTCModal';
import { useNavigate } from '../../MainRoute';
import MainHeader from '../MainHeader';
import SideTokenList from './SideTokenList';

export default function WalletTabScreen() {
  const navigate = useNavigate();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();
  const isLight = useIsLight();

  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const { sideChain } = useEnvironment();
  const accountBalanceByUSD = useGetAccountBalanceByUSD();
  const addressSummary = useAddressSummary();

  const blockStreamUrl = useBlockstreamUrl();

  useEffect(() => {
    if (currentAccount.address === addressSummary.address) {
      if (addressSummary.arc20Count > 0 || addressSummary.runesCount > 0) {
        if (!checkAddressFlag(currentAccount.flag, AddressFlagType.CONFIRMED_UTXO_MODE)) {
          if (!checkAddressFlag(currentAccount.flag, AddressFlagType.DISABLE_AUTO_SWITCH_CONFIRMED)) {
            wallet.addAddressFlag(currentAccount, AddressFlagType.CONFIRMED_UTXO_MODE).then((account) => {
              dispatch(accountActions.setCurrent(account));
            });
          }
        }
      }
    }
  }, [addressSummary, currentAccount]);

  const [buyBtcModalVisible, setBuyBtcModalVisible] = useState(false);
  const [isHoveredMoney, setIsHoveredMoney] = useState(false);
  const handleMouseOver = () => {
    setIsHoveredMoney(true);
  };

  const handleMouseLeave = () => {
    setIsHoveredMoney(false);
  };

  const operateList = [
    {
      label: 'Receive',
      icon: (
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.07178 5.07031H5.07892M12.9289 5.07031H12.9361M5.07178 12.9275H5.07892M9.71463 9.71317H9.72178M12.9289 12.9275H12.9361M12.5718 15.4275H15.4289V12.5703M10.4289 12.2132V15.4275M15.4289 10.4275H12.2146M11.5718 7.57031H14.2861C14.6861 7.57031 14.8861 7.57031 15.0389 7.49246C15.1733 7.42398 15.2826 7.31471 15.3511 7.18031C15.4289 7.02751 15.4289 6.82749 15.4289 6.42746V3.71317C15.4289 3.31313 15.4289 3.11311 15.3511 2.96032C15.2826 2.82592 15.1733 2.71665 15.0389 2.64816C14.8861 2.57031 14.6861 2.57031 14.2861 2.57031H11.5718C11.1717 2.57031 10.9717 2.57031 10.8189 2.64816C10.6845 2.71665 10.5753 2.82592 10.5068 2.96032C10.4289 3.11311 10.4289 3.31313 10.4289 3.71317V6.42746C10.4289 6.82749 10.4289 7.02751 10.5068 7.18031C10.5753 7.31471 10.6845 7.42398 10.8189 7.49246C10.9717 7.57031 11.1717 7.57031 11.5718 7.57031ZM3.71463 7.57031H6.42892C6.82896 7.57031 7.02898 7.57031 7.18177 7.49246C7.31617 7.42398 7.42544 7.31471 7.49392 7.18031C7.57178 7.02751 7.57178 6.82749 7.57178 6.42746V3.71317C7.57178 3.31313 7.57178 3.11311 7.49392 2.96032C7.42544 2.82592 7.31617 2.71665 7.18177 2.64816C7.02898 2.57031 6.82896 2.57031 6.42892 2.57031H3.71463C3.3146 2.57031 3.11458 2.57031 2.96178 2.64816C2.82738 2.71665 2.71811 2.82592 2.64963 2.96032C2.57178 3.11311 2.57178 3.31313 2.57178 3.71317V6.42746C2.57178 6.82749 2.57178 7.02751 2.64963 7.18031C2.71811 7.31471 2.82738 7.42398 2.96178 7.49246C3.11458 7.57031 3.3146 7.57031 3.71463 7.57031ZM3.71463 15.4275H6.42892C6.82896 15.4275 7.02898 15.4275 7.18177 15.3496C7.31617 15.2811 7.42544 15.1719 7.49392 15.0374C7.57178 14.8847 7.57178 14.6846 7.57178 14.2846V11.5703C7.57178 11.1703 7.57178 10.9703 7.49392 10.8175C7.42544 10.6831 7.31617 10.5738 7.18177 10.5053C7.02898 10.4275 6.82896 10.4275 6.42892 10.4275H3.71463C3.3146 10.4275 3.11458 10.4275 2.96178 10.5053C2.82738 10.5738 2.71811 10.6831 2.64963 10.8175C2.57178 10.9703 2.57178 11.1703 2.57178 11.5703V14.2846C2.57178 14.6846 2.57178 14.8847 2.64963 15.0374C2.71811 15.1719 2.82738 15.2811 2.96178 15.3496C3.11458 15.4275 3.3146 15.4275 3.71463 15.4275Z"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      onClick: () => {
        navigate('SelectAddressScreen');
      }
    },
    {
      label: 'Send',
      icon: (
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.96951 16.0418V1.89964M8.96951 1.89964L1.89844 8.9707M8.96951 1.89964L16.0406 8.9707"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      onClick: () => {
        navigate('SelectNetworkScreen', { type: 'send' });
      }
    },
    {
      label: 'Explorer',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.9974 2.33366C6.21069 2.33366 2.33073 6.21362 2.33073 11.0003C2.33073 15.787 6.21069 19.667 10.9974 19.667C15.7841 19.667 19.6641 15.787 19.6641 11.0003C19.6641 6.21362 15.7841 2.33366 10.9974 2.33366ZM0.164062 11.0003C0.164062 5.01708 5.01415 0.166992 10.9974 0.166992C16.9806 0.166992 21.8307 5.01708 21.8307 11.0003C21.8307 16.9836 16.9806 21.8337 10.9974 21.8337C5.01415 21.8337 0.164062 16.9836 0.164062 11.0003Z"
            fill={isLight ? colors.black : colors.white}
          />
          <path
            d="M15.5099 6.31755C15.6521 6.45979 15.7519 6.6388 15.7981 6.83453C15.8443 7.03027 15.8351 7.235 15.7715 7.4258L13.8567 13.1713C13.8035 13.3308 13.7139 13.4758 13.595 13.5947C13.4761 13.7137 13.3311 13.8033 13.1715 13.8565L7.42606 15.7713C7.23518 15.8349 7.03034 15.8442 6.83451 15.7979C6.63867 15.7517 6.45958 15.6519 6.3173 15.5096C6.17502 15.3673 6.07518 15.1882 6.02896 14.9924C5.98275 14.7966 5.99199 14.5917 6.05564 14.4008L7.97098 8.65593C8.02416 8.49636 8.11376 8.35137 8.2327 8.23244C8.35163 8.11351 8.49662 8.0239 8.65618 7.97072L14.4016 6.05539C14.5925 5.9919 14.7973 5.98279 14.993 6.0291C15.1887 6.0754 15.3677 6.17528 15.5099 6.31755ZM9.85489 9.85464L8.79647 13.031L11.9723 11.972L13.0312 8.79622L9.85543 9.85518L9.85489 9.85464Z"
            fill={isLight ? colors.black : colors.white}
          />
        </svg>
      ),
      onClick: () => {
        window.open(`${sideChain.explorerUrl}/address/${currentAccount.address}`, '_blank');
      }
    },
    {
      label: 'Mempool',
      icon: (
        <svg width="22" height="22" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.1635 17.674C20.1635 19.0643 19.0423 20.1868 17.6536 20.1868H2.50998C1.12112 20.1868 0 19.0643 0 17.674V2.51309C0 1.12265 1.12949 0.000244141 2.50998 0.000244141H17.6536C19.0423 0.000244141 20.1635 1.12265 20.1635 2.51309V17.674Z"
            fill={isLight ? colors.black : colors.white}
          />
          <path
            opacity="0.3"
            d="M0 10.1187V17.6739C0 19.0643 1.12949 20.1867 2.51834 20.1867H17.6536C19.0423 20.1867 20.1719 19.0643 20.1719 17.6739V10.1187H0Z"
            fill={isLight ? colors.white : colors.black}
          />
          <path
            opacity="0.3"
            d="M17.7701 17.4895C17.7701 17.7993 17.5609 18.0507 17.3016 18.0507H14.6912C14.4318 18.0507 14.2227 17.7993 14.2227 17.4895V2.69719C14.2227 2.38728 14.4318 2.13599 14.6912 2.13599H17.3016C17.5609 2.13599 17.7701 2.38728 17.7701 2.69719V17.4895Z"
            fill={isLight ? colors.white : colors.black}
          />
        </svg>
      ),
      onClick: () => {
        window.open(`${blockStreamUrl}/address/${currentAccount.address}`, '_blank');
      }
    }
  ];

  return (
    <Layout
      style={{
        minHeight: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px',
        height: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px'
      }}>
      <MainHeader title={''} />
      <Column
        classname={'smooth-scroll fadeIn-page'}
        style={{
          flex: 1,
          gap: '0px',
          overflow: 'auto',
          cursor: 'pointer'
        }}>
        <Row
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          justifyCenter
          style={{
            marginTop: '36px',
            gap: '12px',
            alignItems: 'center'
          }}>
          {balanceVisible ? (
            <Row
              justifyCenter
              style={{
                gap: 0
              }}>
              <Text
                text="$"
                style={{
                  fontSize: '38px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  color: isLight ? colors.black : colors.white
                }}
              />
              <Text
                text={getTruncate(accountBalanceByUSD.split('.')[0], 0)}
                style={{
                  fontSize: '38px',
                  fontWeight: 700,
                  lineHeight: '32px',
                  color: isLight ? colors.black : colors.white
                }}
              />
              <Text
                color={'white_muted'}
                text={`.${accountBalanceByUSD.split('.')[1]}`}
                style={{
                  fontSize: '38px',
                  fontWeight: 700,
                  lineHeight: '32px',
                  color: isLight ? colors.black : colors.white
                }}
              />
            </Row>
          ) : (
            <Text
              text="******"
              style={{
                fontSize: '38px',
                fontWeight: 500,
                lineHeight: '32px',
                position: 'relative',
                top: '6px',
                color: isLight ? colors.black : colors.white
              }}
            />
          )}

          <span
            style={{
              display: 'inline-box',
              width: isHoveredMoney ? '20px' : '0',
              opacity: isHoveredMoney ? 1 : 0,
              transition: 'all 0.2s ease-in'
            }}
            onClick={() => setBalanceVisible(!balanceVisible)}>
            {balanceVisible ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="eye-off">
                  <path
                    id="Icon"
                    d="M8.95245 4.2436C9.29113 4.19353 9.64051 4.16667 10.0003 4.16667C14.2545 4.16667 17.0461 7.9207 17.9839 9.40569C18.0974 9.58542 18.1542 9.67528 18.1859 9.81389C18.2098 9.91799 18.2098 10.0822 18.1859 10.1863C18.1541 10.3249 18.097 10.4154 17.9827 10.5963C17.7328 10.9918 17.3518 11.5476 16.8471 12.1504M5.6036 5.59586C3.80187 6.81808 2.57871 8.51615 2.01759 9.4044C1.90357 9.58489 1.84656 9.67514 1.81478 9.81373C1.79091 9.91783 1.7909 10.082 1.81476 10.1861C1.84652 10.3247 1.90328 10.4146 2.01678 10.5943C2.95462 12.0793 5.74618 15.8333 10.0003 15.8333C11.7157 15.8333 13.1932 15.223 14.4073 14.3972M2.50035 2.5L17.5003 17.5M8.23258 8.23223C7.78017 8.68464 7.50035 9.30964 7.50035 10C7.50035 11.3807 8.61963 12.5 10.0003 12.5C10.6907 12.5 11.3157 12.2202 11.7681 11.7678"
                    stroke={isLight ? colors.black : colors.white}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.03354 21.1893C3.80656 20.8299 3.69307 20.6502 3.62954 20.373C3.58182 20.1648 3.58182 19.8365 3.62954 19.6283C3.69307 19.3511 3.80656 19.1714 4.03354 18.812C5.90922 15.8421 11.4923 8.33398 20.0007 8.33398C28.509 8.33398 34.0921 15.8421 35.9678 18.812C36.1948 19.1714 36.3083 19.3511 36.3718 19.6283C36.4195 19.8365 36.4195 20.1648 36.3718 20.373C36.3083 20.6502 36.1948 20.8299 35.9678 21.1893C34.0921 24.1593 28.509 31.6673 20.0007 31.6673C11.4923 31.6673 5.90922 24.1593 4.03354 21.1893Z"
                  stroke={isLight ? colors.black : colors.white}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.0007 25.0007C22.7621 25.0007 25.0007 22.7621 25.0007 20.0007C25.0007 17.2392 22.7621 15.0007 20.0007 15.0007C17.2392 15.0007 15.0007 17.2392 15.0007 20.0007C15.0007 22.7621 17.2392 25.0007 20.0007 25.0007Z"
                  stroke={isLight ? colors.black : colors.white}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </Row>

        <Row
          style={{
            justifyContent: 'center',
            gap: '12px'
          }}
          mt="xl"
          px="lg">
          {operateList.map((item) => {
            return (
              <div
                key={item.label}
                className={`flex flex-col items-center gap-[8px] group transition bg-item-hover-v2 ${
                  isLight ? 'light' : ''
                }`}
                onClick={() => {
                  item.onClick();
                }}>
                <div className="w-[75px] h-[66px] gap-2 pt-1 rounded-xl flex flex-col items-center justify-center transition">
                  {item.icon}
                  <Typography
                    sx={{
                      color: isLight ? colors.black : colors.white,
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '17px'
                    }}>
                    {item.label}
                  </Typography>
                </div>
              </div>
            );
          })}
        </Row>

        {networkType === NetworkType.MAINNET && (
          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              display: 'none',
              margin: '12px 12px 0',
              py: '4px',
              fontSize: '12px',
              fontWeight: 500,
              color: colors.grey12,
              bgcolor: colors.card_bgColor,
              borderRadius: '10px',
              transition: '.4s',
              ':hover': {
                bgcolor: colors.grey_dark
              }
            }}
            onClick={() => {
              navigate('RegisterEvmAddress');
            }}>
            Register for TGE
          </Stack>
        )}

        <Column my="lg" px="lg">
          <SideTokenList balanceVisible={balanceVisible} />
        </Column>
      </Column>

      {buyBtcModalVisible && (
        <BuyBTCModal
          onClose={() => {
            setBuyBtcModalVisible(false);
          }}
        />
      )}
      <Footer px="zero" py="zero">
        <NavTabBar tab="home" />
      </Footer>
    </Layout>
  );
}
