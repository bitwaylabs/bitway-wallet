import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { colors } from '@/ui/theme/colors';
import { Box, Stack } from '@mui/material';

interface RcSliderProps extends SliderProps {
  isLight?: boolean;
}

export default function Index(props: RcSliderProps) {
  const { isLight, ...restProps } = props;
  return (
    <Stack
      sx={{
        position: 'relative',
        width: '100%',
        height: '6px',
        bgcolor: colors.grey66,
        borderRadius: '10px'
      }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '-3px',
          pointerEvents: 'none',
          zIndex: 2
        }}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Box
            key={item}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: `1px solid ${isLight ? colors.grey1 : colors.grey12}`,
              bgcolor: isLight ? colors.light_bg : colors.dark_bg
            }}
          />
        ))}
      </Stack>
      <Slider
        min={0}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '-5px',
          width: 'calc(100% - 12px)'
        }}
        styles={{
          rail: { backgroundColor: 'transparent', height: 6, left: 0, right: 0 },
          track: {
            left: '0px',
            backgroundColor: isLight ? colors.black : colors.white,
            height: 6,
            zIndex: 1,
            transform: 'translateX(6px)'
          },
          handle: {
            borderWidth: '2px',
            borderColor: colors.white,
            height: 14,
            width: 14,
            backgroundColor: colors.black,
            marginTop: '-4px',
            boxShadow: 'none',
            transform: 'translateX(0)',
            zIndex: 3
          }
        }}
        {...restProps}
      />
    </Stack>
  );
}
