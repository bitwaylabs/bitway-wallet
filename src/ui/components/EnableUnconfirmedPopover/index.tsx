import { Icon } from '@/ui/components';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';

import { Button } from '../Button';
import { Column } from '../Column';
import { Popover } from '../Popover';
import { Text } from '../Text';

export const EnableUnconfirmedPopover = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => {
  const isLight = useIsLight();
  return (
    <Popover>
      <Column justifyCenter itemsCenter>
        <div
          className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isLight ? colors.light_bg : colors.dark_bg
          }}>
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#F0B622] bg-opacity-10">
            <Icon icon={'warning2'} color={'icon_yellow'} size={24} />
          </div>
        </div>
        <Text
          text="Enable Unconfirmed Balance"
          mt="sm"
          preset="title-bold"
          color={isLight ? 'black' : 'white'}
          style={{
            fontSize: '16px'
          }}
        />
        <Column gap="zero">
          <div
            className="text-opacity-50"
            style={{ color: isLight ? colors.black : colors.white, fontSize: fontSizes.sm, marginTop: 0 }}>
            If Runes (or ARC20) assets are detected in the given address, the unconfirmed UTXOs are explicitly not
            allowed to be spent until it's confirmed. Forcely spending these unconfirmed assets will incur the risks of
            losing assets.
          </div>
        </Column>

        <Column full mt={'xl'}>
          <Button
            text="Allow using unconfirmed balance"
            preset="primary"
            onClick={(e) => {
              if (onConfirm) {
                onConfirm();
              }
            }}
            style={{
              fontWeight: 600,
              fontSize: fontSizes.sm,
              height: 48
            }}
          />
          <Button
            text="Cancel"
            preset="default"
            onClick={(e) => {
              if (onClose) {
                onClose();
              }
            }}
            style={{
              fontWeight: 600,
              fontSize: fontSizes.sm,
              height: 48
            }}
          />
        </Column>
      </Column>
    </Popover>
  );
};
