import BigNumber from 'bignumber.js';

import { Validator } from '@/ui/services/staking/types';
import { useAppDispatch } from '@/ui/state/hooks';
import { useIsLight } from '@/ui/state/settings/hooks';
import { stakeActions } from '@/ui/state/stake/reducer';
import { colors } from '@/ui/theme/colors';
import { getTruncate } from '@/ui/utils';
import { Box, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

interface IValidatorSelect {
  validatorList?: Validator[];
  selectValidator: Validator | undefined;
  type: 'validator' | 'validatorDst';
}
export default function SideValidatorSelect({ validatorList, selectValidator, type }: IValidatorSelect) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLight = useIsLight();

  return (
    <Box
      sx={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '10px',
        gap: '10px',
        cursor: 'pointer',
        background: isLight ? colors.light_bg : colors.dark_bg,
        overflow: 'hidden',
        width: '100%'
      }}
      onClick={() => {
        dispatch(stakeActions.updateStakeState({ validatorList: validatorList }));
        navigate('ValidatorSelectScreen', { type, selectValidator });
      }}>
      <Typography sx={{ fontSize: '12px', color: colors.grey12, whiteSpace: 'nowrap' }}>Select Validator</Typography>

      <Stack direction="row" alignItems="center" gap="8px" sx={{ overflow: 'hidden' }}>
        <Typography
          sx={{
            color: isLight ? colors.black : colors.white,
            fontSize: '12px',
            fontWeight: 500,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}>
          {selectValidator?.description?.moniker}
        </Typography>
        <Typography
          sx={{
            color: colors.grey12,
            fontSize: '12px',
            fontWeight: 500
          }}>
          (
          {`${getTruncate(
            new BigNumber(selectValidator?.commission?.commission_rates?.rate || '0').multipliedBy(100).toString(),
            2
          )}%`}
          )
        </Typography>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, transform: 'rotate(0deg)', transition: '.4s' }}>
          <g id="Component/icon/ic_Chevron Down">
            <path
              id="Shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.99991 11.4264L13.5123 8.07257C13.8318 7.76748 14.3498 7.76748 14.6694 8.07257C14.9889 8.37767 14.9889 8.87233 14.6694 9.17743L10.5785 13.0837C10.2589 13.3888 9.74089 13.3888 9.42137 13.0837L5.33046 9.17743C5.01094 8.87233 5.01094 8.37767 5.33046 8.07257C5.64998 7.76748 6.16802 7.76748 6.48754 8.07257L9.99991 11.4264Z"
              fill={colors.grey12}
            />
          </g>
        </svg>
      </Stack>
    </Box>
  );
}
