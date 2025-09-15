import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ADDRESS_TYPES, CHAINS_ENUM } from '@/shared/constant';
import { AddressType } from '@/shared/types';
import { Column, Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard, satoshisToAmount, shortAddress, useWallet } from '@/ui/utils';
import { Box } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function SelecAddressScreen() {
  // TODO: set select network

  const wallet = useWallet();
  const { sideChain } = useEnvironment();
  const currentKeyring = useCurrentKeyring();
  const account = useCurrentAccount();
  const { state } = useLocation();
  const navigate = useNavigate();
  const tools = useTools();
  const isLight = useIsLight();
  const [addresses, setAddresses] = useState<string[]>([]);
  const [addressAssets, setAddressAssets] = useState<{
    [key: string]: { total_btc: string; satoshis: number; total_inscription: number };
  }>({});
  const selfRef = useRef<{
    addressAssets: { [key: string]: { total_btc: string; satoshis: number; total_inscription: number } };
  }>({
    addressAssets: {}
  });

  const [ClickCopy, setClickCopy] = useState('');

  const [copyChain, setCopyChain] = useState('');

  function copy(str: string, chain: string) {
    copyToClipboard(str).then(() => {
      setClickCopy(str);
      setCopyChain(chain);
    });
  }

  useEffect(() => {
    return () => setClickCopy('');
  }, []);

  const self = selfRef.current;

  const loadAddresses = async () => {
    tools.showLoading(true);

    const _res = await wallet.getAllAddresses(currentKeyring, account.index || 0);
    setAddresses(_res);
    const balances = await wallet.getMultiAddressAssets(_res.join(','));
    for (let i = 0; i < _res.length; i++) {
      const address = _res[i];
      const balance = balances[i];
      const satoshis = balance.totalSatoshis;
      self.addressAssets[address] = {
        total_btc: satoshisToAmount(balance.totalSatoshis),
        satoshis,
        total_inscription: balance.inscriptionCount
      };
    }
    setAddressAssets(self.addressAssets);

    tools.showLoading(false);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const displayAddress = ADDRESS_TYPES.filter((v) => v.value == AddressType.P2WPKH || v.value === AddressType.P2TR);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select address type"
      />
      <Content>
        <Column mt="lg">
          {displayAddress.map((item) => {
            const address = addresses[item.value];
            return (
              <Row
                itemsCenter
                justifyBetween
                style={{
                  cursor: 'pointer',
                  backgroundColor: isLight ? colors.light_bg : colors.dark_bg,
                  padding: '10px 16px',
                  borderRadius: 10
                }}
                classname={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
                full
                key={item.value}>
                <Row itemsCenter>
                  <Box
                    p={'2px'}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '100%'
                    }}>
                    <Image src="https://api.bitway.com/static/token/logo/btc.svg" size={28}></Image>
                  </Box>

                  <Column gap={'zero'}>
                    <Text
                      style={{
                        whiteSpace: 'nowrap'
                      }}
                      preset="regular"
                      text={'Bitcoin' + ' ' + `(${item.name})`}
                      color={isLight ? 'black' : 'white'}></Text>

                    <Row itemsCenter gap="sm">
                      {ClickCopy === address && copyChain == 'bitcoin' && (
                        <Icon icon="check-circle-broken" color="green_success" size={16}></Icon>
                      )}

                      <Text
                        preset="sub"
                        color={ClickCopy === address && copyChain == 'bitcoin' ? 'green_success' : 'grey2'}
                        text={
                          ClickCopy === address && copyChain == 'bitcoin' ? 'Copied' : shortAddress(address)
                        }></Text>
                    </Row>
                  </Column>
                </Row>

                <Row>
                  <Box
                    sx={{
                      borderRadius: '100%',
                      p: 1,
                      bgcolor: isLight ? colors.white : colors.black,
                      '&:hover': {
                        bgcolor: colors.main
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      navigate('ReceiveScreen', {
                        ...state,
                        address,
                        addressType: item.name,
                        chain: CHAINS_ENUM.BTC
                      });
                    }}>
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.07178 5.07031H5.07892M12.9289 5.07031H12.9361M5.07178 12.9275H5.07892M9.71463 9.71317H9.72178M12.9289 12.9275H12.9361M12.5718 15.4275H15.4289V12.5703M10.4289 12.2132V15.4275M15.4289 10.4275H12.2146M11.5718 7.57031H14.2861C14.6861 7.57031 14.8861 7.57031 15.0389 7.49246C15.1733 7.42398 15.2826 7.31471 15.3511 7.18031C15.4289 7.02751 15.4289 6.82749 15.4289 6.42746V3.71317C15.4289 3.31313 15.4289 3.11311 15.3511 2.96032C15.2826 2.82592 15.1733 2.71665 15.0389 2.64816C14.8861 2.57031 14.6861 2.57031 14.2861 2.57031H11.5718C11.1717 2.57031 10.9717 2.57031 10.8189 2.64816C10.6845 2.71665 10.5753 2.82592 10.5068 2.96032C10.4289 3.11311 10.4289 3.31313 10.4289 3.71317V6.42746C10.4289 6.82749 10.4289 7.02751 10.5068 7.18031C10.5753 7.31471 10.6845 7.42398 10.8189 7.49246C10.9717 7.57031 11.1717 7.57031 11.5718 7.57031ZM3.71463 7.57031H6.42892C6.82896 7.57031 7.02898 7.57031 7.18177 7.49246C7.31617 7.42398 7.42544 7.31471 7.49392 7.18031C7.57178 7.02751 7.57178 6.82749 7.57178 6.42746V3.71317C7.57178 3.31313 7.57178 3.11311 7.49392 2.96032C7.42544 2.82592 7.31617 2.71665 7.18177 2.64816C7.02898 2.57031 6.82896 2.57031 6.42892 2.57031H3.71463C3.3146 2.57031 3.11458 2.57031 2.96178 2.64816C2.82738 2.71665 2.71811 2.82592 2.64963 2.96032C2.57178 3.11311 2.57178 3.31313 2.57178 3.71317V6.42746C2.57178 6.82749 2.57178 7.02751 2.64963 7.18031C2.71811 7.31471 2.82738 7.42398 2.96178 7.49246C3.11458 7.57031 3.3146 7.57031 3.71463 7.57031ZM3.71463 15.4275H6.42892C6.82896 15.4275 7.02898 15.4275 7.18177 15.3496C7.31617 15.2811 7.42544 15.1719 7.49392 15.0374C7.57178 14.8847 7.57178 14.6846 7.57178 14.2846V11.5703C7.57178 11.1703 7.57178 10.9703 7.49392 10.8175C7.42544 10.6831 7.31617 10.5738 7.18177 10.5053C7.02898 10.4275 6.82896 10.4275 6.42892 10.4275H3.71463C3.3146 10.4275 3.11458 10.4275 2.96178 10.5053C2.82738 10.5738 2.71811 10.6831 2.64963 10.8175C2.57178 10.9703 2.57178 11.1703 2.57178 11.5703V14.2846C2.57178 14.6846 2.57178 14.8847 2.64963 15.0374C2.71811 15.1719 2.82738 15.2811 2.96178 15.3496C3.11458 15.4275 3.3146 15.4275 3.71463 15.4275Z"
                        stroke={isLight ? colors.black : colors.white}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>

                  <Box
                    sx={{
                      borderRadius: '100%',
                      p: 1,
                      bgcolor: isLight ? colors.white : colors.black,
                      '&:hover': {
                        bgcolor: colors.main
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      copy(address, 'bitcoin');
                    }}>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="copy-03" clipPath="url(#clip0_133_1133)">
                        <path
                          id="Icon"
                          d="M5.33203 5.33594V3.46927C5.33203 2.72253 5.33203 2.34917 5.47736 2.06395C5.60519 1.81307 5.80916 1.60909 6.06004 1.48126C6.34526 1.33594 6.71863 1.33594 7.46536 1.33594H12.532C13.2788 1.33594 13.6521 1.33594 13.9374 1.48126C14.1882 1.60909 14.3922 1.81307 14.52 2.06395C14.6654 2.34917 14.6654 2.72253 14.6654 3.46927V8.53594C14.6654 9.28267 14.6654 9.65604 14.52 9.94126C14.3922 10.1921 14.1882 10.3961 13.9374 10.5239C13.6521 10.6693 13.2788 10.6693 12.532 10.6693H10.6654M3.46536 14.6693H8.53203C9.27877 14.6693 9.65214 14.6693 9.93735 14.5239C10.1882 14.3961 10.3922 14.1921 10.52 13.9413C10.6654 13.656 10.6654 13.2827 10.6654 12.5359V7.46927C10.6654 6.72253 10.6654 6.34917 10.52 6.06395C10.3922 5.81307 10.1882 5.60909 9.93735 5.48126C9.65214 5.33594 9.27877 5.33594 8.53203 5.33594H3.46536C2.71863 5.33594 2.34526 5.33594 2.06004 5.48126C1.80916 5.60909 1.60519 5.81307 1.47736 6.06395C1.33203 6.34917 1.33203 6.72253 1.33203 7.46927V12.5359C1.33203 13.2827 1.33203 13.656 1.47736 13.9413C1.60519 14.1921 1.80916 14.3961 2.06004 14.5239C2.34526 14.6693 2.71863 14.6693 3.46536 14.6693Z"
                          stroke={isLight ? colors.black : colors.white}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_133_1133">
                          <rect width="16" height="16" fill={isLight ? colors.white : colors.black} />
                        </clipPath>
                      </defs>
                    </svg>
                  </Box>
                </Row>
              </Row>
            );
          })}

          {displayAddress.map((item) => {
            const address = addresses[item.value];
            return (
              <Row
                itemsCenter
                justifyBetween
                style={{
                  cursor: 'pointer',
                  backgroundColor: isLight ? colors.light_bg : colors.dark_bg,
                  padding: '10px 16px',
                  borderRadius: 10
                }}
                full
                key={item.value}>
                <Row itemsCenter>
                  <Image
                    src={'https://api.bitway.com/static/token/logo/bitway-black.png'}
                    size={32}
                    style={{
                      borderRadius: '50%'
                    }}></Image>

                  <Column gap={'zero'}>
                    <Text
                      style={{
                        whiteSpace: 'nowrap'
                      }}
                      preset="regular"
                      text={'Bitway' + ' ' + `(${item.name})`}
                      color={isLight ? 'black' : 'white'}></Text>

                    <Row itemsCenter gap="sm">
                      {ClickCopy === address && copyChain == 'side' && (
                        <Icon icon="check-circle-broken" color="green_success" size={16}></Icon>
                      )}

                      <Text
                        preset="sub"
                        color={ClickCopy === address && copyChain == 'side' ? 'green_success' : 'grey2'}
                        text={ClickCopy === address && copyChain == 'side' ? 'Copied' : shortAddress(address)}></Text>
                    </Row>
                  </Column>
                </Row>

                <Row>
                  <Box
                    onClick={() => {
                      navigate('ReceiveScreen', {
                        ...state,
                        address,
                        addressType: item.name,
                        chain: CHAINS_ENUM.BITWAY
                      });
                    }}
                    sx={{
                      borderRadius: '100%',
                      p: 1,
                      bgcolor: isLight ? colors.white : colors.black,
                      '&:hover': {
                        bgcolor: colors.main
                      },
                      cursor: 'pointer'
                    }}>
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.07178 5.07031H5.07892M12.9289 5.07031H12.9361M5.07178 12.9275H5.07892M9.71463 9.71317H9.72178M12.9289 12.9275H12.9361M12.5718 15.4275H15.4289V12.5703M10.4289 12.2132V15.4275M15.4289 10.4275H12.2146M11.5718 7.57031H14.2861C14.6861 7.57031 14.8861 7.57031 15.0389 7.49246C15.1733 7.42398 15.2826 7.31471 15.3511 7.18031C15.4289 7.02751 15.4289 6.82749 15.4289 6.42746V3.71317C15.4289 3.31313 15.4289 3.11311 15.3511 2.96032C15.2826 2.82592 15.1733 2.71665 15.0389 2.64816C14.8861 2.57031 14.6861 2.57031 14.2861 2.57031H11.5718C11.1717 2.57031 10.9717 2.57031 10.8189 2.64816C10.6845 2.71665 10.5753 2.82592 10.5068 2.96032C10.4289 3.11311 10.4289 3.31313 10.4289 3.71317V6.42746C10.4289 6.82749 10.4289 7.02751 10.5068 7.18031C10.5753 7.31471 10.6845 7.42398 10.8189 7.49246C10.9717 7.57031 11.1717 7.57031 11.5718 7.57031ZM3.71463 7.57031H6.42892C6.82896 7.57031 7.02898 7.57031 7.18177 7.49246C7.31617 7.42398 7.42544 7.31471 7.49392 7.18031C7.57178 7.02751 7.57178 6.82749 7.57178 6.42746V3.71317C7.57178 3.31313 7.57178 3.11311 7.49392 2.96032C7.42544 2.82592 7.31617 2.71665 7.18177 2.64816C7.02898 2.57031 6.82896 2.57031 6.42892 2.57031H3.71463C3.3146 2.57031 3.11458 2.57031 2.96178 2.64816C2.82738 2.71665 2.71811 2.82592 2.64963 2.96032C2.57178 3.11311 2.57178 3.31313 2.57178 3.71317V6.42746C2.57178 6.82749 2.57178 7.02751 2.64963 7.18031C2.71811 7.31471 2.82738 7.42398 2.96178 7.49246C3.11458 7.57031 3.3146 7.57031 3.71463 7.57031ZM3.71463 15.4275H6.42892C6.82896 15.4275 7.02898 15.4275 7.18177 15.3496C7.31617 15.2811 7.42544 15.1719 7.49392 15.0374C7.57178 14.8847 7.57178 14.6846 7.57178 14.2846V11.5703C7.57178 11.1703 7.57178 10.9703 7.49392 10.8175C7.42544 10.6831 7.31617 10.5738 7.18177 10.5053C7.02898 10.4275 6.82896 10.4275 6.42892 10.4275H3.71463C3.3146 10.4275 3.11458 10.4275 2.96178 10.5053C2.82738 10.5738 2.71811 10.6831 2.64963 10.8175C2.57178 10.9703 2.57178 11.1703 2.57178 11.5703V14.2846C2.57178 14.6846 2.57178 14.8847 2.64963 15.0374C2.71811 15.1719 2.82738 15.2811 2.96178 15.3496C3.11458 15.4275 3.3146 15.4275 3.71463 15.4275Z"
                        stroke={isLight ? colors.black : colors.white}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>

                  <Box
                    sx={{
                      borderRadius: '100%',
                      p: 1,
                      bgcolor: isLight ? colors.white : colors.black,
                      '&:hover': {
                        bgcolor: colors.main
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      copy(address, 'side');
                    }}>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="copy-03" clipPath="url(#clip0_133_1133)">
                        <path
                          id="Icon"
                          d="M5.33203 5.33594V3.46927C5.33203 2.72253 5.33203 2.34917 5.47736 2.06395C5.60519 1.81307 5.80916 1.60909 6.06004 1.48126C6.34526 1.33594 6.71863 1.33594 7.46536 1.33594H12.532C13.2788 1.33594 13.6521 1.33594 13.9374 1.48126C14.1882 1.60909 14.3922 1.81307 14.52 2.06395C14.6654 2.34917 14.6654 2.72253 14.6654 3.46927V8.53594C14.6654 9.28267 14.6654 9.65604 14.52 9.94126C14.3922 10.1921 14.1882 10.3961 13.9374 10.5239C13.6521 10.6693 13.2788 10.6693 12.532 10.6693H10.6654M3.46536 14.6693H8.53203C9.27877 14.6693 9.65214 14.6693 9.93735 14.5239C10.1882 14.3961 10.3922 14.1921 10.52 13.9413C10.6654 13.656 10.6654 13.2827 10.6654 12.5359V7.46927C10.6654 6.72253 10.6654 6.34917 10.52 6.06395C10.3922 5.81307 10.1882 5.60909 9.93735 5.48126C9.65214 5.33594 9.27877 5.33594 8.53203 5.33594H3.46536C2.71863 5.33594 2.34526 5.33594 2.06004 5.48126C1.80916 5.60909 1.60519 5.81307 1.47736 6.06395C1.33203 6.34917 1.33203 6.72253 1.33203 7.46927V12.5359C1.33203 13.2827 1.33203 13.656 1.47736 13.9413C1.60519 14.1921 1.80916 14.3961 2.06004 14.5239C2.34526 14.6693 2.71863 14.6693 3.46536 14.6693Z"
                          stroke={isLight ? colors.black : colors.white}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_133_1133">
                          <rect width="16" height="16" fill={isLight ? colors.white : colors.black} />
                        </clipPath>
                      </defs>
                    </svg>
                  </Box>
                </Row>
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
