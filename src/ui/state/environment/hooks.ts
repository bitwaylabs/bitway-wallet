import { useCallback } from 'react';

import { SERVICE_BASE_URL_MAINNET, SERVICE_BASE_URL_TESTNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import services from '@/ui/services';

import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { environmentActions } from './reducer';

export function useEnvironmentState(): AppState['environment'] {
  return useAppSelector((state) => state.environment);
}

export function useEnvironment() {
  const environment = useEnvironmentState();
  return environment;
}

export function useChangeEnvironmentCallback() {
  const dispatch = useAppDispatch();
  return useCallback(
    async (networkType: NetworkType) => {
      let baseURL = SERVICE_BASE_URL_MAINNET;
      if (networkType === NetworkType.TESTNET) {
        baseURL = SERVICE_BASE_URL_TESTNET;
      }
      const { config, chains } = await services.environment.getWalletParams({ baseURL });

      dispatch(
        environmentActions.updateEnvironment({
          UNISAT_RUNE_URL: config.UNISAT_RUNE_URL,
          DEX_CONTRACT: config.DEX_CONTRACT,
          DEX_ROUTER_CONTRACT: config.DEX_ROUTER_CONTRACT,
          BITWAY_BTC_EXPLORER: config.BITWAY_BTC_EXPLORER,
          UNISAT_SERVICE_ENDPOINT: config.UNISAT_SERVICE_ENDPOINT,
          UNISAT_IO_API: config.UNISAT_IO_API,
          BITWAY_STATION_URL: config.BITWAY_STATION_URL,
          BITWAY_BRIDGEEXPLORER_URL: config.BITWAY_BRIDGEEXPLORER_URL,
          EVM_COLLECTOR: config.EVM_COLLECTOR,
          bitwayChain: config.BITWAY_CHAIN,
          DEFAUCET_REFERRAL_CODE: config.DEFAUCET_REFERRAL_CODE,
          chains,
          SERVICE_BASE_URL: baseURL
        })
      );
    },
    [dispatch]
  );
}
