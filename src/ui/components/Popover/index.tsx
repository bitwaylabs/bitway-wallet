import React from 'react';

import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { CloseOutlined } from '@ant-design/icons';

import { Row } from '../Row';

export const Popover = ({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) => {
  const isLight = useIsLight();
  return (
    <div className="popover-container">
      <div
        style={{
          backgroundColor: isLight ? colors.light_bg : colors.dark_bg,
          width: 340,
          padding: 20,
          borderRadius: 15,
          position: 'relative'
        }}>
        {onClose && (
          <Row
            style={{ position: 'absolute', top: 10, right: 10 }}
            justifyEnd
            onClick={() => {
              onClose();
            }}>
            <CloseOutlined />
          </Row>
        )}

        {children}
      </div>
    </div>
  );
};
