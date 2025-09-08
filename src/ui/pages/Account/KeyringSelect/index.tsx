import { Modal } from 'antd';
import VirtualList from 'rc-virtual-list';
import { forwardRef, useMemo, useState } from 'react';

import { WalletKeyring } from '@/shared/types';
import { Button, Icon, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring, useKeyrings } from '@/ui/state/keyrings/hooks';
import { keyringsActions } from '@/ui/state/keyrings/reducer';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { useWallet } from '@/ui/utils';
import { Stack } from '@mui/material';

import './index.less';

export interface ItemData {
  key: string;
  keyring: WalletKeyring;
}

interface MyItemProps {
  keyring: WalletKeyring;
  autoNav?: boolean;
}

function MyItem({ keyring, autoNav }: MyItemProps, ref) {
  const currentKeyring = useCurrentKeyring();
  const selected = currentKeyring.index === keyring?.index;
  const wallet = useWallet();
  const navigate = useNavigate();
  const isLight = useIsLight();

  const dispatch = useAppDispatch();

  const tools = useTools();

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          height: '44px',
          alignItems: 'center',
          padding: '0 16px',
          borderRadius: '10px',
          marginTop: '4px',
          background: isLight ? colors.light_bg : colors.dark_bg,
          border: `1px solid ${
            selected ? (isLight ? colors.black : colors.dark_border) : isLight ? colors.light_bg : colors.dark_bg
          }`,
          cursor: 'pointer',
          transition: '.4s',
          ':hover': {
            border: `1px solid ${isLight ? colors.black : colors.dark_border}`
          }
        }}
        onClick={async (e) => {
          if (!keyring.accounts[0]) {
            tools.toastError('Invalid wallet, please remove it and add new one');
            return;
          }
          if (currentKeyring.key !== keyring.key) {
            await wallet.changeKeyring(keyring);
            dispatch(keyringsActions.setCurrent(keyring));
            const _currentAccount = await wallet.getCurrentAccount();
            dispatch(accountActions.setCurrent(_currentAccount));
          }
          if (autoNav) navigate('MainScreen');
        }}>
        <Text
          text={keyring.alianName}
          color={isLight ? 'black' : 'white'}
          style={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '17px'
          }}
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate('KeyringSettingScreen', { index: keyring.index });
          }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="settings-02">
              <g id="Icon">
                <path
                  d="M7.83083 16.14L8.31787 17.2354C8.46265 17.5614 8.69893 17.8385 8.99805 18.0329C9.29718 18.2273 9.64629 18.3308 10.0031 18.3307C10.3598 18.3308 10.7089 18.2273 11.008 18.0329C11.3072 17.8385 11.5435 17.5614 11.6882 17.2354L12.1753 16.14C12.3486 15.7513 12.6403 15.4273 13.0086 15.2141C13.3793 15.0003 13.808 14.9092 14.2336 14.9539L15.4253 15.0807C15.78 15.1183 16.138 15.0521 16.4558 14.8902C16.7737 14.7283 17.0378 14.4777 17.216 14.1687C17.3945 13.8599 17.4795 13.506 17.4608 13.1498C17.4421 12.7936 17.3204 12.4506 17.1105 12.1622L16.4049 11.1928C16.1537 10.845 16.0194 10.4264 16.0216 9.9974C16.0215 9.56955 16.157 9.15269 16.4086 8.80666L17.1142 7.83721C17.3241 7.54886 17.4458 7.20579 17.4645 6.84962C17.4832 6.49346 17.3982 6.13951 17.2197 5.83073C17.0415 5.52176 16.7774 5.27114 16.4595 5.10925C16.1417 4.94737 15.7837 4.88117 15.429 4.91869L14.2373 5.04554C13.8118 5.09024 13.383 4.99916 13.0123 4.78536C12.6432 4.57094 12.3515 4.24519 12.179 3.8548L11.6882 2.75943C11.5435 2.43337 11.3072 2.15633 11.008 1.96189C10.7089 1.76746 10.3598 1.664 10.0031 1.66406C9.64629 1.664 9.29718 1.76746 8.99805 1.96189C8.69893 2.15633 8.46265 2.43337 8.31787 2.75943L7.83083 3.8548C7.65827 4.24519 7.36656 4.57094 6.9975 4.78536C6.62684 4.99916 6.19805 5.09024 5.7725 5.04554L4.57713 4.91869C4.2224 4.88117 3.86441 4.94737 3.54655 5.10925C3.2287 5.27114 2.96464 5.52176 2.78638 5.83073C2.6079 6.13951 2.52287 6.49346 2.54161 6.84962C2.56034 7.20579 2.68204 7.54886 2.89194 7.83721L3.5975 8.80666C3.84911 9.15269 3.98461 9.56955 3.98453 9.9974C3.98461 10.4252 3.84911 10.8421 3.5975 11.1881L2.89194 12.1576C2.68204 12.4459 2.56034 12.789 2.54161 13.1452C2.52287 13.5013 2.6079 13.8553 2.78638 14.1641C2.96481 14.4729 3.22891 14.7234 3.54672 14.8852C3.86452 15.0471 4.22243 15.1134 4.57713 15.0761L5.76879 14.9492C6.19435 14.9046 6.62314 14.9956 6.99379 15.2094C7.36423 15.4232 7.6573 15.7491 7.83083 16.14Z"
                  stroke={isLight ? colors.black : colors.white}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.0016 12.4974C11.3823 12.4974 12.5016 11.3781 12.5016 9.9974C12.5016 8.61668 11.3823 7.4974 10.0016 7.4974C8.62085 7.4974 7.50156 8.61668 7.50156 9.9974C7.50156 11.3781 8.62085 12.4974 10.0016 12.4974Z"
                  stroke={isLight ? colors.black : colors.white}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </svg>
        </div>
      </Stack>
    </>
  );
}

export default function WalletSelect() {
  const currentKeyring = useCurrentKeyring();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const keyrings = useKeyrings();
  const isLight = useIsLight();

  const items = useMemo(() => {
    const _items: ItemData[] = keyrings.map((v) => {
      return {
        key: v.key,
        keyring: v
      };
    });
    // _items.push({
    //   key: 'add'
    // });
    return _items;
  }, [keyrings]);
  const ForwardMyItem = forwardRef(MyItem);

  return (
    <>
      <Row
        classname={`bg-item-hover-v2 !rounded-[16px] ${isLight ? 'light' : ''}`}
        itemsCenter
        justifyBetween
        rounded
        onClick={() => {
          setIsModalOpen(true);
        }}
        style={{
          padding: '5px 16px',
          gap: '10px'
        }}>
        <Text
          color={isLight ? 'black' : 'white'}
          text={currentKeyring.alianName}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '17px'
          }}
        />
        <Icon icon="down" color={isLight ? 'black' : 'white'} />
      </Row>
      <Modal
        className={`walletSelectModal ${isLight ? 'light' : ''}`}
        title={null}
        closable={false}
        centered
        open={isModalOpen}
        footer={null}
        width={314}
        onCancel={() => setIsModalOpen(false)}>
        <div
          style={{
            padding: '12px 10px 16px'
          }}>
          <VirtualList
            data={items}
            data-id="list"
            itemHeight={30}
            itemKey={(item) => item.key}
            // disabled={animating}
            style={{
              boxSizing: 'border-box'
            }}
            // onSkipRender={onAppear}
            // onItemRemove={onAppear}
          >
            {(item, index) => <ForwardMyItem keyring={item.keyring} autoNav={true} />}
          </VirtualList>
          <Button
            text="Add Wallet"
            preset="primary"
            onClick={() => {
              navigate('WelcomeScreen', { addWallet: true });
            }}
            style={{
              marginTop: '18px'
            }}
          />
        </div>
      </Modal>
    </>
  );
}
