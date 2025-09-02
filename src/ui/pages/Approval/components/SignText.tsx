import { useState } from 'react';

import { KEYRING_TYPE } from '@/shared/constant';
import { Button, Card, Column, Content, Footer, Layout, Row, Text } from '@/ui/components';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { useApproval } from '@/ui/utils';

import KeystoneSignScreen from '../../Wallet/KeystoneSignScreen';

interface Props {
  params: {
    data: {
      text: string;
      type: string;
    };
    session: {
      origin: string;
      icon: string;
      name: string;
    };
  };
}
export default function SignText({ params: { data, session } }: Props) {
  const currentAccount = useCurrentAccount();

  const currentKeyring = useCurrentKeyring();
  const isLight = useIsLight();

  const [getApproval, resolveApproval, rejectApproval] = useApproval();
  const account = useCurrentAccount();
  const [isKeystoneSigning, setIsKeystoneSigning] = useState(false);

  const handleCancel = () => {
    rejectApproval();
  };

  const handleConfirm = () => {
    if (account.type === KEYRING_TYPE.KeystoneKeyring) {
      setIsKeystoneSigning(true);
      return;
    }
    resolveApproval();
  };
  if (isKeystoneSigning) {
    return (
      <KeystoneSignScreen
        type={data.type === 'bip322-simple' ? 'bip322-simple' : 'msg'}
        data={data.text}
        onSuccess={({ signature }) => {
          resolveApproval({ signature });
        }}
        onBack={() => {
          setIsKeystoneSigning(false);
        }}
      />
    );
  }
  return (
    <Layout
      style={{
        minHeight: '560px',
        height: '560px'
      }}>
      <Content>
        <Column
          itemsCenter
          style={{
            paddingBottom: '4px'
          }}>
          <Text
            textCenter
            size="xl"
            style={{
              fontWeight: '600',
              color: isLight ? colors.black : colors.white
            }}>
            Signature request
          </Text>

          <Text
            textCenter
            style={{
              color: colors.grey2,
              borderRadius: '8px',
              padding: '4px 16px',
              backgroundColor: isLight ? colors.light_bg : colors.dark_bg,
              fontSize: '14px',
              maxWidth: 'max-content'
            }}
            classname="">
            {session.origin}
          </Text>
        </Column>

        <Row
          itemsCenter
          justifyBetween
          mt="md"
          style={{
            background: isLight ? colors.light_bg : colors.dark_bg,
            padding: '16px 10px 16px 10px',
            borderRadius: '8px',
            position: 'relative'
          }}>
          <Column
            style={{
              width: '90%'
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: '16px',
                color: isLight ? colors.black : colors.white
              }}>
              Account connected
            </Text>

            <Text
              size="sm"
              style={{
                color: isLight ? colors.black : colors.white,
                opacity: '0.5',
                wordBreak: 'break-word'
              }}>
              {currentAccount.address}
            </Text>

            <Row
              itemsCenter
              style={{
                gap: '4px',
                borderRadius: '10px',
                backgroundColor: colors.primary,
                padding: '4px 10px',
                fontSize: '12px',
                width: 'max-content',
                color: isLight ? colors.black : colors.white
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  color: isLight ? colors.black : colors.white
                }}
                size="xs">
                {currentKeyring.alianName}
              </Text>

              <Text
                style={{
                  fontWeight: '600',
                  color: isLight ? colors.black : colors.white
                }}
                size="xs">
                /
              </Text>

              <Text
                style={{
                  color: isLight ? colors.black : colors.white
                }}
                size="xs">
                {currentAccount.alianName}
              </Text>
            </Row>
          </Column>
        </Row>

        <Column>
          <Text
            text="Only sign this message if you fully understand the content and trust the requesting site."
            preset="sub"
            textCenter
            mt="lg"
          />

          <Card
            style={{
              flexDirection: 'column'
            }}>
            <Text text="You are signing:" textCenter mt="lg" color={isLight ? 'black' : 'white'} />
            <div
              style={{
                userSelect: 'text',
                maxHeight: 384,
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                flexWrap: 'wrap',
                lineHeight: '18px',
                color: isLight ? colors.black : colors.white
              }}>
              {data.text}
            </div>
          </Card>
        </Column>
      </Content>

      <Footer>
        <Row full>
          <Button text="Reject" full preset="default" onClick={handleCancel} />
          <Button text="Sign" full preset="primary" onClick={handleConfirm} />
        </Row>
      </Footer>
    </Layout>
  );
}
