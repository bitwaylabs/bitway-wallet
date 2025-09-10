import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ADDRESS_TYPES, KEYRING_TYPE, NETWORK_TYPES } from '@/shared/constant';
import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { IconTypes } from '@/ui/components/Icon';
import { Icon } from '@/ui/components/TokenCurrent';
import { getCurrentTab, useExtensionIsInTab } from '@/ui/features/browser/tabs';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useChangeIsLightCallback, useIsLight, useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { useWallet } from '@/ui/utils';
import { Box, Stack } from '@mui/material';

// import { RightOutlined } from '@ant-design/icons';

interface Setting {
  label?: string;
  value?: string;
  desc?: string;
  danger?: boolean;
  icon?: IconTypes;
  action: string;
  route: string;
  right: boolean;
  rightComponent?: React.ReactNode;
}

export default function GeneralTabScreen() {
  const navigate = useNavigate();

  const networkType = useNetworkType();

  const isInTab = useExtensionIsInTab();
  const isLight = useIsLight();

  const [connected, setConnected] = useState(false);

  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();
  const wallet = useWallet();
  const changeIsLight = useChangeIsLightCallback();
  useEffect(() => {
    const run = async () => {
      const res = await getCurrentTab();
      if (!res) return;
      const site = await wallet.getCurrentConnectedSite(res.id);
      if (site) {
        setConnected(site.isConnected);
      }
    };
    run();
  }, []);

  const isCustomHdPath = useMemo(() => {
    const item = ADDRESS_TYPES[currentKeyring.addressType];
    return currentKeyring.hdPath !== '' && item.hdPath !== currentKeyring.hdPath;
  }, [currentKeyring]);

  const GeneralList: Setting[] = [
    {
      label: 'Language',
      value: 'English',
      desc: '',
      action: 'language',
      route: '/settings/language',
      right: true
    },

    {
      label: 'Currency',
      value: 'USD',
      desc: '',
      action: '',
      route: '/settings/currency',
      right: true
    },

    {
      label: 'Theme',
      value: 'Black',
      desc: '',
      action: '',
      route: '/settings/theme',
      right: false,
      rightComponent: (
        <Box
          sx={{
            position: 'relative',
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            p: '0 5px',
            boxSizing: 'border-box',
            borderRadius: '20px',
            backgroundColor: isLight ? colors.white : colors.black,
            cursor: 'pointer'
          }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap="16px"
            sx={{
              width: '100%',
              zIndex: 10
            }}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '30px',
                height: '30px',
                borderRadius: '20px'
              }}
              onClick={() => changeIsLight(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => changeIsLight(!isLight)}>
                <path
                  d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                  stroke={isLight ? colors.black : colors.white}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '30px',
                height: '30px',
                borderRadius: '20px'
              }}
              onClick={() => changeIsLight(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M20.293 12.9864C19.0929 13.8143 17.6406 14.1953 16.1887 14.0632C14.7367 13.9311 13.3771 13.2942 12.3461 12.2632C11.3152 11.2323 10.6783 9.87265 10.5462 8.42072C10.4141 6.96878 10.7951 5.51647 11.623 4.31641C10.1016 4.44676 8.64919 5.00897 7.43655 5.93687C6.22392 6.86477 5.30158 8.11975 4.77806 9.55411C4.25454 10.9885 4.15163 12.5425 4.48145 14.0334C4.81127 15.5243 5.56008 16.8899 6.63978 17.9696C7.71947 19.0493 9.08511 19.7981 10.576 20.1279C12.0668 20.4578 13.6209 20.3548 15.0553 19.8313C16.4896 19.3078 17.7446 18.3855 18.6725 17.1728C19.6004 15.9602 20.1626 14.5077 20.293 12.9864Z"
                  fill={colors.black}
                />
              </svg>
            </Stack>
          </Stack>
          <Box
            sx={{
              position: 'absolute',
              width: '30px',
              height: '30px',
              borderRadius: '20px',
              background: isLight ? colors.light_bg : colors.white,
              transition: '.4s',
              transform: `translateX(${isLight ? 0 : 46}px)`
            }}
          />
        </Box>
      )
    }
  ];

  const toRenderSettings = GeneralList.filter((v) => {
    if (v.action == 'manage-wallet') {
      v.value = currentKeyring.alianName;
    }

    if (v.action == 'connected-sites') {
      v.value = connected ? 'Connected' : 'Not connected';
    }

    if (v.action == 'networkType') {
      v.value = NETWORK_TYPES[networkType].label;
    }

    if (v.action == 'addressType') {
      const item = ADDRESS_TYPES[currentKeyring.addressType];
      const hdPath = currentKeyring.hdPath || item.hdPath;
      if (currentKeyring.type === KEYRING_TYPE.SimpleKeyring) {
        v.value = `${item.name}`;
      } else {
        v.value = `${item.name} (${hdPath}/${currentAccount.index})`;
      }
    }

    if (v.action == 'expand-view') {
      if (isInTab) {
        return false;
      }
    }

    return true;
  });

  const tools = useTools();

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="General"
      />
      <Content justifyBetween>
        <Column>
          <div>
            {toRenderSettings.map((item, index) => {
              if (!item.label) {
                return null;
              }
              return (
                <div
                  className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
                  key={item.action + index}
                  onClick={(e) => {
                    if (item.action == 'addressType') {
                      if (isCustomHdPath) {
                        tools.showTip(
                          'The wallet currently uses a custom HD path and does not support switching address types.'
                        );
                        return;
                      }
                      navigate('/settings/address-type');
                      return;
                    }
                    if (item.right && item.route) {
                      navigate(item.route);
                    }
                  }}
                  style={{
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    borderRadius: '8px',
                    marginTop: '12px',
                    cursor: 'pointer'
                  }}>
                  <Row full justifyBetween itemsCenter>
                    <Text text={item.label || item.desc} preset="regular-bold" color={isLight ? 'black' : 'white'} />

                    <Row itemsCenter>
                      {item.rightComponent}
                      {/*{item.right && (*/}
                      {/*  <>*/}
                      {/*    <Text text={item.value} preset="regular" style={{ opacity: 0.5 }} />*/}
                      {/*    <RightOutlined style={{ color: 'rgb(107,107,107)', fontSize: '14px' }} />*/}
                      {/*  </>*/}
                      {/*)}*/}

                      {item.right && (
                        <Icon
                          type="side-down"
                          className={'hover-100'}
                          style={{
                            transform: 'rotate(-90deg)',
                            opacity: '0.6',
                            color: isLight ? colors.black : colors.white
                          }}
                        />
                      )}
                    </Row>
                  </Row>
                </div>
              );
            })}
          </div>
        </Column>
      </Content>
    </Layout>
  );
}
