import { Dispatch, SetStateAction, useState } from 'react';

import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { Box, BoxProps } from '@mui/material';

import { Input } from '.';
import { Icon } from '../Icon';

export default function SearchInput({
  value,
  onChange,
  sx,
  placeholder
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  sx?: BoxProps['sx'];
  placeholder?: string;
}) {
  const isLight = useIsLight();
  const [isHover, setIsHover] = useState(false);
  return (
    <Box
      sx={[
        {
          border: `1px solid ${isLight ? colors.light_border : colors.dark_border}`,
          px: '10px',
          borderRadius: '10px',
          bgcolor: isLight ? colors.light_bg : colors.dark_bg,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          ':hover': {
            border: `1px solid ${isLight ? colors.white_4 : colors.dark_border}`
          }
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}>
      <Icon icon="search" color={'search_icon'} size={20} />
      <Input
        value={value}
        onChange={(event) => {
          onChange(event.target.value.trim());
        }}
        containerStyle={{
          minHeight: '38px',
          width: '100%',
          border: 'none',
          padding: '0',
          fontSize: '12px',
          fontWeight: 400,
          color: colors.white,
          backgroundColor: 'transparent'
        }}
        placeholder={placeholder || 'Search crypto'}
      />
      <div
        onClick={() => {
          onChange('');
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          display: value ? 'block' : 'none'
        }}>
        <Icon icon="clear" color={isHover ? (isLight ? 'black' : 'white') : 'search_icon'} size={20}></Icon>
      </div>
    </Box>
  );
}
