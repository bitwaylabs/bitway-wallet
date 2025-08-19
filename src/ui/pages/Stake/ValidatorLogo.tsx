import { useQuery } from 'react-query';

import services from '@/ui/services';
import { colors } from '@/ui/theme/colors';
import { Box, BoxProps } from '@mui/material';

interface IValidatorLogo {
  data: string;
}

export function ValidatorLogo({ data, ...props }: IValidatorLogo & BoxProps) {
  const { data: result } = useQuery({
    queryKey: [
      'getValidatorLogo',
      {
        identity: data
      }
    ],
    queryFn: () => {
      if (!data) return;
      return services.staking.getValidatorLogo(data);
    }
  });

  const imgUrl = result?.list?.[0]?.keybase?.picture_url || '';

  return imgUrl ? (
    <Box {...props}>
      <img
        width="100%"
        height="100%"
        style={{ border: 'none', borderRadius: '50%', outline: 'none', ...(props.sx as any) }}
        src={imgUrl}
      />
    </Box>
  ) : (
    <Box
      {...props}
      sx={{
        border: `1px solid ${colors.black1}`,
        bgcolor: colors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        borderRadius: '50%',
        fontWeight: 700,
        color: 'rgba(0, 0, 0,0.4)',
        ...props.sx
      }}>
      ?
    </Box>
  );
}
