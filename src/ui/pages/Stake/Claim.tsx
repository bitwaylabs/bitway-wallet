import { Fragment } from 'react';
import { useQuery } from 'react-query';

import { Button, Image, Row, Text } from '@/ui/components';
import { Empty } from '@/ui/components/Empty';
import { useClaimRewards } from '@/ui/hooks/staking';
import { useGetBitwayBalanceList } from '@/ui/hooks/useGetBitwayBalanceList';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { Stack, Typography } from '@mui/material';

export default function Index() {
  const currentAccount = useCurrentAccount();
  const isLight = useIsLight();
  const { sideChain } = useEnvironment();
  const { data } = useQuery('stakingGetRewards', () => {
    if (!currentAccount?.address) return;
    return services.staking.getRewards(currentAccount?.address, {
      baseURL: sideChain?.restUrl
    });
  });
  const { balanceList } = useGetBitwayBalanceList(currentAccount?.address);

  const { claim, loading } = useClaimRewards({
    rewards: data?.rewards || []
  });

  const rewards = data?.total || [];

  const isDisabled = !rewards.find((item) => +item.amount >= 1);

  return (
    <>
      <Row full justifyBetween itemsCenter>
        <Row itemsCenter>
          <Text color={isLight ? 'black' : 'white'} size="xs">
            Your Total Rewards
          </Text>
        </Row>
      </Row>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap="4px"
        sx={{
          minHeight: '68px',
          mt: '-8px',
          borderRadius: '10px',
          bgcolor: isLight ? colors.light_bg : colors.dark_bg
        }}>
        {!isDisabled ? (
          rewards.map((item) => {
            const rewardAsset = balanceList.find((balance) => balance.denom === item.denom);
            const exponent = rewardAsset?.asset.exponent || '6';
            const formatAmount = formatUnitAmount(item.amount || '0', exponent);
            if (!+formatAmount) {
              return null;
            }
            return (
              <Fragment key={item.denom}>
                <Image src={rewardAsset?.asset.logo} width="32px" height="32px" />
                <Typography
                  sx={{
                    fontSize: '24px',
                    color: isLight ? colors.black : colors.white,
                    fontWeight: 600
                  }}>
                  {getTruncate(formatAmount, rewardAsset?.asset.precision || 6)}
                </Typography>
              </Fragment>
            );
          })
        ) : (
          <Stack
            sx={{
              p: '20px'
            }}>
            <Empty />
          </Stack>
        )}
      </Stack>

      <Row>
        <Button
          onClick={() => {
            claim();
          }}
          loading={loading}
          disabled={isDisabled}
          preset="primary"
          text="Claim"
          full
        />
      </Row>
    </>
  );
}
