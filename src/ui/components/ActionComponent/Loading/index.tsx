import { CSSProperties } from 'react';

import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import { spacing } from '@/ui/theme/spacing';
import { LoadingOutlined } from '@ant-design/icons';

import { Text } from '../../Text';
import './index.less';

export interface LoadingProps {
  text?: string;
  onClose?: () => void;
}

const $baseViewStyle: CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: spacing.small
};

export function Loading(props: LoadingProps) {
  const { text } = props;
  const isLight = useIsLight();
  return (
    <div className="loading-container">
      <div style={{ ...$baseViewStyle, backgroundColor: isLight ? colors.white : colors.black }}>
        <LoadingOutlined
          style={{
            fontSize: fontSizes.logo,
            color: colors.primary,
            fontWeight: 600
          }}
        />
        {text && <Text text={text} preset="title" color="orange" />}
      </div>
    </div>
  );
}
