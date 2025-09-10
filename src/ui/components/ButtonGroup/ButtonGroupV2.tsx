import { useEffect, useRef, useState } from 'react';

import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Box } from '@mui/material';

import { Row, RowProps } from '../Row';

export interface ButtonItem {
  key: string | number;
  label: string;
}

export interface IButtonGroupProps {
  list: ButtonItem[];
  value: ButtonItem['key'];
  onChange: (value: ButtonItem['key'], index: number) => void;
  rowProps: RowProps;
  size?: 'small' | 'normal' | 'big';
}

export function ButtonGroupV2(props: IButtonGroupProps) {
  const isLight = useIsLight();
  const { list, value, onChange, size, rowProps } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

  let height = '40px';

  useEffect(() => {
    const index = list.findIndex((item) => item.key === value);
    setActiveIndex(index);
  }, [value, list]);

  return (
    <Row {...rowProps}>
      <Row
        justifyCenter
        style={{
          backgroundColor: isLight ? colors.white : colors.black,
          borderRadius: '10px',
          padding: '6px',
          gap: '0',
          position: 'relative',
          border: `1px solid ${isLight ? colors.light_border : colors.dark_border}`
        }}>
        <div
          style={{
            position: 'absolute',
            height,
            backgroundColor: colors.main,
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            left: buttonRefs.current[activeIndex]?.offsetLeft ?? 0,
            width: buttonRefs.current[activeIndex]?.offsetWidth ?? 0
          }}
        />
        {list.map((item, index) => {
          return (
            <Box
              key={item.key}
              ref={(el) => (buttonRefs.current[index] = el)}
              style={{
                height,
                padding: size === 'small' ? '0 10px' : '0 22px',
                borderRadius: '10px',
                color: activeIndex === index ? colors.black : isLight ? colors.black : colors.white,
                fontSize: '12px',
                opacity: value === item.key ? 1 : 0.8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
                transition: 'color 0.3s ease'
              }}
              onClick={() => {
                if (item.key === value) return;
                onChange(item.key, index);
              }}>
              {item.label}
            </Box>
          );
        })}
      </Row>
    </Row>
  );
}
