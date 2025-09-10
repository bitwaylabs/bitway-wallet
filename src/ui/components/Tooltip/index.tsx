import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => {
  const isLight = useIsLight();
  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: isLight ? colors.white : colors.dark_bg,
      color: isLight ? colors.black : colors.white,
      boxShadow: theme.shadows[1],
      fontSize: 11,
      '& .MuiTooltip-arrow': {
        color: isLight ? colors.black : colors.dark_bg
      }
    }
  };
});
