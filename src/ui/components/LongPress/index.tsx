import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

import { Image } from '../Image';
import { Text } from '../Text';

export function LongPress() {
  const isLight = useIsLight();
  return (
    <>
      <div
        style={{
          marginTop: '112px',
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Image src="./images/img/long-press.png" size={90} />
      </div>
      <Text
        text="Please type in your password to proceed"
        style={{
          fontSize: '14px',
          lineHeight: '24px',
          textAlign: 'center',
          color: isLight ? colors.black : colors.white
        }}
      />
    </>
  );
}
