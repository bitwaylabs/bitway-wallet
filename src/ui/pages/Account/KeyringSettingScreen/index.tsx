import { useMemo } from 'react';
import { useLocation, useNavigate as useNavigateRouter } from 'react-router-dom';

import { KEYRING_TYPE } from '@/shared/constant';
import { Button, Column, Header, Layout, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Icon } from '@/ui/components/TokenCurrent';
import { useKeyrings } from '@/ui/state/keyrings/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

import { useNavigate } from '../../MainRoute';
import './index.less';

export default function () {
  const navigate = useNavigate();
  const navigateRouter = useNavigateRouter();
  const tools = useTools();
  const keyrings = useKeyrings();
  const isLight = useIsLight();
  const { state } = useLocation();
  const { index } = state as {
    index: number;
  };
  const keyring = useMemo(() => {
    return keyrings.find((item) => item.index === index);
  }, [keyrings]);
  return (
    <Layout>
      <Header title={keyring?.alianName} onBack={() => navigateRouter(-1)} />
      <Column
        style={{
          flex: 1,
          padding: '0 16px 24px'
        }}>
        <Column
          style={{
            flex: 1,
            gap: '10px',
            marginTop: '16px'
          }}>
          <div
            className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
            style={{
              height: '50px',
              padding: '0 10px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onClick={() => {
              navigate('EditWalletNameScreen', { keyring });
            }}>
            <Text
              text="Edit Wallet Name"
              color={isLight ? 'black' : 'white'}
              style={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '19px'
              }}
            />
            <Icon
              type="side-down"
              className={'hover-100'}
              style={{
                transform: 'rotate(-90deg)',
                opacity: '0.6',
                color: isLight ? colors.black : colors.white
              }}
            />
          </div>

          {keyring?.type === KEYRING_TYPE.HdKeyring && (
            <div
              className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
              style={{
                height: '50px',
                padding: '0 10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => {
                navigate('ExportMnemonicsScreen', { keyring });
              }}>
              <Text
                text="View Recovery Phrase"
                color={isLight ? 'black' : 'white'}
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '19px'
                }}
              />
              <Icon
                type="side-down"
                className={'hover-100'}
                style={{
                  transform: 'rotate(-90deg)',
                  opacity: '0.6',
                  color: isLight ? colors.black : colors.white
                }}
              />
            </div>
          )}
        </Column>
        <Button
          preset="ghostDanger"
          text={`Delete ${keyring?.alianName}`}
          onClick={() => {
            navigate('DeleteWalletScreen', { index: keyring?.index });
          }}
        />
      </Column>
    </Layout>
  );
}
