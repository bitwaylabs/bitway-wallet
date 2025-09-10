import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ADDRESS_TYPES, KEYRING_TYPE } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { IconTypes } from '@/ui/components/Icon';
import { Icon } from '@/ui/components/TokenCurrent';
import { getCurrentTab, useExtensionIsInTab, useOpenExtensionInTab } from '@/ui/features/browser/tabs';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useIsLight, useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { useWallet } from '@/ui/utils';

interface Setting {
  label?: string;
  value?: string;
  desc?: string;
  danger?: boolean;
  icon?: IconTypes | React.ReactNode;
  action: string;
  route: string;
  right: boolean;
}

export default function SettingsTabScreen() {
  const navigate = useNavigate();
  const networkType = useNetworkType();

  const isInTab = useExtensionIsInTab();

  const [connected, setConnected] = useState(false);

  const currentKeyring = useCurrentKeyring();
  const wallet = useWallet();
  const isLight = useIsLight();

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

  const SettingList: Setting[] = [
    {
      label: 'Address Type',
      value: 'Taproot',
      icon: (
        <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.25 34.5836L18.705 35.9474C19.1776 36.21 19.414 36.3413 19.6643 36.3928C19.8858 36.4383 20.1142 36.4383 20.3358 36.3928C20.586 36.3413 20.8224 36.21 21.2951 35.9474L23.75 34.5836M8.75 30.4169L6.37162 29.0956C5.87243 28.8182 5.62281 28.6796 5.44106 28.4823C5.28026 28.3078 5.15858 28.101 5.08414 27.8757C5 27.6211 5 27.3355 5 26.7645V24.1669M5 15.8336V13.236C5 12.6649 5 12.3794 5.08414 12.1247C5.15858 11.8994 5.28026 11.6926 5.44106 11.5181C5.62281 11.3209 5.87242 11.1822 6.37162 10.9049L8.75 9.58356M16.25 5.41689L18.705 4.05303C19.1776 3.79043 19.414 3.65913 19.6643 3.60766C19.8858 3.5621 20.1142 3.5621 20.3358 3.60766C20.586 3.65913 20.8224 3.79043 21.2951 4.05303L23.75 5.41689M31.25 9.58355L33.6284 10.9049C34.1276 11.1822 34.3772 11.3209 34.5589 11.5181C34.7197 11.6926 34.8414 11.8994 34.9159 12.1247C35 12.3794 35 12.6649 35 13.236V15.8336M35 24.1669V26.7645C35 27.3355 35 27.6211 34.9159 27.8757C34.8414 28.101 34.7197 28.3078 34.5589 28.4823C34.3772 28.6796 34.1276 28.8182 33.6284 29.0956L31.25 30.4169M16.25 17.9169L20 20.0002M20 20.0002L23.75 17.9169M20 20.0002V24.1669M5 11.6669L8.75 13.7502M31.25 13.7502L35 11.6669M20 32.5002V36.6669"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="3.58333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      desc: '',
      action: 'addressType',
      route: '/settings/address-type',
      right: true
    },

    {
      label: 'Network',
      value: networkType === NetworkType.MAINNET ? 'Mainnet' : 'Testnet',
      icon: (
        <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23.3337 18.3333H13.3337M16.667 24.9999H13.3337M26.667 11.6666H13.3337M33.3337 11.3333V28.6666C33.3337 31.4668 33.3337 32.867 32.7887 33.9365C32.3093 34.8773 31.5444 35.6423 30.6036 36.1216C29.5341 36.6666 28.1339 36.6666 25.3337 36.6666H14.667C11.8667 36.6666 10.4666 36.6666 9.39704 36.1216C8.45623 35.6423 7.69133 34.8773 7.21196 33.9365C6.66699 32.867 6.66699 31.4668 6.66699 28.6666V11.3333C6.66699 8.53299 6.66699 7.13286 7.21196 6.0633C7.69133 5.12249 8.45623 4.35759 9.39704 3.87822C10.4666 3.33325 11.8667 3.33325 14.667 3.33325H25.3337C28.1339 3.33325 29.5341 3.33325 30.6036 3.87822C31.5444 4.35759 32.3093 5.12249 32.7887 6.0633C33.3337 7.13286 33.3337 8.53299 33.3337 11.3333Z"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      desc: '',
      action: 'networkType',
      route: '/settings/network-type',
      right: true
    },

    {
      label: 'General',
      value: '',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      desc: '',
      action: 'general',
      route: '/settings/general',
      right: true
    },

    {
      label: 'Advance',
      value: '',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8ZM9 16L21 16M9 16C9 17.6569 7.65685 19 6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16Z"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      desc: '',
      action: 'advanced',
      route: '/settings/advanced',
      right: true
    },

    {
      label: 'Security',
      value: '',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      desc: '',
      action: 'security',
      route: '/settings/security',
      right: true
    },

    {
      label: 'About',
      value: '',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L10.6985 7.20599C10.4445 8.22185 10.3176 8.72978 10.0531 9.14309C9.81915 9.50868 9.50868 9.81915 9.14309 10.0531C8.72978 10.3176 8.22185 10.4445 7.20599 10.6985L2 12L7.20599 13.3015C8.22185 13.5555 8.72978 13.6824 9.14309 13.9469C9.50868 14.1808 9.81915 14.4913 10.0531 14.8569C10.3176 15.2702 10.4445 15.7782 10.6985 16.794L12 22L13.3015 16.794C13.5555 15.7782 13.6824 15.2702 13.9469 14.8569C14.1808 14.4913 14.4913 14.1808 14.8569 13.9469C15.2702 13.6824 15.7782 13.5555 16.794 13.3015L22 12L16.794 10.6985C15.7782 10.4445 15.2702 10.3176 14.8569 10.0531C14.4913 9.81915 14.1808 9.50868 13.9469 9.14309C13.6824 8.72978 13.5555 8.22185 13.3015 7.20599L12 2Z"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      desc: '',
      action: 'about',
      route: '/settings/about',

      right: true
    },
    {
      label: '',
      value: '',
      desc: ' Expand View',
      action: 'expand-view',
      route: '/settings/export-privatekey',
      right: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_48_7983)">
            <path
              d="M9.33398 14.6693H4.53398M4.53398 14.6693C3.41388 14.6693 2.85383 14.6693 2.426 14.4513C2.04968 14.2595 1.74372 13.9536 1.55197 13.5773C1.33398 13.1494 1.33398 12.5894 1.33398 11.4693M4.53398 14.6693H4.80065C5.92076 14.6693 6.48081 14.6693 6.90863 14.4513C7.28496 14.2595 7.59092 13.9536 7.78266 13.5773C8.00065 13.1494 8.00065 12.5894 8.00065 11.4693V11.2026C8.00065 10.0825 8.00065 9.52245 7.78266 9.09462C7.59092 8.7183 7.28496 8.41234 6.90863 8.22059C6.48081 8.0026 5.92076 8.0026 4.80065 8.0026H4.53398C3.41388 8.0026 2.85383 8.0026 2.426 8.22059C2.04968 8.41234 1.74372 8.7183 1.55197 9.09462C1.33398 9.52245 1.33398 10.0825 1.33398 11.2026V11.4693M1.33398 11.4693V6.66927M6.66732 1.33594H9.33398M14.6673 6.66927V9.33594M12.0007 14.6693C12.6206 14.6693 12.9306 14.6693 13.185 14.6011C13.8751 14.4162 14.4142 13.8771 14.5992 13.1869C14.6673 12.9326 14.6673 12.6226 14.6673 12.0026M14.6673 4.0026C14.6673 3.38262 14.6673 3.07263 14.5992 2.8183C14.4142 2.12812 13.8751 1.58902 13.185 1.40409C12.9306 1.33594 12.6206 1.33594 12.0007 1.33594M4.00065 1.33594C3.38067 1.33594 3.07068 1.33594 2.81635 1.40409C2.12616 1.58902 1.58707 2.12812 1.40213 2.8183C1.33398 3.07263 1.33398 3.38262 1.33398 4.0026"
              stroke={isLight ? colors.black : colors.black}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_48_7983">
              <rect width="16" height="16" fill={isLight ? colors.black : colors.black} />
            </clipPath>
          </defs>
        </svg>
      )
    },
    {
      label: '',
      value: '',
      desc: 'Lock',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.3327 7.33333V5.33333C11.3327 3.49238 9.8403 2 7.99935 2C6.1584 2 4.66602 3.49238 4.66602 5.33333V7.33333M5.86602 14H10.1327C11.2528 14 11.8128 14 12.2407 13.782C12.617 13.5903 12.9229 13.2843 13.1147 12.908C13.3327 12.4802 13.3327 11.9201 13.3327 10.8V10.5333C13.3327 9.41323 13.3327 8.85318 13.1147 8.42535C12.9229 8.04903 12.617 7.74307 12.2407 7.55132C11.8128 7.33333 11.2528 7.33333 10.1327 7.33333H5.86602C4.74591 7.33333 4.18586 7.33333 3.75803 7.55132C3.38171 7.74307 3.07575 8.04903 2.884 8.42535C2.66602 8.85318 2.66602 9.41323 2.66602 10.5333V10.8C2.66602 11.9201 2.66602 12.4802 2.884 12.908C3.07575 13.2843 3.38171 13.5903 3.75803 13.782C4.18586 14 4.74591 14 5.86602 14Z"
            stroke={isLight ? colors.black : colors.white}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      action: 'lock-wallet',
      route: '',
      right: false
    }
  ];

  const toRenderSettings = SettingList.filter((v) => {
    if (v.action == 'manage-wallet') {
      v.value = currentKeyring.alianName;
    }

    if (v.action == 'connected-sites') {
      v.value = connected ? 'Connected' : 'Not connected';
    }

    if (v.action == 'addressType') {
      const item = ADDRESS_TYPES[currentKeyring.addressType];

      const hdPath = currentKeyring.hdPath || item.hdPath;
      if (currentKeyring.type === KEYRING_TYPE.SimpleKeyring) {
        v.value = `${item.name}`;
      } else {
        // v.value = `${item.name} (${hdPath}/${currentAccount.index})`;
        v.value = `${item.name}`;
      }
    }

    if (v.action == 'expand-view') {
      if (isInTab) {
        return false;
      }
    }

    return true;
  });

  const openExtensionInTab = useOpenExtensionInTab();

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Setting"
      />
      <Content justifyBetween>
        <Column>
          <div>
            {toRenderSettings.map((item) => {
              if (!item.label) {
                return null;
              }
              return (
                <div
                  className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
                  key={item.action}
                  onClick={(e) => {
                    navigate(item.route);
                  }}
                  style={{
                    padding: '12px 6px',
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                  <Row full justifyBetween>
                    <Row itemsCenter>
                      {item.icon}
                      <Text
                        text={item.label || item.desc}
                        preset="regular"
                        style={{ whiteSpace: 'nowrap' }}
                        color={isLight ? 'black' : 'white'}
                      />
                    </Row>

                    <Row justifyEnd itemsCenter>
                      <Text
                        text={item.value}
                        preset="regular"
                        size="xs"
                        style={{ opacity: 0.5, textAlign: 'right' }}
                        color={isLight ? 'black' : 'white'}
                      />
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

        <Column>
          <div>
            {toRenderSettings.map((item) => {
              if (!item.label) {
                return (
                  <Button
                    key={item.action}
                    preset={item.action === 'expand-view' ? 'primary' : 'default'}
                    style={{ marginTop: spacing.small, height: 50 }}
                    text={item.desc}
                    onClick={(e) => {
                      if (item.action == 'expand-view') {
                        openExtensionInTab();
                        return;
                      }
                      if (item.action == 'lock-wallet') {
                        wallet.lockWallet();
                        navigate('/account/unlock');
                        return;
                      }
                      navigate(item.route);
                    }}
                    icon={item.icon as IconTypes}
                  />
                );
              }
              return null;
            })}
          </div>
        </Column>
      </Content>
    </Layout>
  );
}
