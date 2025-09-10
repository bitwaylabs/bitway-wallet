import BigNumber from 'bignumber.js';
import { Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import { Column, Image, LightTooltip, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetBitwayBalanceList } from '@/ui/hooks/useGetBitwayBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Box, Skeleton, Stack } from '@mui/material';

// 指定的排序规则
const customOrder = ['BTC', 'BTCT', 'BTW', 'USDC'];

function customSort(data: Array<BalanceItem>) {
  data.sort((x, y) => {
    const indexX = customOrder.indexOf(x.asset.symbol);
    const indexY = customOrder.indexOf(y.asset.symbol);

    if (indexX !== -1 && indexY !== -1) {
      return indexX - indexY;
    }

    if (indexX !== -1) return -1;
    if (indexY !== -1) return 1;

    return x.asset.symbol.localeCompare(y.asset.symbol);
  });
  return data;
}

export function TokenItem({ token, balanceVisible }: { token: BalanceItem; balanceVisible: boolean }) {
  const { sideChain } = useEnvironment();
  const isIbc = token.asset.denom.includes('ibc/');
  const isLight = useIsLight();

  const isBTW = token.asset.denom === sideChain?.denom;

  const ibcData = token.asset.ibcData?.find((item) => !!item.sideChainChannelId);

  const navigate = useNavigate();

  const isBitwayChain = token.asset.chain === CHAINS_ENUM.BITWAY;

  const isBitcoinChain = token.asset.chain === CHAINS_ENUM.BTC;

  return (
    <Stack
      sx={{
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
        sx={{
          display: 'flex',
          cursor: 'pointer',
          padding: '10px 16px',
          borderRadius: isBTW ? '8px 8px 0 0' : '8px'
        }}>
        <Row>
          <Row
            style={{
              position: 'relative'
            }}>
            <ImageIcon
              url={token.asset.logo}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%'
              }}
            />

            <Box position="absolute" bottom="2px" right="2px">
              {isBitwayChain && (
                <Image src={isLight ? './images/img/bitway-light.png' : './images/img/bitway-dark.png'} size={16} />
              )}

              {isBitcoinChain && (
                <ImageIcon
                  url="https://api.bitway.com/static/token/logo/btc.svg"
                  style={{ width: '16px', height: '16px' }}
                />
              )}
            </Box>
          </Row>

          <Column
            style={{
              gap: '0px',
              flex: 1
            }}>
            <Text color={isLight ? 'black' : 'white'} text={token?.asset?.symbol}></Text>

            <Row itemsCenter style={{ position: 'relative' }}>
              <Text color={'white_muted'} size="xs" text={token?.asset?.name}></Text>

              {isIbc && (
                <LightTooltip
                  arrow
                  placement="top"
                  title={`${ibcData?.oppositeChainId}/${ibcData?.oppositeChainChannelId}`}>
                  <Box
                    sx={{
                      background: isLight ? colors.white : colors.black,
                      borderRadius: '4px',
                      fontSize: '8px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      height: '16px',
                      p: '4px 6px',
                      color: isLight ? colors.black : colors.white,
                      position: 'relative'
                    }}>
                    IBC
                  </Box>
                </LightTooltip>
              )}
            </Row>
          </Column>
        </Row>

        <Column
          style={{
            gap: '0px'
          }}>
          <Text
            color={isLight ? 'black' : 'white'}
            text={balanceVisible ? BigNumber(token?.formatAmount).toFormat() : '**'}
            textEnd
          />
          <Text
            color={'white_muted'}
            size="xs"
            text={`${balanceVisible ? '$' + BigNumber(token?.totalValue || '').toFormat(2) : '**'}`}
            textEnd
          />
        </Column>
      </Stack>
      {isBTW && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100%',
            cursor: 'pointer',
            borderTop: `1px solid ${isLight ? colors.light_border : colors.dark_border}`
          }}>
          <Stack
            direction="row"
            justifyContent="center"
            className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
            sx={{
              flex: 1,
              py: '4px',
              fontSize: '12px',
              fontWeight: 500,
              color: isLight ? colors.grey12 : colors.white,
              borderRadius: '0 0 0 8px',
              ':hover': {
                color: isLight ? colors.black : colors.white
              }
            }}
            onClick={() => {
              navigate('/stake');
            }}>
            Stake
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              flex: 1,
              py: '4px',
              fontSize: '12px',
              fontWeight: 500,
              color: isLight ? colors.grey12 : colors.white,
              borderLeft: `1px solid ${isLight ? colors.light_border : colors.dark_border}`,
              borderRadius: '0 0 8px 0',
              ':hover': {
                color: isLight ? colors.black : colors.white
              }
            }}
            className={`bg-item-hover-v2 ${isLight ? 'light' : ''}`}
            onClick={() => {
              navigate('/swap-side');
            }}>
            Buy
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default function SideTokenList({ balanceVisible }) {
  const currentAccount = useCurrentAccount();
  const isLight = useIsLight();

  const { balanceList: bitwayBalanceList, loading: sideLoading } = useGetBitwayBalanceList(currentAccount?.address);

  const { balanceList: btcBalanceList, loading: btcLoading } = useGetBitcoinBalanceList(currentAccount?.address);

  const loading = sideLoading || btcLoading;

  const filterList = useMemo(() => {
    return customSort([...bitwayBalanceList, ...btcBalanceList]);
  }, [bitwayBalanceList, btcBalanceList]);

  return (
    <Column>
      {loading ? (
        <>
          <Skeleton
            sx={{
              bgcolor: isLight ? colors.light_bg : colors.dark_bg,
              transform: 'scale(1)',
              width: '100%',
              borderRadius: '10px'
            }}
            height={60}
          />
        </>
      ) : (
        filterList.map((item, index) => {
          return (
            <Fragment key={item.denom + index}>
              <TokenItem token={item} balanceVisible={balanceVisible} />
            </Fragment>
          );
        })
      )}
    </Column>
  );
}
