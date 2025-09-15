import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useRef, useState } from 'react';

import { colors } from '@/ui/theme/colors';
import { Box, BoxProps } from '@mui/material';

import AirbnbSliderV2 from './AirbnbSliderV2';

export default function Index({
  onChange,
  value,
  sx,
  maxProcess,
  isLight
}: {
  onChange: (value: number) => void;
  value: number | string;
  sx?: BoxProps['sx'];
  maxProcess?: number;
  isLight?: boolean;
}) {
  const [process, setProcess] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setProcess(+value);
  }, [value]);

  const width = useMemo(() => {
    return new BigNumber(10000).div(maxProcess || 100).toFixed(2, BigNumber.ROUND_UP);
  }, [maxProcess]);
  return (
    <Box
      sx={{
        width: '100%',
        p: '0 12px',
        overflow: 'hidden'
      }}>
      <Box sx={{ width: `${width}%`, position: 'relative' }}>
        <AirbnbSliderV2
          sx={sx}
          defaultValue={0}
          value={process}
          valueLabelDisplay="off"
          isLight={isLight}
          onChange={(event) => {
            let _value = event.target?.value as number;
            if (maxProcess && _value > maxProcess) {
              _value = maxProcess;
            }
            setProcess(_value);
            onChange(_value);
            // if (!timer.current) {
            //   timer.current = setTimeout(() => {
            //     onChange(_value);
            //     clearTimeout(timer.current!);
            //     timer.current = null;
            //   }, 50);
            // }
          }}
        />
        {[0, 25, 50, 75, 100].map((item) => {
          const left = new BigNumber(maxProcess || 100).div(100).multipliedBy(item).toFixed(2, BigNumber.ROUND_UP);
          return (
            <Box
              key={item}
              sx={{
                pointerEvents: 'none',
                position: 'absolute',
                width: '6px',
                height: '6px',
                backgroundColor:
                  +value >= +left ? (isLight ? colors.black : colors.white) : isLight ? colors.white : colors.black,
                border: `2px solid ${+value >= +left ? (isLight ? colors.black : colors.white) : colors.grey12}`,
                transform: 'rotate(45deg)',
                left: `${left}%`,
                top: '11px'
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
