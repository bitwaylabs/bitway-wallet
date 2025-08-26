import BigNumber from 'bignumber.js';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import { Column, Image, LightTooltip, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetBitwayBalanceList } from '@/ui/hooks/useGetBitwayBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { colors } from '@/ui/theme/colors';
import { Box, Skeleton, Stack } from '@mui/material';

export function TokenItem({ token, balanceVisible }: { token: BalanceItem; balanceVisible: boolean }) {
  const { sideChain } = useEnvironment();
  const isIbc = token.asset.denom.includes('ibc/');

  const isBTW = token.asset.denom === sideChain?.denom;

  const ibcData = token.asset.ibcData?.find((item) => !!item.sideChainChannelId);

  const navigate = useNavigate();

  const isBitwayChain = token.asset.chain === CHAINS_ENUM.BITWAY;

  const isBitcoinChain = token.asset.chain === CHAINS_ENUM.BTC;

  return (
    <Stack
      sx={{
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          cursor: 'pointer',
          padding: '10px 16px',
          backgroundColor: colors.card_bgColor,
          transition: '.4s',
          ':hover': {
            backgroundColor: colors.grey_dark
          }
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
              {isBitwayChain && <Image src="./images/img/bitway-dark.png" size={16} />}

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
              gap: '0px'
            }}>
            <Text classname={'symbol'} preset="regular" text={token?.asset?.symbol}></Text>

            <Row itemsCenter style={{ position: 'relative' }}>
              <Text preset="sub" text={token?.asset?.name}></Text>

              {isIbc && (
                <LightTooltip
                  arrow
                  placement="top"
                  title={`${ibcData?.oppositeChainId}/${ibcData?.oppositeChainChannelId}`}>
                  <Box
                    sx={{
                      borderRadius: '4px',
                      background: '#FFFFFF1A',
                      fontSize: '8px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      height: '16px',
                      p: '4px 6px',
                      color: '#B8BFBD',
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
          <Text preset="regular" text={balanceVisible ? BigNumber(token?.formatAmount).toFormat() : '**'} textEnd />
          <Text
            preset="sub"
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
            borderTop: `1px solid ${colors.white20}`
          }}>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              flex: 1,
              py: '4px',
              fontSize: '12px',
              fontWeight: 500,
              color: colors.grey12,
              bgcolor: colors.card_bgColor,
              transition: '.4s',
              ':hover': {
                bgcolor: colors.grey_dark
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
              color: colors.grey12,
              borderLeft: `1px solid ${colors.white20}`,
              bgcolor: colors.card_bgColor,
              transition: '.4s',
              ':hover': {
                bgcolor: colors.grey_dark
              }
            }}
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

const STATIC_TOKENS = ['ubtw', 'sat', 'ibc/65D0BEC6DAD96C7F5043D1E54E54B6BB5D5B3AEC3FF6CEBB75B9E059F3580EA3'];

export default function SideTokenList({ balanceVisible }) {
  const currentAccount = useCurrentAccount();

  const { balanceList: bitwayBalanceList, loading: sideLoading } = useGetBitwayBalanceList(currentAccount?.address);

  const { balanceList: btcBalanceList, loading: btcLoading } = useGetBitcoinBalanceList(currentAccount?.address);

  const loading = sideLoading || btcLoading;

  const balanceList = [...bitwayBalanceList, ...btcBalanceList];

  const allZeroBalanceList = balanceList.every((item) => !+item.amount);

  const filterList = allZeroBalanceList
    ? balanceList
        .filter((item) => STATIC_TOKENS.includes(item.denom))
        .sort((a, b) => {
          const aIndex = STATIC_TOKENS.indexOf(a.denom);
          const bIndex = STATIC_TOKENS.indexOf(b.denom);
          return aIndex - bIndex;
        })
    : balanceList.filter((item) => !!+item.amount).sort((a, b) => +b.totalValue - +a.totalValue);

  return (
    <Column>
      {loading ? (
        <>
          <Skeleton
            sx={{
              bgcolor: colors.card_bgColor,
              transform: 'scale(1)',
              width: '100%',
              borderRadius: '10px'
            }}
            height={60}
          />
        </>
      ) : (
        filterList.map((item) => {
          return (
            <Fragment key={item.denom + item.asset.chain}>
              <TokenItem token={item} balanceVisible={balanceVisible} />
            </Fragment>
          );
        })
      )}
    </Column>
  );
}
