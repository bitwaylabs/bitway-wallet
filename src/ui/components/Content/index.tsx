import { CSSProperties } from 'react';

import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { spacing, spacingGap } from '@/ui/theme/spacing';

import { BaseView, BaseViewProps } from '../BaseView';
import './index.less';

type Presets = keyof typeof $viewPresets;
export interface ContentProps extends BaseViewProps {
  preset?: Presets;
}
const $contentStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyItems: 'center',
  gap: spacingGap.lg,

  alignSelf: 'stretch',
  overflowY: 'auto',
  overflowX: 'hidden'
} as CSSProperties;

const $viewPresets = {
  large: Object.assign({}, $contentStyle, {
    alignItems: 'stretch',
    padding: spacing.large,
    paddingTop: 0
  }),
  medium: Object.assign({}, $contentStyle, {
    alignItems: 'stretch',
    padding: spacing.medium,
    paddingTop: 0
  }),
  middle: Object.assign({}, $contentStyle, {
    alignItems: 'center',
    justifyContent: 'center',
    width: 285,
    alignSelf: 'center'
  } as CSSProperties)
};

export function Content(props: ContentProps) {
  const { style: $styleOverride, preset, ...rest } = props;
  const isLight = useIsLight();

  const $style = Object.assign(
    { backgroundColor: isLight ? colors.white : colors.black },
    $viewPresets[preset || 'medium'],
    $styleOverride
  );
  return <BaseView style={$style} {...rest} />;
}
