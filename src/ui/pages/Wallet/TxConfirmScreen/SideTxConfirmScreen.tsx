import BigNumber from 'bignumber.js';

import { Button, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useSend } from '@/ui/hooks/useSend';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import { formatUnitAmount } from '@/ui/utils';
import { LoadingOutlined } from '@ant-design/icons';

export default function SideTxConfirmScreen() {
  const { handleSubmit, loading, curToken, feeToken, memo, inputAmount, toInfo, fee } = useSend();
  const isLight = useIsLight();

  const feeByUSD = new BigNumber(formatUnitAmount(fee, feeToken?.asset.exponent || 6))
    .multipliedBy(feeToken?.denomPrice || '0')
    .toFixed(2);

  if (!curToken) {
    return <Layout />;
  }

  if (loading) {
    return (
      <Layout>
        <Content itemsCenter justifyCenter>
          <Icon size={fontSizes.xxxl} color="primary">
            <LoadingOutlined />
          </Icon>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{}}>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Confirm Transaction"
      />
      <Column
        style={{
          flex: 1,
          padding: '40px 16px 24px'
        }}>
        <Column
          style={{
            flex: 1,
            gap: '10px'
          }}>
          <Row
            justifyBetween
            style={{
              alignItems: 'center',
              padding: '11px 16px',
              backgroundColor: isLight ? colors.light_bg : colors.dark_bg,
              borderRadius: '14px'
            }}>
            <Row
              style={{
                alignItems: 'center'
              }}>
              <ImageIcon
                url={curToken.asset.logo}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%'
                }}
              />
              <Text
                text={curToken.asset.symbol}
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  color: isLight ? 'black' : 'white'
                }}
              />
            </Row>
            <Text
              text={inputAmount}
              style={{
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '24px',
                color: isLight ? 'black' : 'white'
              }}
            />
          </Row>
          <Column
            justifyBetween
            style={{
              padding: '16px',
              backgroundColor: isLight ? colors.light_bg : colors.dark_bg,
              borderRadius: '14px',
              overflow: 'hidden'
            }}>
            <Text
              text="Recipient"
              color="white_muted"
              style={{
                fontSize: '14px',
                lineHeight: '24px'
              }}
            />
            <Text
              text={toInfo.address}
              style={{
                fontSize: '14px',
                lineHeight: '16px',
                wordBreak: 'break-all',
                color: isLight ? 'black' : 'white'
              }}
            />
          </Column>

          <Column
            justifyBetween
            style={{
              padding: '16px',
              backgroundColor: isLight ? colors.light_bg : colors.dark_bg,
              borderRadius: '14px',
              overflow: 'hidden'
            }}>
            <Text
              text="Memo"
              color="white_muted"
              style={{
                fontSize: '14px',
                lineHeight: '24px'
              }}
            />
            <Text
              text={memo}
              style={{
                fontSize: '14px',
                lineHeight: '16px',
                color: isLight ? 'black' : 'white'
              }}
            />
          </Column>
        </Column>
        <Row
          justifyBetween
          style={{
            padding: '14px 12px',
            borderRadius: '10px',
            backgroundColor: isLight ? colors.light_bg : colors.dark_bg
          }}>
          <Text
            text="Tx Fee:"
            style={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '24px',
              color: isLight ? 'black' : 'white'
            }}
          />
          <Row>
            <Text
              text={`${formatUnitAmount(fee, feeToken?.asset.exponent || 6)} ${feeToken?.asset.symbol}`}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '24px',
                color: isLight ? 'black' : 'white'
              }}
            />
            <Text
              text={`($${feeByUSD})`}
              color="white_muted"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                color: isLight ? 'black' : 'white'
              }}
            />
          </Row>
        </Row>
        <Button preset="primary" text="Confirm" onClick={() => handleSubmit()} />
      </Column>
    </Layout>
  );
}
