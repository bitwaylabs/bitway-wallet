import { SIDE_CHAIN_MAINNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useReloadAccounts } from '@/ui/state/accounts/hooks';
import { useChangeEnvironmentCallback } from '@/ui/state/environment/hooks';
import { useChangeNetworkTypeCallback, useIsLight, useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

import { useNavigate } from '../MainRoute';

export default function NetworkTypeScreen() {
  const networkType = useNetworkType();
  const changeEnvironment = useChangeEnvironmentCallback();
  const changeNetworkType = useChangeNetworkTypeCallback();
  const reloadAccounts = useReloadAccounts();
  const navigate = useNavigate();
  const isLight = useIsLight();
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Switch Network"
      />
      <Content
        style={{
          padding: '0 16px',
          marginTop: 16
        }}>
        <Column gap={'md'}>
          <Row
            rounded
            style={{
              height: 56,
              padding: '16px 10px',
              backgroundColor:
                networkType === NetworkType.MAINNET
                  ? colors.backgroundChoose
                  : isLight
                  ? colors.light_bg
                  : colors.dark_bg,
              border: `1px solid ${
                networkType === NetworkType.MAINNET
                  ? colors.backgroundChoose
                  : isLight
                  ? colors.light_border
                  : colors.dark_border
              }`
            }}
            full
            justifyBetween
            itemsCenter
            onClick={async () => {
              if (networkType === NetworkType.MAINNET) return;
              await changeEnvironment(NetworkType.MAINNET);
              await changeNetworkType(NetworkType.MAINNET);
              reloadAccounts();
              navigate('MainScreen');
            }}>
            <Row itemsCenter>
              <Text text={`${SIDE_CHAIN_MAINNET.name} & Bitcoin (Mainnet)`} color={isLight ? 'black' : 'white'} />
            </Row>
            {networkType === NetworkType.MAINNET && (
              <Column>
                <Icon color={'primary'} contain={'contain'} icon="check-circle" />
              </Column>
            )}
          </Row>

          <Row
            rounded
            style={{
              height: 56,
              padding: '16px 10px',
              backgroundColor:
                networkType === NetworkType.TESTNET
                  ? colors.backgroundChoose
                  : isLight
                  ? colors.light_bg
                  : colors.dark_bg,
              border: `1px solid ${
                networkType === NetworkType.TESTNET
                  ? colors.backgroundChoose
                  : isLight
                  ? colors.light_border
                  : colors.dark_border
              }`
            }}
            full
            justifyBetween
            itemsCenter
            onClick={async () => {
              if (networkType === NetworkType.TESTNET) return;
              await changeEnvironment(NetworkType.TESTNET);
              await changeNetworkType(NetworkType.TESTNET);
              reloadAccounts();
              navigate('MainScreen');
            }}>
            <Row itemsCenter>
              <Text text={`${SIDE_CHAIN_MAINNET.name} & Bitcoin (Testnet)`} color={isLight ? 'black' : 'white'} />
            </Row>
            {networkType === NetworkType.TESTNET && (
              <Column>
                <Icon color={'primary'} contain={'contain'} icon="check-circle" />
              </Column>
            )}
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
