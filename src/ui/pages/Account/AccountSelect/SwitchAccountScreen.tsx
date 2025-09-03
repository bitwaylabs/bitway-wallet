import VirtualList from 'rc-virtual-list';
import { forwardRef, useMemo, useState } from 'react';

import { KEYRING_TYPE } from '@/shared/constant';
import { Account } from '@/shared/types';
import { Button, Column, Icon, Row, Text } from '@/ui/components';
import SearchInput from '@/ui/components/Input/Search';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard, shortAddress, useWallet } from '@/ui/utils';
import { Stack } from '@mui/material';

import './index.less';

export interface ItemData {
  key: string;
  account?: Account;
}

interface MyItemProps {
  account?: Account;
  autoNav?: boolean;
}

export function MyItem({ account, autoNav }: MyItemProps, ref) {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const selected = currentAccount.pubkey == account?.pubkey;
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const keyring = useCurrentKeyring();
  const [isHovered, setIsHovered] = useState(false);
  const [isClickCopy, setIsClickCopy] = useState(false);
  const isLight = useIsLight();
  if (!account) {
    return <div />;
  }

  function copy(str: string) {
    copyToClipboard(str).then(() => {
      setTimeout(() => {
        setIsClickCopy(false);
      }, 3000);
    });
  }

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [optionsVisible, setOptionsVisible] = useState(false);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          height: '60px',
          alignItems: 'center',
          padding: '0 6px 0 14px',
          borderRadius: '10px',
          marginTop: '16px',
          background: selected ? colors.green_1 : 'transparent',
          border: selected ? 'none' : `1px solid ${isLight ? colors.light_border : colors.dark_border}`,
          cursor: 'pointer',
          transition: '.4s',
          ':hover': {
            background: colors.main30
          }
        }}
        onClick={async (e) => {
          if (currentAccount.pubkey !== account.pubkey) {
            await wallet.changeKeyring(keyring, account.index);
            const _currentAccount = await wallet.getCurrentAccount();
            dispatch(accountActions.setCurrent(_currentAccount));
          }
          if (autoNav) navigate('MainScreen');
        }}>
        <div>
          <Text
            text={account.alianName}
            color={isLight ? 'black' : 'white'}
            style={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '17px'
            }}
          />

          <div
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            style={{
              display: 'flex',
              gap: 0,
              alignItems: 'center',
              height: 19
            }}>
            <Text
              text={shortAddress(account.address)}
              color="search_icon"
              style={{
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '8px'
              }}
            />
            <Icon
              className={'copy-icon'}
              style={{
                marginRight: '3px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                copy(account.address);
                setIsClickCopy(true);
              }}
              icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
              color={isClickCopy ? 'primary' : isHovered ? (isLight ? 'black' : 'white') : 'search_icon'}
              size={14}
            />
            <Text
              text={isClickCopy ? 'Copied' : ''}
              color={isClickCopy ? 'primary' : isHovered ? 'white' : 'search_icon'}
            />
          </div>
        </div>

        <Column relative>
          {optionsVisible && (
            <div
              style={{
                position: 'fixed',
                zIndex: 10,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }}
              onTouchStart={(e) => {
                setOptionsVisible(false);
              }}
              onMouseDown={(e) => {
                setOptionsVisible(false);
              }}
            />
          )}
          <div
            className="accountOperateBtn"
            onClick={(e) => {
              e.stopPropagation();
              setOptionsVisible(!optionsVisible);
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="dots-vertical">
                <g id="Icon">
                  <path
                    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                    stroke={isLight ? colors.black : colors.white}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                    stroke={isLight ? colors.black : colors.white}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                    stroke={isLight ? colors.black : colors.white}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
          </div>

          {optionsVisible && (
            <Column
              style={{
                backgroundColor: isLight ? colors.white : colors.black,
                width: 200,
                position: 'absolute',
                right: 0,
                padding: '12px 0',
                zIndex: 10,
                gap: '8px',
                borderRadius: '8px'
              }}>
              <Row
                classname={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
                style={{
                  gap: '16px',
                  alignItems: 'center',
                  padding: '10px 6px',
                  margin: '0 10px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('EditAccountNameScreen', { account });
                }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="edit-03">
                    <path
                      id="Icon"
                      d="M9.99998 16.6662H17.5M2.5 16.6662H3.89545C4.3031 16.6662 4.50693 16.6662 4.69874 16.6202C4.8688 16.5793 5.03138 16.512 5.1805 16.4206C5.34869 16.3175 5.49282 16.1734 5.78107 15.8852L16.25 5.4162C16.9404 4.72585 16.9404 3.60656 16.25 2.9162C15.5597 2.22585 14.4404 2.22585 13.75 2.9162L3.28105 13.3852C2.9928 13.6734 2.84867 13.8175 2.7456 13.9857C2.65422 14.1349 2.58688 14.2974 2.54605 14.4675C2.5 14.6593 2.5 14.8631 2.5 15.2708V16.6662Z"
                      stroke={isLight ? colors.black : colors.white}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>

                <Text
                  text="Edit Account Name"
                  color={isLight ? 'black' : 'white'}
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '17px',
                    whiteSpace: 'nowrap'
                  }}
                />
              </Row>
              {account.type !== KEYRING_TYPE.KeystoneKeyring && (
                <Row
                  classname={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
                  style={{
                    gap: '16px',
                    alignItems: 'center',
                    padding: '10px 6px',
                    margin: '0 10px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('ExportPrivateKeyScreen', { account });
                  }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="key-02">
                      <path
                        id="Icon"
                        d="M12.5 7.5H12.5083M12.5 12.5C15.2614 12.5 17.5 10.2614 17.5 7.5C17.5 4.73858 15.2614 2.5 12.5 2.5C9.73858 2.5 7.5 4.73858 7.5 7.5C7.5 7.72807 7.51527 7.95256 7.54484 8.17253C7.59348 8.53432 7.6178 8.71521 7.60143 8.82966C7.58438 8.94888 7.56267 9.01312 7.50391 9.11825C7.4475 9.21917 7.34809 9.31857 7.14928 9.51739L2.89052 13.7761C2.7464 13.9203 2.67433 13.9923 2.6228 14.0764C2.57711 14.151 2.54344 14.2323 2.52303 14.3173C2.5 14.4132 2.5 14.5151 2.5 14.719V16.1667C2.5 16.6334 2.5 16.8667 2.59083 17.045C2.67072 17.2018 2.79821 17.3293 2.95501 17.4092C3.13327 17.5 3.36662 17.5 3.83333 17.5H5.28105C5.48487 17.5 5.58679 17.5 5.68269 17.477C5.76772 17.4566 5.84901 17.4229 5.92357 17.3772C6.00767 17.3257 6.07973 17.2536 6.22386 17.1095L10.4826 12.8507C10.6814 12.6519 10.7808 12.5525 10.8818 12.4961C10.9869 12.4373 11.0511 12.4156 11.1703 12.3986C11.2848 12.3822 11.4657 12.4065 11.8275 12.4552C12.0474 12.4847 12.2719 12.5 12.5 12.5Z"
                        stroke={isLight ? colors.black : colors.white}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>

                  <Text
                    text="Show Private Key"
                    color={isLight ? 'black' : 'white'}
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '17px',
                      whiteSpace: 'nowrap'
                    }}
                  />
                </Row>
              )}
              {/*<Row*/}
              {/*  classname="bg-item-hover"*/}
              {/*  style={{*/}
              {/*    gap: '16px',*/}
              {/*    alignItems: 'center',*/}
              {/*    padding: '10px 16px'*/}
              {/*  }}*/}
              {/*  onClick={(e) => {*/}
              {/*    e.stopPropagation();*/}
              {/*    copyToClipboard(account.address);*/}
              {/*    tools.toastSuccess('copied');*/}
              {/*    setOptionsVisible(false);*/}
              {/*  }}>*/}
              {/*  <Image src="./images/icons/copy-03.svg" size={20} />*/}
              {/*  <Text*/}
              {/*    text="Copy Address"*/}
              {/*    color="text"*/}
              {/*    style={{*/}
              {/*      fontSize: '14px',*/}
              {/*      fontWeight: 500,*/}
              {/*      lineHeight: '17px'*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</Row>*/}
            </Column>
          )}
        </Column>
      </Stack>
    </>
  );
}

export default function SwitchAccountScreen() {
  const keyring = useCurrentKeyring();
  const wallet = useWallet();
  const [keyword, setKeyword] = useState('');
  let items = useMemo(() => {
    const _items: ItemData[] = keyring.accounts.map((v) => {
      return {
        key: v.address,
        account: v
      };
    });
    if (keyword) {
      return _items.filter((item) =>
        (item.account?.alianName || item.account?.address || '')
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase())
      );
    }
    return _items;
  }, [keyring.accounts, keyword]);

  const add = async () => {
    items = [];
    const defaultName = await wallet.getNextAlianName(keyring);
    await wallet.deriveNewAccountFromMnemonic(keyring, defaultName);
  };

  const ForwardMyItem = forwardRef(MyItem);

  return (
    <>
      <div
        style={{
          flexGrow: 0
        }}>
        <SearchInput value={keyword} onChange={setKeyword} placeholder="Search Account" />
      </div>
      <VirtualList
        data={items}
        data-id="list"
        itemHeight={20}
        itemKey={(item) => item.key}
        style={{ flex: 1, overflow: 'auto', marginBottom: '16px' }}>
        {(item, index) => <ForwardMyItem account={item.account} autoNav={true} />}
      </VirtualList>
      <Button text="Add Account" preset="primary" onClick={add} />
    </>
  );
}
