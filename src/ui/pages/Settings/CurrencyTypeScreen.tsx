import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

export default function CurrencyTypeScreen() {
  const isLight = useIsLight();
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Currency"
      />
      <Content
        style={{
          padding: '0 16px',
          marginTop: '16px'
        }}>
        <Column gap={'md'}>
          <Row
            rounded
            style={{
              padding: '16px 10px',
              backgroundColor: colors.backgroundChoose,
              border: `1px solid ${colors.backgroundChoose}`
            }}
            full
            justifyBetween
            itemsCenter>
            <Row itemsCenter>
              <Text text={'USD'} color={isLight ? 'black' : 'white'} />
            </Row>
            <Column>
              <Icon color={'primary'} contain={'contain'} icon="check-circle" />
            </Column>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
