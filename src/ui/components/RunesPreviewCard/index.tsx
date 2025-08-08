import { runesUtils } from '@/shared/lib/runes-utils';
import { RuneBalance } from '@/shared/types';

import { Column } from '../Column';
import { Row } from '../Row';
import { Text } from '../Text';

export interface RunesPreviewCardProps {
  balance: RuneBalance;
  onClick?: () => void;
}

export default function RunesPreviewCard({ balance, onClick }: RunesPreviewCardProps) {
  const balanceStr = `${runesUtils.toDecimalAmount(balance.amount, balance.divisibility)} ${balance.symbol}`;

  let size = 'sm';
  if (balanceStr.length > 10) {
    size = 'xxs';
  } else if (balanceStr.length > 20) {
    size = 'xxxs';
  }
  return (
    <Column
      style={{
        position: 'relative',
        backgroundColor: '#A14419',
        width: 80,
        height: 90,
        minWidth: 80,
        minHeight: 90,
        borderRadius: 5,
        padding: 0
      }}
      onClick={onClick}
    >
      <Row
        style={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          position: 'absolute'
        }}
      >
        <Row
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderBottomRightRadius: 5,
            borderTopLeftRadius: 5,
            width: 70
          }}
          px="sm"
        >
          <Text text={balance.spacedRune} wrap color="white" size="xxxs" />
        </Row>
      </Row>

      <Column fullY justifyCenter>
        <Text text={balanceStr} size={size as any} textCenter wrap />
      </Column>
    </Column>
  );
}
