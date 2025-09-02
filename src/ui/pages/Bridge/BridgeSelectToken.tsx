// import { CHAINS_ENUM } from '@/shared/constant';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BalanceItem, IChain, NetworkType } from '@/shared/types';
import { Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useGetAllBridgeChains } from '@/ui/hooks/bridge';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetBitwayBalanceList } from '@/ui/hooks/useGetBitwayBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useIsLight, useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Stack } from '@mui/material';

import { useNavigate } from '../MainRoute';

interface SelectAsset extends BalanceItem {
  chainType: string;
}

export default function BridgeSelectTokenScreen() {
  const currentAccount = useCurrentAccount();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const networkType = useNetworkType();
  const { state } = useLocation();
  const { type } = state as { type: 'from' | 'to'; fromAsset?: BalanceItem; toAsset?: BalanceItem };
  const allBridgeChains = useGetAllBridgeChains();
  const { sideChain } = useEnvironment();
  const { fromAsset, fromChain } = useBridgeState();
  const isLight = useIsLight();

  let { balanceList: bitwayBalanceList } = useGetBitwayBalanceList(currentAccount?.address);
  let { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  // list, onSearch
  const [isHover, setIsHover] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<SelectAsset | null>(null);

  const { assetList } = useMemo(() => {
    let assetList: SelectAsset[] = [];

    // 所有资产
    const allAssetList = [
      ...bitcoinBalanceList.map((item) => ({ ...item, chainType: 'bitcoin' })),
      ...bitwayBalanceList.map((item) => ({ ...item, chainType: 'bitway' }))
    ];

    // 只展示 btc /sbtc资产
    assetList = allAssetList.filter((item) => {
      return item.denom === 'sat';
    });

    if (type === 'to') {
      if (fromChain?.isBitcoin) {
        // 如果 fromAsset 是 btc，则只展示 btct
        assetList = assetList.filter((item) => {
          return item.chainType === 'bitway' && item.denom === fromAsset?.denom;
        });
      } else {
        // 如果 fromAsset 是 btct，则展示 btc 和 btct
        assetList = assetList.filter((item) => {
          return item.denom === fromAsset?.denom;
        });

        // 判断sbtc是否有ibc
        const sideSbtcAsset = assetList.find((item) => item.denom === 'sat');
        if (sideSbtcAsset?.asset.ibcData) {
          assetList = assetList.filter((item) => {
            return item.chainType === 'bitcoin';
          });
        }
      }
    }

    // 筛选
    assetList = assetList.filter((item) => {
      return item?.asset.symbol?.toLocaleLowerCase().includes(searchValue?.trim());
    });

    return {
      assetList
    };
  }, [bitwayBalanceList, bitcoinBalanceList, searchValue]);

  const { chainList } = useMemo(() => {
    let chainList: IChain[] = [];
    if (selectedAsset) {
      const bitcoinChain = allBridgeChains.find((item) => item.isBitcoin)!;

      // 如果选中是 btc，则只展示 bitcoin
      if (selectedAsset?.chainType === 'bitcoin') {
        chainList = [bitcoinChain];
      } else {
        // 如果选中是 sbtc，必须展示 bitway
        chainList = [sideChain];
        // 如果选中有 ibc，则需要展示 ibc链
        if (selectedAsset.asset.ibcData) {
          selectedAsset.asset.ibcData.forEach((item) => {
            const chain = allBridgeChains.find((chain) => chain.chainID === item.oppositeChainId);
            if (chain) {
              chainList.push(chain);
            }
          });
        }
      }
    }

    if (type === 'from') {
      // fromChain暂时不能为cosmos链
      chainList = chainList.filter((chain) => !chain.isCosmos);
    } else {
      // toChain不能为fromChain
      chainList = chainList.filter((chain) => chain.chainID !== fromChain?.chainID);

      // 主网 toChain暂时不展示cosmos链
      if (networkType === NetworkType.MAINNET) {
        chainList = chainList.filter((chain) => !chain.isCosmos);
      }
    }

    // 筛选
    chainList = chainList.filter((item) => {
      return item?.name?.toLocaleLowerCase().includes(searchValue?.trim());
    });

    return {
      chainList
    };
  }, [allBridgeChains, selectedAsset, searchValue]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select asset and network"
      />
      <Content
        style={{
          padding: 0,
          marginTop: 16
        }}>
        <Column px="xl" gap="md">
          <Stack
            direction="row"
            alignItems="center"
            sx={[
              {
                border: `1px solid ${isLight ? colors.light_border : colors.dark_border}`,
                px: '10px',
                borderRadius: '10px',
                bgcolor: isLight ? colors.light_bg : colors.dark_bg,
                position: 'relative',
                gap: '8px',
                ':hover': {
                  border: `1px solid ${isLight ? colors.black : colors.white}`
                }
              }
            ]}>
            <Icon icon="search" color={'search_icon'} size={20} />
            {selectedAsset && (
              <Stack
                direction="row"
                alignItems="center"
                gap="4px"
                sx={{
                  borderRadius: '8px',
                  flexShrink: '0',
                  padding: '4px 7px',
                  bgcolor: isLight ? colors.white : colors.black
                }}>
                <ImageIcon url={selectedAsset.asset.logo} style={{ width: '14px', height: '14px' }} />
                <Text
                  preset="regular"
                  size="xs"
                  text={selectedAsset.asset.symbol}
                  color={isLight ? 'black' : 'white'}></Text>
              </Stack>
            )}
            <Input
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value.trim());
              }}
              containerStyle={{
                minHeight: '38px',
                width: '100%',
                border: 'none',
                padding: '0',
                fontSize: '12px',
                fontWeight: 400,
                color: isLight ? colors.black : colors.white,
                backgroundColor: 'transparent'
              }}
              placeholder={selectedAsset ? 'Search network' : 'Search asset'}
            />
            <div
              onClick={() => {
                setSearchValue('');
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                display: searchValue ? 'block' : 'none'
              }}>
              <Icon icon="clear" color={isHover ? (isLight ? 'black' : 'white') : 'search_icon'} size={20}></Icon>
            </div>
          </Stack>
          {selectedAsset ? (
            <>
              {chainList?.map((chain) => {
                const ibcChannel = selectedAsset.asset.ibcData?.find(
                  (item) => item.oppositeChainId === chain.chainID
                )?.sideChainChannelId;
                return (
                  <Stack
                    key={chain.name}
                    direction="row"
                    alignItems="center"
                    className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
                    onClick={() => {
                      if (type === 'from') {
                        const bitcoinChain = allBridgeChains.find((item) => item.isBitcoin)!;
                        let toChain: IChain | null = null,
                          toAsset: BalanceItem | undefined = undefined;

                        if (selectedAsset.denom === 'sat' || selectedAsset.denom.includes('rune')) {
                          if (chain.isBitcoin) {
                            toChain = sideChain;
                            toAsset = bitwayBalanceList.find((item) => item.denom === selectedAsset.denom);
                          } else {
                            toChain = bitcoinChain;
                            toAsset = bitcoinBalanceList.find((item) => item.denom === selectedAsset.denom);
                          }
                        }

                        dispatch(
                          BridgeActions.update({
                            fromChain: chain,
                            fromAsset: selectedAsset,
                            toChain,
                            toAsset,
                            toAddress: '',
                            bridgeAmount: '',
                            balance: selectedAsset.formatAmount
                          })
                        );
                        window.history.go(-1);
                      } else {
                        dispatch(
                          BridgeActions.update({
                            toChain: chain,
                            toAsset: selectedAsset
                          })
                        );
                        if (chain.isCosmos) {
                          dispatch(
                            BridgeActions.update({
                              toAddress: ''
                            })
                          );
                          navigate('BridgeTargetAddress', { ibcChannel });
                        } else {
                          window.history.go(-1);
                        }
                      }
                    }}
                    sx={{
                      padding: '10px 16px',
                      cursor: 'pointer'
                    }}>
                    <ImageIcon
                      url={chain.logo}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%'
                      }}
                    />
                    <Text
                      size="sm"
                      color={isLight ? 'black' : 'white'}
                      text={chain.name}
                      style={{
                        fontWeight: 600,
                        marginLeft: '8px'
                      }}
                    />
                    {ibcChannel && (
                      <Text
                        size="sm"
                        color="white_muted"
                        text={`/${ibcChannel}`}
                        style={{
                          fontWeight: 600
                        }}
                      />
                    )}
                  </Stack>
                );
              })}
            </>
          ) : (
            <>
              {assetList?.map((asset) => {
                return (
                  <Stack
                    key={asset.asset.symbol}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
                    onClick={() => {
                      setSelectedAsset(asset);
                      setSearchValue('');
                    }}
                    sx={{
                      padding: '10px 16px',
                      cursor: 'pointer'
                    }}>
                    <Row>
                      <ImageIcon
                        url={asset.asset.logo}
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%'
                        }}
                      />
                      <Column
                        style={{
                          gap: '0px'
                        }}>
                        <Text preset="regular" text={asset.asset.symbol} color={isLight ? 'black' : 'white'}></Text>
                        <Text preset="sub" text={asset.asset.name}></Text>
                      </Column>
                    </Row>

                    <Column
                      style={{
                        gap: '0px'
                      }}>
                      <Text
                        preset="regular"
                        textEnd
                        text={BigNumber(asset.formatAmount).toFormat()}
                        color={isLight ? 'black' : 'white'}></Text>
                      <Text preset="sub" textEnd text={`$${BigNumber(asset.totalValue).toFormat(2)}`}></Text>
                    </Column>
                  </Stack>
                );
              })}
            </>
          )}
        </Column>
      </Content>
    </Layout>
  );
}
