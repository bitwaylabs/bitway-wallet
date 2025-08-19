import BigNumber from 'bignumber.js';
import { Fragment, useMemo, useState } from 'react';

import SearchInput from '@/ui/components/Input/Search';
import { Validator } from '@/ui/services/staking/types';
import { colors } from '@/ui/theme/colors';
import { getTruncate } from '@/ui/utils';
import { Box, Dialog, Stack, Typography } from '@mui/material';

import { ValidatorLogo } from './ValidatorLogo';

interface IValidatorSelect {
  validatorList?: Validator[];
  selectValidator: Validator | null;
  onChangeValidator?: (val: Validator) => void;
}
export default function SideValidatorSelect({ validatorList, selectValidator, onChangeValidator }: IValidatorSelect) {
  const [open, setOpen] = useState(false);
  const [keywords, setKeywords] = useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterValidators = useMemo(() => {
    return (validatorList || []).filter((item) => {
      return item.description?.moniker.toLocaleLowerCase().includes(keywords.toLocaleLowerCase());
    });
  }, [keywords, validatorList]);

  return (
    <Fragment>
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '10px',
          gap: '10px',
          cursor: 'pointer',
          background: colors.card_bgColor,
          overflow: 'hidden',
          width: '100%'
        }}
        onClick={handleClick}>
        <Typography sx={{ fontSize: '12px', color: colors.grey12, whiteSpace: 'nowrap' }}>Select Validator</Typography>

        <Stack direction="row" alignItems="center" gap="8px" sx={{ overflow: 'hidden' }}>
          <Typography
            sx={{
              color: colors.white,
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
            style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: '.4s' }}>
            <g id="Component/icon/ic_Chevron Down">
              <path
                id="Shape"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99991 11.4264L13.5123 8.07257C13.8318 7.76748 14.3498 7.76748 14.6694 8.07257C14.9889 8.37767 14.9889 8.87233 14.6694 9.17743L10.5785 13.0837C10.2589 13.3888 9.74089 13.3888 9.42137 13.0837L5.33046 9.17743C5.01094 8.87233 5.01094 8.37767 5.33046 8.07257C5.64998 7.76748 6.16802 7.76748 6.48754 8.07257L9.99991 11.4264Z"
                fill={open ? colors.main : colors.grey12}
              />
            </g>
          </svg>
        </Stack>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            background: colors.card_bgColor,
            padding: '16px',
            borderRadius: '10px',
            '.item': {
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '8px 12px',
              transition: '.4s',
              '&.active': {
                background: colors.white1,
                color: colors.main
              },
              ':hover': {
                background: colors.white1,
                color: colors.main
              },
              ':not(:first-of-type)': {
                marginTop: '8px'
              }
            }
          }
        }}>
        <Stack
          sx={{
            maxHeight: '300px',
            width: '100%'
          }}>
          <SearchInput placeholder="Validator..." value={keywords} onChange={(value) => setKeywords(value)} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              mt: '16px',
              mb: '16px'
            }}>
            <Typography
              sx={{
                color: colors.grey12,
                fontSize: '14px'
              }}>
              Validator
            </Typography>
            <Typography
              sx={{
                color: colors.grey12,
                fontSize: '14px'
              }}>
              Commission
            </Typography>
          </Stack>
          <Stack
            sx={{
              flex: 1,
              overflow: 'auto'
            }}>
            {filterValidators?.map((item, index) => {
              return (
                <Box
                  key={index}
                  className="item"
                  sx={{
                    minWidth: '200px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onClick={() => {
                    onChangeValidator?.(item);
                    handleClose();
                  }}>
                  <Stack direction="row" alignItems="center">
                    <ValidatorLogo
                      sx={{
                        width: '32px',
                        height: '32px',
                        mr: '13px',
                        overflow: 'hidden'
                      }}
                      data={item.description?.identity}
                    />
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: colors.white
                      }}>
                      {item?.description?.moniker}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: '12px', color: colors.main, fontWeight: 700 }}>{`${getTruncate(
                    new BigNumber(item.commission.commission_rates.rate).multipliedBy(100).toString(),
                    2
                  )}%`}</Typography>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Dialog>
    </Fragment>
  );
}
