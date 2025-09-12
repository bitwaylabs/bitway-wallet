import { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';
import { JSX } from 'react/jsx-runtime';

import { colors } from '@/ui/theme/colors';
import { CommonProps } from '@mui/material/OverridableComponent';
import Slider, { SliderOwnProps, SliderThumb } from '@mui/material/Slider';
import { Theme, styled } from '@mui/material/styles';
import { MUIStyledCommonProps } from '@mui/system';

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return <SliderThumb {...other}>{children}</SliderThumb>;
}

const AirbnbSliderV2 = styled(Slider)(({ isLight }: { isLight?: boolean }) => ({
  color: isLight ? colors.black : colors.white,
  height: '1px',
  padding: '13px 0 !important',
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    borderRadius: '0',
    border: 'none',
    backgroundColor: 'transparent',
    zIndex: 10,
    '&.Mui-focusVisible': {
      boxShadow: 'none'
    },
    '&::before': {
      boxShadow: 'none',
      border: `2px solid ${isLight ? colors.black : colors.white}`,
      transform: 'rotate(45deg)',
      backgroundColor: isLight ? colors.white : colors.black
    },

    '& input': {
      border: `2px solid ${isLight ? colors.black : colors.white}`,
      transform: 'rotate(45deg)'
    },
    '&:hover': {
      boxShadow: 'none'
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1
    }
  },
  '& .MuiSlider-track': {
    height: '1px',
    border: 'none',
    backgroundColor: isLight ? colors.black : colors.white
  },
  '& .MuiSlider-rail': {
    color: '#929292',
    opacity: '0.2',
    height: '1px'
  },

  '& .MuiSlider-valueLabel': {
    backgroundColor: '#6C7080'
  }
}));

type AirbnbSliderType = JSX.IntrinsicAttributes &
  SliderOwnProps &
  CommonProps &
  Omit<
    Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> & {
      ref?: ((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null | undefined;
    },
    | 'value'
    | 'style'
    | 'track'
    | 'sx'
    | 'className'
    | 'classes'
    | 'color'
    | 'scale'
    | 'defaultValue'
    | 'tabIndex'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-valuetext'
    | 'onChange'
    | 'max'
    | 'min'
    | 'name'
    | 'orientation'
    | 'disabled'
    | 'size'
    | 'step'
    | 'components'
    | 'componentsProps'
    | 'slotProps'
    | 'slots'
    | 'disableSwap'
    | 'getAriaLabel'
    | 'getAriaValueText'
    | 'marks'
    | 'onChangeCommitted'
    | 'valueLabelDisplay'
    | 'valueLabelFormat'
  > &
  MUIStyledCommonProps<Theme> & {
    isLight?: boolean;
  };

export default function Index(props: AirbnbSliderType) {
  return <AirbnbSliderV2 slots={{ thumb: AirbnbThumbComponent }} {...props} />;
}
