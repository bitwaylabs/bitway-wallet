import { ReactEventHandler, useEffect, useState } from 'react';

import { openapiService } from '@/background/service';
import { AddressFlagType, UNCONFIRMED_HEIGHT } from '@/shared/constant';
import { AddressAssets } from '@/shared/types';
import { checkAddressFlag } from '@/shared/utils';
import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import { satoshisToAmount, satoshisToBTC } from '@/ui/utils';
import { Stack } from '@mui/material';

import { Card } from '../Card';
import { Column } from '../Column';
import { CopyableAddress } from '../CopyableAddress';
import { Icon } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';

interface AddressTypeCardProps {
  label: string;
  address: string;
  checked: boolean;
  assets: AddressAssets;
  onClick?: ReactEventHandler<HTMLDivElement>;
}
export function AddressTypeCard(props: AddressTypeCardProps) {
  const { onClick, label, address, checked } = props;
  const { UNISAT_SERVICE_ENDPOINT } = useEnvironment();
  const [balance, setBalance] = useState('0');
  // const hasVault = Boolean(assets?.satoshis && assets?.satoshis > 0);
  const fetchUtxos = async () => {
    let utxos = await services.unisat.getBTCUtxos({ address }, UNISAT_SERVICE_ENDPOINT);
    if (checkAddressFlag(openapiService.addressFlag, AddressFlagType.CONFIRMED_UTXO_MODE)) {
      utxos = utxos.filter((v) => (v as any).height !== UNCONFIRMED_HEIGHT);
    }
    const safeBalance = utxos.filter((v) => v.inscriptions.length == 0).reduce((pre, cur) => pre + cur.satoshis, 0);

    const btcAmount = satoshisToAmount(safeBalance);
    setBalance(btcAmount);
  };

  useEffect(() => {
    if (address) {
      fetchUtxos();
    }
  }, [address]);

  return (
    <Stack
      onClick={onClick}
      sx={{
        bgcolor: colors.card_bgColor,
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid ${checked ? colors.main : 'transparent'}`,
        cursor: 'pointer',
        transition: '.4s',
        '&:hover': {
          border: `1px solid ${colors.main}`
        }
      }}>
      <Column full gap={'zero'}>
        <Row
          justifyBetween
          px="lg"
          style={{
            paddingTop: '16px'
          }}>
          <Column justifyCenter>
            <Text text={label} size="xs" disableTranslate />
          </Column>
        </Row>
        <Row justifyBetween px="lg" pb="md">
          <CopyableAddress address={address} />
          <Column
            style={{
              position: 'relative',
              top: '-10px'
            }}
            justifyCenter>
            {checked && <Icon color={'primary'} contain={'contain'} icon="check-circle" />}
          </Column>
        </Row>
        <Row
          justifyBetween
          roundedBottom
          px="md"
          py="md"
          style={{
            background: colors.green_1
          }}>
          <Row justifyCenter>
            <Icon icon="btc" size={fontSizes.iconMiddle} />
            <Text
              text={`${balance} BTC`}
              style={{
                color: '#48BB78'
              }}
            />
          </Row>
        </Row>
      </Column>
    </Stack>
  );
}

interface AddressTypeCardProp2 {
  label: string;
  items: {
    address: string;
    path: string;
    satoshis: number;
  }[];
  checked: boolean;
  onClick?: ReactEventHandler<HTMLDivElement>;
}

export function AddressTypeCard2(props: AddressTypeCardProp2) {
  const { onClick, label, items, checked } = props;
  return (
    <Card px="zero" py="zero" gap="zero" rounded onClick={onClick}>
      <Column full>
        <Row justifyBetween px="md" pt="md">
          <Column justifyCenter>
            <Text text={label} size="xs" disableTranslate />
          </Column>
          <Column justifyCenter>{checked && <Icon icon="check" />}</Column>
        </Row>

        {items.map((v) => (
          <Row px="md" pb="sm" key={v.address} itemsCenter>
            <Row style={{ width: '120px' }}>
              <CopyableAddress address={v.address} />
            </Row>

            <Text text={`(${v.path})`} size="xs" color="textDim" disableTranslate />

            {v.satoshis > 0 && (
              <Row justifyCenter gap="zero" itemsCenter>
                <Icon icon="btc" size={fontSizes.iconMiddle} />
                <Text text={`${satoshisToBTC(v.satoshis)} BTC`} color="yellow" size="xxxs" />
              </Row>
            )}
          </Row>
        ))}
      </Column>
    </Card>
  );
}
