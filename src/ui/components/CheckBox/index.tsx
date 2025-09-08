import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Checkbox, CheckboxProps } from '@mui/material';

export function CheckBox(
  props: CheckboxProps & {
    iconSize?: number;
  }
) {
  const { sx, iconSize = 16, ...restProps } = props;
  const isLight = useIsLight();
  return (
    <Checkbox
      {...restProps}
      sx={{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        color: isLight ? colors.black : colors.white,
        padding: '0px',
        transition: '.4s',
        '&.Mui-checked': {
          color: isLight ? colors.black : colors.white
        },
        svg: {
          width: `${iconSize - 2}px`,
          height: `${iconSize - 2}px`
        },
        ...sx
      }}
    />
  );
}
