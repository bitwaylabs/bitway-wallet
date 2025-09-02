import { useExtensionIsInTab } from '../features/browser/tabs';
import { useIsLight } from '../state/settings/hooks';
import { colors } from '../theme/colors';

export const AppDimensions = (props) => {
  const extensionIsInTab = useExtensionIsInTab();
  const isLight = useIsLight();

  return (
    <div
      style={{
        width: extensionIsInTab ? '100vw' : '360px',
        height: extensionIsInTab ? '100vh' : '600px',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isLight ? colors.white : colors.black
      }}
      {...props}
    />
  );
};

export const AppSideDimensions = (props) => {
  // const extensionIsInTab = useExtensionIsInTab();
  const isLight = useIsLight();
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isLight ? colors.white : colors.black
      }}
      {...props}
    />
  );
};
