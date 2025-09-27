import { createPersistStore } from '@/background/utils';
import { BITWAY_CHAIN_MAINNET, ChainType, SERVICE_BASE_URL_MAINNET, SERVICE_BASE_URL_TESTNET } from '@/shared/constant';
import { IChain } from '@/shared/types';
import services from '@/ui/services';

export type EnvironmentStore = {
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
};

class EnvironmentService {
  store!: EnvironmentStore;

  init = async () => {
    this.store = await createPersistStore<EnvironmentStore>({
      name: 'environment',
      template: {
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
      }
    });
    try {
      const { config, chains } = await services.environment.getWalletParams({
        baseURL: this.store.SERVICE_BASE_URL
      });
      if (this.store.UNISAT_RUNE_URL !== config.UNISAT_RUNE_URL) {
        this.store.UNISAT_RUNE_URL = config.UNISAT_RUNE_URL;
      }
      if (this.store.DEX_CONTRACT !== config.DEX_CONTRACT) {
        this.store.DEX_CONTRACT = config.DEX_CONTRACT;
      }
      if (this.store.DEX_ROUTER_CONTRACT !== config.DEX_ROUTER_CONTRACT) {
        this.store.DEX_ROUTER_CONTRACT = config.DEX_ROUTER_CONTRACT;
      }
      if (this.store.BITWAY_BTC_EXPLORER !== config.BITWAY_BTC_EXPLORER) {
        this.store.BITWAY_BTC_EXPLORER = config.BITWAY_BTC_EXPLORER;
      }
      if (this.store.UNISAT_SERVICE_ENDPOINT !== config.UNISAT_SERVICE_ENDPOINT) {
        this.store.UNISAT_SERVICE_ENDPOINT = config.UNISAT_SERVICE_ENDPOINT;
      }
      if (this.store.UNISAT_IO_API !== config.UNISAT_IO_API) {
        this.store.UNISAT_IO_API = config.UNISAT_IO_API;
      }
      if (this.store.BITWAY_STATION_URL !== config.BITWAY_STATION_URL) {
        this.store.BITWAY_STATION_URL = config.BITWAY_STATION_URL;
      }
      if (this.store.BITWAY_BRIDGEEXPLORER_URL !== config.BITWAY_BRIDGEEXPLORER_URL) {
        this.store.BITWAY_BRIDGEEXPLORER_URL = config.BITWAY_BRIDGEEXPLORER_URL;
      }
      if (this.store.EVM_COLLECTOR !== config.EVM_COLLECTOR) {
        this.store.EVM_COLLECTOR = config.EVM_COLLECTOR;
      }
      if (this.store.DEFAUCET_REFERRAL_CODE !== config.DEFAUCET_REFERRAL_CODE) {
        this.store.DEFAUCET_REFERRAL_CODE = config.DEFAUCET_REFERRAL_CODE;
      }
      this.store.bitwayChain = config.BITWAY_CHAIN;
      this.store.chains = chains;
    } catch (err) {
      console.error(err);
    }
  };

  setChainType = async (chainType: ChainType) => {
    let baseURL = SERVICE_BASE_URL_MAINNET;
    if (chainType === ChainType.BITCOIN_TESTNET) {
      baseURL = SERVICE_BASE_URL_TESTNET;
    }
    const { config, chains } = await services.environment.getWalletParams({ baseURL });
    this.store.UNISAT_RUNE_URL = config.UNISAT_RUNE_URL;
    this.store.DEX_CONTRACT = config.DEX_CONTRACT;
    this.store.DEX_ROUTER_CONTRACT = config.DEX_ROUTER_CONTRACT;
    this.store.BITWAY_BTC_EXPLORER = config.BITWAY_BTC_EXPLORER;
    this.store.UNISAT_SERVICE_ENDPOINT = config.UNISAT_SERVICE_ENDPOINT;
    this.store.UNISAT_IO_API = config.UNISAT_IO_API;
    this.store.BITWAY_STATION_URL = config.BITWAY_STATION_URL;
    this.store.BITWAY_BRIDGEEXPLORER_URL = config.BITWAY_BRIDGEEXPLORER_URL;
    this.store.bitwayChain = config.BITWAY_CHAIN;
    this.store.chains = chains;
    this.store.SERVICE_BASE_URL = baseURL;
    this.store.DEFAUCET_REFERRAL_CODE = config.DEFAUCET_REFERRAL_CODE;
  };

  getEnvironment = async () => {
    try {
      const { config, chains } = await services.environment.getWalletParams({ baseURL: this.store.SERVICE_BASE_URL });
      this.store.UNISAT_RUNE_URL = config.UNISAT_RUNE_URL;
      this.store.DEX_CONTRACT = config.DEX_CONTRACT;
      this.store.DEX_ROUTER_CONTRACT = config.DEX_ROUTER_CONTRACT;
      this.store.BITWAY_BTC_EXPLORER = config.BITWAY_BTC_EXPLORER;
      this.store.UNISAT_SERVICE_ENDPOINT = config.UNISAT_SERVICE_ENDPOINT;
      this.store.UNISAT_IO_API = config.UNISAT_IO_API;
      this.store.BITWAY_STATION_URL = config.BITWAY_STATION_URL;
      this.store.BITWAY_BRIDGEEXPLORER_URL = config.BITWAY_BRIDGEEXPLORER_URL;
      this.store.EVM_COLLECTOR = config.EVM_COLLECTOR;
      this.store.bitwayChain = config.BITWAY_CHAIN;
      this.store.chains = chains;
      this.store.DEFAUCET_REFERRAL_CODE = config.DEFAUCET_REFERRAL_CODE;
    } catch (err) {
      console.error(err);
    }
    return {
      UNISAT_RUNE_URL: this.store.UNISAT_RUNE_URL,
      DEX_CONTRACT: this.store.DEX_CONTRACT,
      DEX_ROUTER_CONTRACT: this.store.DEX_ROUTER_CONTRACT,
      SERVICE_BASE_URL: this.store.SERVICE_BASE_URL,
      BITWAY_BTC_EXPLORER: this.store.BITWAY_BTC_EXPLORER,
      UNISAT_SERVICE_ENDPOINT: this.store.UNISAT_SERVICE_ENDPOINT,
      UNISAT_IO_API: this.store.UNISAT_IO_API,
      BITWAY_STATION_URL: this.store.BITWAY_STATION_URL,
      BITWAY_BRIDGEEXPLORER_URL: this.store.BITWAY_BRIDGEEXPLORER_URL,
      EVM_COLLECTOR: this.store.EVM_COLLECTOR,
      bitwayChain: this.store.bitwayChain,
      chains: this.store.chains,
      DEFAUCET_REFERRAL_CODE: this.store.DEFAUCET_REFERRAL_CODE
    };
  };
}

export default new EnvironmentService();
