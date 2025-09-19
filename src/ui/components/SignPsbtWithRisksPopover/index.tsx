import { useEffect, useState } from 'react';

import { DecodedPsbt, Risk, RiskType } from '@/shared/types';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Stack, Typography } from '@mui/material';

import { Button } from '../Button';
import { Column } from '../Column';
import { Input } from '../Input';
import { Popover } from '../Popover';
import { Row } from '../Row';
import { Text } from '../Text';
import { Arc20BurningList } from './Arc20BurningList';
import { BadFeeRate } from './BadFeeRate';
import { ChangingInscription } from './ChangingInscription';
import { InscriptionBurning } from './InscriptionBurning';
import { RunesBurningList } from './RunesBurningList';
import { SendingOutAssets } from './SendingOutAssets';

const AGREEMENT_TEXT = 'CONFIRM';

const visibleRiskDetailTypes = [
  RiskType.MULTIPLE_ASSETS,
  RiskType.INSCRIPTION_BURNING,
  RiskType.ATOMICALS_FT_BURNING,
  RiskType.ATOMICALS_NFT_BURNING,
  RiskType.LOW_FEE_RATE,
  RiskType.HIGH_FEE_RATE,
  //   RiskType.SPLITTING_INSCRIPTIONS,
  //   RiskType.MERGING_INSCRIPTIONS,
  RiskType.CHANGING_INSCRIPTION,
  RiskType.RUNES_BURNING
];
export const SignPsbtWithRisksPopover = ({
  decodedPsbt,
  onConfirm,
  onClose
}: {
  decodedPsbt: DecodedPsbt;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [understand, setUnderstand] = useState(false);
  const isLight = useIsLight();
  useEffect(() => {
    if (inputValue.toUpperCase() === AGREEMENT_TEXT) {
      setUnderstand(true);
    } else {
      setUnderstand(false);
    }
  }, [inputValue]);

  const [detailRisk, setDetailRisk] = useState<Risk | null>();
  if (detailRisk) {
    if (detailRisk.type === RiskType.ATOMICALS_FT_BURNING) {
      return <Arc20BurningList decodedPsbt={decodedPsbt} onClose={() => setDetailRisk(null)} />;
    } else if (detailRisk.type === RiskType.INSCRIPTION_BURNING) {
      return <InscriptionBurning decodedPsbt={decodedPsbt} onClose={() => setDetailRisk(null)} />;
    } else if (detailRisk.type === RiskType.MULTIPLE_ASSETS) {
      return <SendingOutAssets decodedPsbt={decodedPsbt} onClose={() => setDetailRisk(null)} />;
    } else if (detailRisk.type === RiskType.LOW_FEE_RATE || detailRisk.type === RiskType.HIGH_FEE_RATE) {
      return <BadFeeRate decodedPsbt={decodedPsbt} risk={detailRisk} onClose={() => setDetailRisk(null)} />;
    } else if (detailRisk.type === RiskType.CHANGING_INSCRIPTION) {
      return <ChangingInscription decodedPsbt={decodedPsbt} onClose={() => setDetailRisk(null)} />;
    } else if (detailRisk.type === RiskType.RUNES_BURNING) {
      return <RunesBurningList decodedPsbt={decodedPsbt} onClose={() => setDetailRisk(null)} />;
    }
  }

  return (
    <Popover>
      <Column justifyCenter itemsCenter>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="8px"
          sx={{
            width: '100%',
            p: '16px',
            borderRadius: '10px',
            bgcolor: '#FF45451A'
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
            <path
              d="M11.9998 8.42796V12.428M11.9998 16.428H12.0098M10.6151 3.31969L2.39019 17.5263C1.93398 18.3143 1.70588 18.7083 1.73959 19.0317C1.769 19.3137 1.91677 19.57 2.14613 19.7368C2.40908 19.928 2.86435 19.928 3.77487 19.928H20.2246C21.1352 19.928 21.5904 19.928 21.8534 19.7368C22.0827 19.57 22.2305 19.3137 22.2599 19.0317C22.2936 18.7083 22.0655 18.3143 21.6093 17.5263L13.3844 3.31968C12.9299 2.53452 12.7026 2.14194 12.4061 2.01009C12.1474 1.89507 11.8521 1.89507 11.5935 2.01009C11.2969 2.14194 11.0696 2.53452 10.6151 3.31969Z"
              stroke={colors.danger}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: colors.danger
            }}>
            Risk Warning
          </Typography>
        </Stack>

        <Column gap="md">
          {decodedPsbt.risks.map((risk, index) => {
            return (
              <Column
                key={'risk_' + index}
                style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 10 }}
                py="sm">
                <Row justifyBetween justifyCenter mt="sm">
                  <Text text={risk.title} color={'danger'} />
                  {visibleRiskDetailTypes.includes(risk.type) ? (
                    <Text
                      text={'View>'}
                      onClick={() => {
                        setDetailRisk(risk);
                      }}
                      color={'white_muted'}
                    />
                  ) : null}
                </Row>
                <Text text={risk.desc} preset="sub" />
              </Column>
            );
          })}

          <Text
            text={'I understand and accept the risks associated with this transaction.'}
            preset="sub"
            color={isLight ? 'black' : 'white'}
          />

          <Row itemsCenter gap="sm" mb="md">
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.white_muted
              }}>
              Enter “
              <small style={{ fontSize: '100%', color: isLight ? colors.black : colors.white }}>{AGREEMENT_TEXT}</small>
              ” to proceed
            </Typography>
          </Row>
          <Input
            preset="text"
            autoFocus={true}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </Column>

        <Row full>
          <Button
            text={'Reject'}
            preset="reject"
            full
            onClick={(e) => {
              if (onClose) {
                onClose();
              }
            }}
          />

          <Button
            text={'Confirm'}
            preset="danger"
            disabled={!understand}
            full
            onClick={(e) => {
              if (onConfirm) {
                onConfirm();
              }
            }}
          />
        </Row>
      </Column>
    </Popover>
  );
};
