import { Switch, SwitchProps } from 'antd';

import { useIsLight } from '@/ui/state/settings/hooks';

export function SwitchMui(props: SwitchProps) {
  const isLight = useIsLight();
  const { className, ...restProps } = props;
  return <Switch className={`${className ?? ''} ${isLight ? 'light' : ''}`} {...restProps} />;
}
