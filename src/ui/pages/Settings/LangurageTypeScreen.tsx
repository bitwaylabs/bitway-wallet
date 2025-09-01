import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

export default function LanguageTypeScreen() {
  const isLight = useIsLight();
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Language"
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
              padding: '16px 10px'
            }}
            full
            justifyBetween
            itemsCenter
            classname={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}>
            <Row itemsCenter>
              <Text text={'Automatic (Browser default)'} color={isLight ? 'black' : 'white'} />
            </Row>
          </Row>

          <Row
            rounded
            style={{
              padding: '16px 10px',
              backgroundColor: colors.backgroundChoose,
              border: `1px solid ${colors.backgroundChoose}`
            }}
            full
            justifyBetween
            itemsCenter
            classname={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}>
            <Row itemsCenter>
              <Text text={'English'} color={isLight ? 'black' : 'white'} />
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
