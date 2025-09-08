import { CheckBox, Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Stack } from '@mui/material';

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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
            sx={{
              padding: '16px 10px',
              cursor: 'pointer',
              border: `1px solid ${isLight ? colors.light_border : colors.dark_border}`,
              ':hover': {
                border: `1px solid ${isLight ? colors.light_border : colors.dark_border}`
              }
            }}>
            <Row itemsCenter>
              <Text text={'USD'} color={isLight ? 'black' : 'white'} />
            </Row>
            <Column>
              <CheckBox checked iconSize={16} />
            </Column>
          </Stack>
        </Column>
      </Content>
    </Layout>
  );
}
