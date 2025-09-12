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
  return (
    <SliderThumb {...other}>
      {children}
      <span
        style={{
          height: '9px',
          width: '2px',
          backgroundColor: '#929292',
          margin: '0 2px'
        }}
      />
      <span
        style={{
          height: '9px',
          width: '2px',
          backgroundColor: '#929292',
          margin: '0 2px'
        }}
      />
    </SliderThumb>
  );
}

const AirbnbSlider = styled(Slider)(() => ({
  color: colors.main,
  height: '6px',
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '1px solid #000',
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
    height: '6px'
  },
  '& .MuiSlider-rail': {
    color: '#929292',
    opacity: '0.2',
    height: '6px'
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
  MUIStyledCommonProps<Theme>;

export default function Index(props: AirbnbSliderType) {
  return <AirbnbSlider slots={{ thumb: AirbnbThumbComponent }} {...props} />;
}
