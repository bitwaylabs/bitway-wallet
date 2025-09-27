import { IChain } from '@/shared/types';

export interface GetConstantsResponse {
  config: {
    DEX_CONTRACT: string;
    DEX_ROUTER_CONTRACT: string;
    UNISAT_RUNE_URL: string;
    UNISAT_SERVICE_ENDPOINT: string;
    OPENAPI_URL: string;
    BITWAY_BTC_EXPLORER: string;
    BITWAY_STATION_URL: string;
    BITWAY_BRIDGEEXPLORER_URL: string;
    BITWAY_CHAIN: IChain;
    UNISAT_IO_API: string;
    EVM_COLLECTOR: string;
    DEFAUCET_REFERRAL_CODE: string;
  };
  version: string;
  chains: IChain[];
}
