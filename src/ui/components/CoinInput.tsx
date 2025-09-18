import BigNumber from 'bignumber.js';
import { NumericFormat } from 'react-number-format';
import { SyntheticInputEvent } from 'react-number-format/types/types';

import { Coin } from '@cosmjs/stargate';

import { useIsLight } from '../state/settings/hooks';
import { colors } from '../theme/colors';

export type CoinInputProps = {
  coin: Coin;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  readOnly?: boolean;
  size?: number;
  color?: string;
  decimalScale?: number;
  max?: string;
};
export function CoinInput({ coin, onChange, readOnly, size, color, decimalScale, max, onBlur }: CoinInputProps) {
  const isLight = useIsLight();
  return (
    <NumericFormat
      type="text"
      className="coin-input"
      readOnly={readOnly}
      style={{
        textDecoration: 'none',
        width: '100%',
        fontSize: size || '36px',
        background: 'transparent',
        border: 'none',
        fontWeight: '500',
        outline: 'none',
        color: color || (isLight ? colors.black : colors.white),
        overflow: 'hidden',
        resize: 'none'
      }}
      decimalScale={decimalScale || 6}
      valueIsNumericString
      thousandSeparator
      placeholder={'0'}
      onBlur={onBlur}
      onInput={(event: SyntheticInputEvent) => {
        if (max) {
          const value = event.target.value.replace(/,/g, '');
          if (new BigNumber(value).gt(max)) {
            event.target.value = max;
          }
        }
      }}
      onValueChange={({ value }) => {
        const targetValue = value;
        if (targetValue.startsWith('.')) {
          return;
        }
        if (targetValue !== '' && !targetValue.match(/^\d*(\.\d*)?$/)) {
          return;
        }
        const amount = targetValue.replace(/^0+/, '0'); // remove prefix zeros
        onChange?.(`${+amount}`);
      }}
      value={coin.amount}
    />
  );
}
