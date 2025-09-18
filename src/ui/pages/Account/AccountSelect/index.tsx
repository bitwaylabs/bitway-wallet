import { Drawer } from 'antd';
import { useState } from 'react';

import { Header, Icon, Row, Text } from '@/ui/components';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { shortAddress } from '@/ui/utils';

import KeyringSelect from '../KeyringSelect';
import SwitchAccountScreen from './SwitchAccountScreen';
import './index.less';

const AccountSelect = () => {
  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();
  const isLight = useIsLight();

  const [open, setOpen] = useState(false);

  return (
    <>
      <Row
        itemsCenter
        justifyCenter
        classname={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
        onClick={() => {
          setOpen(true);
        }}
        style={{
          padding: '5px 16px',
          borderRadius: '20px'
        }}>
        <Row
          itemsCenter
          justifyCenter
          style={{
            gap: '0'
          }}>
          <Text
            color="white_muted"
            text={currentKeyring.alianName}
            style={{
              fontSize: '14px',
              fontWeight: 600
            }}
          />

          <Text
            color={'white_muted'}
            text={'/'}
            size="xs"
            style={{
              fontSize: '14px'
            }}
          />
          <Text
            color={isLight ? 'black' : 'white'}
            text={shortAddress(currentAccount?.alianName, 8)}
            style={{
              fontSize: '14px',
              fontWeight: 600
            }}
          />
        </Row>
        <Icon icon="down" size={10} color={isLight ? 'black' : 'white'} />
      </Row>
      <Drawer
        title={null}
        placement="bottom"
        width={500}
        onClose={() => setOpen(false)}
        open={open}
        closable={false}
        headerStyle={{
          display: 'none'
        }}
        bodyStyle={{
          backgroundColor: isLight ? colors.white : colors.dark_bg,
          borderRadius: '10px 10px 0 0',
          border: `1px solid ${isLight ? colors.light_border : colors.dark_border}`
        }}>
        <Header
          title={<KeyringSelect />}
          RightComponent={
            <span
              className={`close-icon ${isLight ? 'light' : ''}`}
              style={{
                cursor: 'pointer',
                position: 'relative',
                right: '-25px',
                padding: '6px'
              }}
              onClick={() => setOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="x">
                  <path
                    id="Icon"
                    d="M17 7L7 17M7 7L17 17"
                    stroke={isLight ? colors.black : colors.white}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </span>
          }
        />

        <SwitchAccountScreen />
      </Drawer>
    </>
  );
};

export default AccountSelect;
