import { runesUtils } from '@/shared/lib/runes-utils';
import { RuneBalance } from '@/shared/types';

import { Card } from '../Card';
import { Column } from '../Column';
import { Row } from '../Row';
import { RunesTicker } from '../RunesTicker';
import { Text } from '../Text';

export interface RunesBalanceCardProps {
  tokenBalance: RuneBalance;
  onClick?: () => void;
}

export default function RunesBalanceCard(props: RunesBalanceCardProps) {
  const { tokenBalance, onClick } = props;
  const balance = runesUtils.toDecimalNumber(tokenBalance.amount, tokenBalance.divisibility);
  let str = balance.toString();
  if (balance.lt(0.0001)) {
    str = '<0.0001';
  }
  return (
    <Card
      style={{
        backgroundColor: '#141414',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }}
      fullX
      onClick={() => {
        onClick && onClick();
      }}
    >
      <Column full py="zero" gap="zero">
        <Row fullY justifyBetween justifyCenter>
          <Column fullY justifyCenter>
            <RunesTicker tick={tokenBalance.spacedRune} />
          </Column>

          <Row itemsCenter fullY gap="zero">
            <Text text={str} size="xs" />
            <Text text={tokenBalance.symbol} size="xs" mx="sm" />
          </Row>
        </Row>
      </Column>
    </Card>
  );
}
