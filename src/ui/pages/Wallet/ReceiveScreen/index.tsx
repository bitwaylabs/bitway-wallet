import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import { Button, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard } from '@/ui/utils';

import './index.less';

export default function ReceiveScreen() {
  const { state } = useLocation();
  const isLight = useIsLight();
  const { chain, token, addressType, address } = state as {
    chain: CHAINS_ENUM;
    token: BalanceItem;
    addressType: string;
    address: string;
  };
  const [isClickCopy, setIsClickCopy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Layout>
      <Header title="Receive" />
      <Content
        style={{
          marginTop: '32px'
        }}>
        <Column full itemsCenter style={{ position: 'relative' }}>
          <QRCodeSVG
            style={{
              borderRadius: '10px'
            }}
            bgColor={isLight ? colors.white : colors.black}
            fgColor={isLight ? colors.black : colors.white}
            value={address || ''}
            size={140}></QRCodeSVG>

          <Row itemsCenter mt="lg" mb="lg">
            <Text
              color={isLight ? 'black' : 'white'}
              size="md"
              text={`Your ${chain === CHAINS_ENUM.BTC ? 'Bitcoin' : 'Bitway'} (${addressType}) Address`}></Text>
          </Row>

          <Row
            fullX
            px="lg"
            py="lg"
            itemsCenter
            style={{ borderRadius: '10px' }}
            classname={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}>
            <Text color={isLight ? 'black' : 'white'} size="sm" wrap text={address}></Text>
          </Row>

          <Row
            onClick={(e) => {
              copyToClipboard(address).then(() => {
                // tools.toastSuccess('Copied');
                setTimeout(() => {
                  setIsClickCopy(false);
                }, 3000);
              });
              setIsClickCopy(true);
            }}
            fullX
            px="lg"
            classname={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
            py="lg"
            itemsCenter
            style={{ borderRadius: '10px' }}
            justifyCenter>
            <Icon
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
              color={isClickCopy ? 'primary' : isHovered ? 'main' : isLight ? 'black' : 'white'}
              containerStyle={{
                display: 'inline-block',
                position: 'relative'
              }}></Icon>
            <Text
              color={isClickCopy ? 'primary' : isLight ? 'black' : 'white'}
              size="sm"
              text={isClickCopy ? 'Copied' : 'Copy'}></Text>
          </Row>

          <Row fullX style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} mt="lg">
            <Button
              onClick={() => {
                window.history.go(-1);
              }}
              preset="default"
              text="Close"
              full></Button>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
