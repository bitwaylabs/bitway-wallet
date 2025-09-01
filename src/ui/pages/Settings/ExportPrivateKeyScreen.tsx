import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Account } from '@/shared/types';
import { Button, Column, Header, Icon, Image, Input, Layout, LongPress, Mask, Row, Text } from '@/ui/components';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard, useWallet } from '@/ui/utils';

type Status = '' | 'error' | 'warning' | undefined;

export default function ExportPrivateKeyScreen() {
  const { t } = useTranslation();

  const { state } = useLocation();
  const { account } = state as {
    account: Account;
  };

  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  const [privateKey, setPrivateKey] = useState({ hex: '', wif: '' });
  const [status, setStatus] = useState<Status>('');
  const [error, setError] = useState('');
  const wallet = useWallet();
  const isLight = useIsLight();
  const [isClickCopy, setIsClickCopy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const btnClick = async () => {
    try {
      const _res = await wallet.getPrivateKey(password, account);
      setPrivateKey(_res);
    } catch (e) {
      setStatus('error');
      setError((e as any).message);
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      btnClick();
    }
  };

  useEffect(() => {
    setDisabled(true);
    if (password.length >= 8) {
      setDisabled(false);
      setStatus('');
      setError('');
    }
  }, [password]);

  function copy(str: string) {
    copyToClipboard(str).then(() => {
      setTimeout(() => {
        setIsClickCopy(false);
      }, 3000);
    });
  }

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Show Private Key"
      />
      <Column
        style={{
          flex: 1,
          padding: '0 16px 24px'
        }}>
        {privateKey.wif == '' ? (
          <>
            <Column
              style={{
                flex: 1,
                gap: '16px'
              }}>
              <LongPress />
            </Column>
            <Text
              text="Password"
              color="search_icon"
              style={{
                fontSize: '14px',
                lineHeight: '24px'
              }}
            />
            <Input
              containerStyle={{
                borderColor: error ? 'rgba(255, 69, 69, 1)' : isFocus ? 'white' : ''
              }}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              preset="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyUp={(e) => handleOnKeyUp(e)}
              autoFocus={true}
            />
            {error && <Text text={error} preset="regular" color="error" />}

            <Button
              text="Confirm"
              preset="primary"
              disabled={disabled}
              onClick={btnClick}
              style={{
                marginTop: '24px'
              }}
            />
          </>
        ) : (
          <>
            <Column
              style={{
                flex: 1
              }}>
              <Mask>
                <div
                  style={{
                    background: isLight ? colors.light_bg : colors.dark_bg,
                    border: `1px solid ${isLight ? colors.light_border : colors.dark_border}`,
                    borderRadius: '14px',
                    padding: '16px'
                  }}>
                  <span
                    style={{
                      color: isLight ? colors.black : colors.white,
                      fontSize: '12px',
                      lineHeight: '20px',
                      // opacity: 0.5,
                      wordBreak: 'break-word',
                      marginRight: '4px'
                    }}>
                    {privateKey.wif}
                  </span>

                  <div
                    className={'inline-flex items-center relative top-1.5 cursor-pointer  '}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => {
                      copy(privateKey.wif);
                      setIsClickCopy(true);
                    }}>
                    <Icon
                      className={'inline-block relative  ml-[5px] mr-[2px]'}
                      icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
                      color={isClickCopy ? 'primary' : isHovered ? (isLight ? 'black' : 'white') : 'search_icon'}
                      size={20}
                    />
                    <Text
                      classname={'inline-block'}
                      text={isClickCopy ? 'Copied' : ''}
                      size="sm"
                      color={isClickCopy ? 'primary' : isHovered ? (isLight ? 'black' : 'white') : 'search_icon'}
                    />
                  </div>
                </div>
              </Mask>
              <Column
                style={{
                  marginTop: '24px',
                  backgroundColor: 'rgb(240 182 34 / 10%)',
                  borderRadius: '10px',
                  padding: '10px',
                  gap: '4px'
                }}>
                <Row
                  style={{
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                  <Image src="/images/icons/alert-triangle.svg" size={24} />
                  <Text
                    text="No Recovery Options:"
                    style={{
                      color: colors.warning_yellow,
                      lineHeight: '20px',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  />
                </Row>
                <Text
                  text="If you lose your recovery phrase, you will not be able to recover your wallet."
                  style={{
                    color: isLight ? colors.black : colors.white,
                    lineHeight: '18px',
                    fontSize: '12px',
                    fontWeight: 400
                  }}
                />
              </Column>

              <Column
                style={{
                  marginTop: '10px',
                  backgroundColor: 'rgb(240 182 34 / 10%)',
                  borderRadius: '10px',
                  padding: '10px',
                  gap: '4px'
                }}>
                <Row
                  style={{
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                  <Image src="/images/icons/alert-triangle.svg" size={24} />
                  <Text
                    text="Store Securely:"
                    style={{
                      color: colors.warning_yellow,
                      lineHeight: '20px',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  />
                </Row>
                <Text
                  text="Write down your recovery phrase and store it in a safe place."
                  style={{
                    color: isLight ? colors.black : colors.white,
                    lineHeight: '18px',
                    fontSize: '12px',
                    fontWeight: 400
                  }}
                />
              </Column>

              {/* <Text text="Hex Private Key:" preset="sub" size="sm" textCenter mt="lg" />

              <Card
                onClick={(e) => {
                  copy(privateKey.hex);
                }}>
                <Row>
                  <Text
                    text={privateKey.hex}
                    color="textDim"
                    style={{
                      overflowWrap: 'anywhere'
                    }}
                  />
                  <Icon icon="copy" color="textDim" />
                </Row>
              </Card> */}
            </Column>
            <Button text="Close" preset="primary" onClick={() => window.history.go(-1)} />
          </>
        )}
      </Column>
    </Layout>
  );
}
