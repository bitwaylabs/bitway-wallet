import { useMemo, useState } from 'react';

import { Button, Column, Input, Row, Text } from '@/ui/components';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

import { ContextData, TabType, UpdateContextDataParams } from './type';

export default function Step2_Verify({
  contextData,
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const isLight = useIsLight();
  const [firstWordInput, setFirstWordInput] = useState('');
  const [secondWordInput, setSecondWordInput] = useState('');
  const { firstWordIndex, firstWord, secondWordIndex, secondWord } = useMemo(() => {
    const enmonics = contextData.mnemonics.split(' ');
    const totalCount = enmonics.length;
    const firstWordIndex = Math.ceil(Math.random() * totalCount);
    let secondWordIndex = Math.ceil(Math.random() * totalCount);
    if (secondWordIndex === firstWordIndex) {
      secondWordIndex = enmonics[firstWordIndex + 1] ? firstWordIndex + 1 : firstWordIndex - 1;
    }
    return {
      firstWordIndex,
      firstWord: enmonics[firstWordIndex - 1],
      secondWordIndex,
      secondWord: enmonics[secondWordIndex - 1]
    };
  }, []);
  const { disabled, isCorrect } = useMemo(() => {
    let disabled = false,
      isCorrect = true;
    const _firstWordInput = firstWordInput.trim(),
      _secondWordInput = secondWordInput.trim();
    if (!_firstWordInput || !_secondWordInput) {
      disabled = true;
      isCorrect = true;
    } else if (_firstWordInput !== firstWord || _secondWordInput !== secondWord) {
      disabled = true;
      isCorrect = false;
    }
    return {
      disabled,
      isCorrect
    };
  }, [firstWordInput, secondWordInput]);
  return (
    <Column
      style={{
        flex: 1,
        overflow: 'hidden',
        padding: '0 16px 24px'
      }}>
      <Column
        style={{
          flex: 1,
          alignItems: 'center',
          overflow: 'auto'
        }}>
        <Text
          text="Verify Your Recovery Phrase"
          style={{
            color: isLight ? colors.black : colors.white,
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '22px',
            textAlign: 'center',
            marginTop: '80px'
          }}
        />
        <Text
          text="Fill out the words according to their numbers to verify that you have stored your phrase safely."
          style={{
            color: isLight ? colors.black : colors.white,
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '18px',
            textAlign: 'center',
            opacity: 0.5,
            marginTop: '8px'
          }}
        />
        <Column
          style={{
            backgroundColor: isLight ? colors.light_bg : colors.dark_bg,
            borderRadius: '10px',
            padding: '24px 16px',
            marginTop: '24px',
            width: '100%'
          }}>
          <Row
            style={{
              gap: '10px',
              alignItems: 'center'
            }}>
            <Text
              text={`Word #${firstWordIndex}`}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: isLight ? colors.black : colors.white,
                fontSize: '14px',
                lineHeight: '18px'
              }}
              textEnd
            />
            <Input
              containerStyle={{
                padding: '0 10px',
                flex: 1,
                borderRadius: '8px',
                backgroundColor: isLight ? colors.light_bg : colors.dark_bg
              }}
              style={{ width: '100%', textAlign: 'right', fontWeight: 600 }}
              value={firstWordInput}
              onChange={(e) => {
                setFirstWordInput(e.target.value);
              }}
              placeholder=""
            />
          </Row>
          <Row
            style={{
              gap: '10px',
              alignItems: 'center',
              marginTop: '16px'
            }}>
            <Text
              text={`Word #${secondWordIndex}`}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: isLight ? colors.black : colors.white,
                fontSize: '14px',
                lineHeight: '18px'
              }}
              textEnd
            />
            <Input
              containerStyle={{
                padding: '0 10px',
                flex: 1,
                borderRadius: '8px',
                backgroundColor: isLight ? colors.light_bg : colors.dark_bg
              }}
              style={{ width: '100%', textAlign: 'right', fontWeight: 600 }}
              value={secondWordInput}
              onChange={(e) => {
                setSecondWordInput(e.target.value);
              }}
              placeholder=""
            />
          </Row>
        </Column>
      </Column>
      <Button
        disabled={disabled}
        text={isCorrect ? 'Next' : 'Incorrect'}
        preset="primary"
        onClick={() => {
          updateContextData({ tabType: TabType.STEP3 });
        }}
      />
    </Column>
  );
}
