import { useEffect, useRef, useState } from 'react';

import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

import { Row } from '../Row';
import { ButtonGroupV2, IButtonGroupProps } from './ButtonGroupV2';

function ButtonGroup(props: IButtonGroupProps) {
  const { list, value, onChange, size, rowProps } = props;
  const isLight = useIsLight();
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

  let height = size === 'big' ? '34px' : '26px';

  const [buttonPositons, setButtonPositons] = useState<Array<{ width: number; position: number }>>([]);
  const i = list.findIndex((item) => item.key === value);

  const wrapRef = useRef<any>();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const _buttonPositonsInit: Array<{ width: number; position: number }> = [];
    const _buttonPositons = list.reduce((pre, _cur, index) => {
      const buttonList = wrapRef.current!.children;
      const ele = buttonList[index];
      const _width = ele?.clientWidth || 0;
      if (!index) {
        return [{ width: _width, position: 0 }];
      }
      return pre.concat([{ width: _width, position: pre[pre.length - 1].position + pre[pre.length - 1].width + 8 }]);
    }, _buttonPositonsInit);
    setButtonPositons(_buttonPositons);

    setTimeout(() => {
      setIsFirstRender(false);
    }, 100);
  }, [i]);
  console.log(buttonPositons);

  return (
    <Row {...rowProps}>
      <div
        style={{
          display: 'flex',
          backgroundColor: isLight ? colors.white : colors.dark_bg,
          borderRadius: '100px',
          padding: '3px 5px',
          gap: '0',
          position: 'relative'
        }}
        ref={wrapRef}>
        {list.map((item, index) => {
          return (
            <div
              key={item.key}
              ref={(el) => (buttonRefs.current[index] = el)}
              style={{
                height,
                padding: size === 'small' ? '0 10px' : '0 22px',
                borderRadius: '100px',
                color: value === item.key ? colors.white : isLight ? colors.black : colors.white,
                fontSize: '12px',
                opacity: value === item.key ? 1 : 0.8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10,
                width: 'max-content',
                transition: '0.4s'
              }}
              onClick={() => {
                if (item.key === value) return;
                onChange(item.key, index);
              }}>
              {item.label}
            </div>
          );
        })}
        <div
          style={{
            position: 'absolute',
            height,
            borderRadius: '100px',
            width: `${buttonPositons[i]?.width || 0}px`,
            backgroundColor: isLight ? colors.black : colors.grey_dark,
            transition: isFirstRender ? 'none' : '.4s',
            transform: `translateX(${buttonPositons[i]?.position || 0}px)`
          }}
        />
      </div>
    </Row>
  );
}

export { ButtonGroup, ButtonGroupV2 };
