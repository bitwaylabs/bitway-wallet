import { BITWAY_CHAIN_MAINNET, SERVICE_BASE_URL_MAINNET } from '@/shared/constant';
import { IChain } from '@/shared/types';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface EnvironmentState {
  UNISAT_RUNE_URL: string;
  DEX_CONTRACT: string;
  DEX_ROUTER_CONTRACT: string;
  SERVICE_BASE_URL: string;
  BITWAY_BTC_EXPLORER: string;
  UNISAT_SERVICE_ENDPOINT: string;
  UNISAT_IO_API: string;
  BITWAY_STATION_URL: string;
  BITWAY_BRIDGEEXPLORER_URL: string;
  EVM_COLLECTOR: string;
  bitwayChain: IChain;
  chains: IChain[];
  DEFAUCET_REFERRAL_CODE: string;
}

export const initialState: EnvironmentState = {
  UNISAT_RUNE_URL: '',
  DEX_CONTRACT: '',
  DEX_ROUTER_CONTRACT: '',
  SERVICE_BASE_URL: SERVICE_BASE_URL_MAINNET,
  BITWAY_BTC_EXPLORER: '',
  UNISAT_SERVICE_ENDPOINT: '',
  UNISAT_IO_API: '',
  BITWAY_STATION_URL: '',
  BITWAY_BRIDGEEXPLORER_URL: '',
  EVM_COLLECTOR: '',
  bitwayChain: BITWAY_CHAIN_MAINNET,
  chains: [],
  DEFAUCET_REFERRAL_CODE: ''
};

const slice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    updateEnvironment(
      state,
      action: {
        payload: {
          UNISAT_RUNE_URL?: string;
          DEX_CONTRACT?: string;
          DEX_ROUTER_CONTRACT?: string;
          SERVICE_BASE_URL?: string;
          BITWAY_BTC_EXPLORER?: string;
          UNISAT_SERVICE_ENDPOINT?: string;
          UNISAT_IO_API?: string;
          BITWAY_STATION_URL?: string;
          BITWAY_BRIDGEEXPLORER_URL?: string;
          EVM_COLLECTOR?: string;
          bitwayChain?: IChain;
          chains?: IChain[];
          DEFAUCET_REFERRAL_CODE?: string;
        };
      }
    ) {
      const { payload } = action;
      state = Object.assign({}, state, payload);
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      // todo
    });
  }
});

export const environmentActions = slice.actions;
export default slice.reducer;
