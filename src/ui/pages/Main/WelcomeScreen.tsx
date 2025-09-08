import { useLocation, useNavigate as useNavigateRouter } from 'react-router-dom';

import { Button, Column, Header, Image, Row } from '@/ui/components';
import { useExtensionIsInTab } from '@/ui/features/browser/tabs';
import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { useWallet } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const navigateRouter = useNavigateRouter();
  const { state } = useLocation();
  const wallet = useWallet();
  const isInTab = useExtensionIsInTab();
  const isLight = useIsLight();

  return (
    <div
      className={`
      flex
      flex-col
      min-h-[600px]
      w-full
      ${window.location.pathname === '/sidePanel.html' ? 'max-w-[100vw]' : 'max-w-[500px]'}
      min-h-[450px]
      ${window.location.pathname === '/sidePanel.html' ? 'h-screen' : isInTab ? 'h-[450px]' : 'h-[600px]'}
      overflow-y-auto
      overflow-x-hidden
      ${!isInTab ? 'border border-white/10' : 'border-none'}
    `}
      style={{
        backgroundColor: isLight ? colors.white : colors.dark_bg
      }}>
      {state?.addWallet && <Header onBack={() => navigateRouter(-1)} title="Add Wallet" />}

      <Column
        fullX
        fullY
        style={{
          gap: '0',
          padding: isInTab ? '0 40px 24px' : '0 16px 24px'
        }}>
        <Column
          style={{
            flex: 1
          }}
          gap={'lg'}>
          <Column
            justifyCenter
            style={{
              flex: 1,
              alignItems: 'center'
            }}
            gap="xl">
            <Row
              justifyCenter
              itemsCenter
              style={{
                borderRadius: '20px',
                width: isInTab ? 80 : 80,
                height: isInTab ? 80 : 80
              }}>
              <Image src="/images/logo/wallet-logo.png" width={isInTab ? 80 : 80} height={isInTab ? 80 : 80} />
            </Row>
            <Row justifyCenter itemsCenter gap="xs" mb="lg">
              <svg width="214" height="21" viewBox="0 0 214 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M93.8356 20.6193V13.8139L87.2734 0.779785H92.4028L96.3286 9.11355H96.5292L100.398 0.779785H105.412L98.8217 13.8139V20.6193H93.8356Z"
                  fill={isLight ? colors.black : colors.white}
                />
                <path
                  d="M89.4834 20.6191H84.7461L83.7314 17.042L83.7432 17.041L82.5088 12.4502L82.4805 12.4521L80.4131 5.10449H80.2256L78.0811 12.8164L78.0781 12.8174L76.6982 17.9619L76.708 17.96L75.9727 20.6191H71.3438L77.2109 0.779297H83.5889L89.4834 20.6191Z"
                  fill={isLight ? colors.black : colors.white}
                />
                <path
                  d="M19.5938 20.6193V0.779785H24.582V20.6193H19.5938Z"
                  fill={isLight ? colors.black : colors.white}
                />
                <path
                  d="M28.2612 0.779296L44.1328 0.779297L44.1328 5.76753L28.2612 5.76753L28.2612 0.779296Z"
                  fill={isLight ? colors.black : colors.white}
                />
                <path
                  d="M38.6914 0.779585L38.6914 20.6191L33.7032 20.6191L33.7032 0.779584L38.6914 0.779585Z"
                  fill={isLight ? colors.black : colors.white}
                />
                <path
                  d="M0.0351562 20.6193V0.779785H10.0853C11.3596 0.779785 12.412 0.962417 13.2422 1.32768C14.0918 1.69294 14.7193 2.25045 15.1248 3.0002C15.5496 3.73073 15.762 4.6535 15.762 5.76851C15.762 6.69128 15.6365 7.46987 15.3855 8.10427C15.1345 8.73868 14.7483 9.24812 14.227 9.63261C13.7249 9.99787 13.0781 10.267 12.2864 10.44V10.5554C13.136 10.7284 13.8215 10.9975 14.3428 11.3628C14.8834 11.7281 15.2793 12.2375 15.5303 12.8911C15.7813 13.5255 15.9068 14.3426 15.9068 15.3422C15.9068 16.1689 15.8006 16.909 15.5882 17.5627C15.3951 18.2163 15.0669 18.7738 14.6035 19.2352C14.1594 19.6773 13.5608 20.0234 12.8078 20.2733C12.0741 20.504 11.1665 20.6193 10.0853 20.6193H0.0351562ZM5.04573 16.8706H8.31853C9.01364 16.8706 9.54463 16.8129 9.91149 16.6976C10.2784 16.563 10.5294 16.3323 10.6645 16.0055C10.7997 15.6787 10.8673 15.2173 10.8673 14.6213C10.8673 14.0062 10.7997 13.5352 10.6645 13.2083C10.5294 12.8815 10.2687 12.6604 9.88253 12.5451C9.51567 12.4105 8.99433 12.3432 8.31853 12.3432H5.04573V16.8706ZM5.04573 8.85402H8.23164C8.88814 8.85402 9.39981 8.79635 9.76668 8.681C10.1335 8.54643 10.3846 8.32535 10.5197 8.01776C10.6742 7.71017 10.7514 7.27762 10.7514 6.72012C10.7514 6.12416 10.6838 5.67239 10.5487 5.3648C10.4328 5.05721 10.1915 4.84574 9.8246 4.73039C9.47705 4.61505 8.94606 4.55737 8.23164 4.55737H5.04573V8.85402Z"
                  fill={isLight ? colors.black : colors.white}
                />
                <path
                  d="M51.5863 20.6193L47.8203 0.779785H52.0786L54.5155 14.9385H54.7124L57.4692 1.34834H61.8998L64.7059 14.9385H64.9028L67.1427 0.779785H71.401L67.635 20.6193H62.2691L59.6845 8.10427H59.5122L56.9523 20.6193H51.5863Z"
                  fill={isLight ? colors.black : colors.white}
                />
                <path
                  d="M150.057 20.6191H145.32L144.306 17.042L144.316 17.041L143.082 12.4502L143.055 12.4521L140.987 5.10449H140.799L138.655 12.8164L138.651 12.8174L137.272 17.9619L137.281 17.96L136.547 20.6191H131.918L137.785 0.779297H144.163L150.057 20.6191Z"
                  fill="#94E360"
                />
                <path
                  d="M112.356 20.6193L108.59 0.779785H112.848L115.285 14.9385H115.482L118.239 1.34834H122.669L125.475 14.9385H125.672L127.912 0.779785H132.171L128.405 20.6193H123.039L120.454 8.10427H120.282L117.722 20.6193H112.356Z"
                  fill="#94E360"
                />
                <path
                  d="M198.68 4.70439V0.779785H213.963V4.70439H208.728V20.8898H203.915V4.70439H198.68Z"
                  fill="#94E360"
                />
                <path d="M168.113 0.779785H172.989V17.1084H179.375V20.8898H168.113V0.779785Z" fill="#94E360" />
                <path d="M152.832 0.779785H157.707V17.1084H164.094V20.8898H152.832V0.779785Z" fill="#94E360" />
                <path
                  d="M193.818 8.77197V12.5532H187.393V16.9653H194.66V20.8892H182.594V8.78174H188.627V8.77197H193.818ZM194.66 4.70459H188.627V4.70264H182.594V0.779785H194.66V4.70459Z"
                  fill="#94E360"
                />
              </svg>
            </Row>
          </Column>

          <Button
            text="Create new wallet"
            preset="primary"
            onClick={async () => {
              const isBooted = await wallet.isBooted();
              if (isBooted) {
                navigate('CreateHDWalletScreen', { isImport: false });
              } else {
                navigate('CreatePasswordScreen', { isNewAccount: true });
              }
            }}
          />
          <Button
            text="Import an existing wallet"
            preset="default"
            onClick={async () => {
              const isBooted = await wallet.isBooted();
              if (isBooted) {
                navigate('CreateHDWalletScreen', { isImport: true });
              } else {
                navigate('CreatePasswordScreen', { isNewAccount: false });
              }
            }}
            style={{
              marginTop: '8px'
            }}
          />
        </Column>
      </Column>
    </div>
  );
}
