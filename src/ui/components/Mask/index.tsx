import React, { useState } from 'react';

import { useIsLight } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

export function Mask({ children, onClick }: { children: React.ReactNode; onClick?: React.MouseEventHandler }) {
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isLight = useIsLight();

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      style={{
        position: 'relative'
      }}>
      {children}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
          backdropFilter: 'blur(5px)',
          borderRadius: '14px',
          display: visible ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center'
          // maxHeight: '185px'
        }}>
        <div
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            setVisible(!visible);
            onClick();
          }}>
          {isHovered ? (
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}>
              <path
                d="M4.03354 21.1893C3.80656 20.8299 3.69307 20.6502 3.62954 20.373C3.58182 20.1648 3.58182 19.8365 3.62954 19.6283C3.69307 19.3511 3.80656 19.1714 4.03354 18.812C5.90922 15.8421 11.4923 8.33398 20.0007 8.33398C28.509 8.33398 34.0921 15.8421 35.9678 18.812C36.1948 19.1714 36.3083 19.3511 36.3718 19.6283C36.4195 19.8365 36.4195 20.1648 36.3718 20.373C36.3083 20.6502 36.1948 20.8299 35.9678 21.1893C34.0921 24.1593 28.509 31.6673 20.0007 31.6673C11.4923 31.6673 5.90922 24.1593 4.03354 21.1893Z"
                stroke={isLight ? colors.black : colors.white}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.0007 25.0007C22.7621 25.0007 25.0007 22.7621 25.0007 20.0007C25.0007 17.2392 22.7621 15.0007 20.0007 15.0007C17.2392 15.0007 15.0007 17.2392 15.0007 20.0007C15.0007 22.7621 17.2392 25.0007 20.0007 25.0007Z"
                stroke={isLight ? colors.black : colors.white}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="40"
              height="40"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: 'pointer' }}>
              <path
                d="M8.95245 4.2436C9.29113 4.19353 9.64051 4.16667 10.0003 4.16667C14.2545 4.16667 17.0461 7.9207 17.9839 9.40569C18.0974 9.58542 18.1542 9.67528 18.1859 9.81389C18.2098 9.91799 18.2098 10.0822 18.1859 10.1863C18.1541 10.3249 18.097 10.4154 17.9827 10.5963C17.7328 10.9918 17.3518 11.5476 16.8471 12.1504M5.6036 5.59586C3.80187 6.81808 2.57871 8.51615 2.01759 9.4044C1.90357 9.58489 1.84656 9.67514 1.81478 9.81373C1.79091 9.91783 1.7909 10.082 1.81476 10.1861C1.84652 10.3247 1.90328 10.4146 2.01678 10.5943C2.95462 12.0793 5.74618 15.8333 10.0003 15.8333C11.7157 15.8333 13.1932 15.223 14.4073 14.3972M2.50035 2.5L17.5003 17.5M8.23258 8.23223C7.78017 8.68464 7.50035 9.30964 7.50035 10C7.50035 11.3807 8.61963 12.5 10.0003 12.5C10.6907 12.5 11.3157 12.2202 11.7681 11.7678"
                stroke={isLight ? colors.black : colors.white}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
