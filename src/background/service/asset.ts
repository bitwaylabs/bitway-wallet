import { createPersistStore } from '@/background/utils';
import { BalanceItem } from '@/shared/types';

export type AssetPriceType = {
  [key: string]: string;
};

export type AssetStore = {
  bitwayBalanceList: BalanceItem[];
  btcBalanceList: BalanceItem[];
};

class AssetService {
  store!: AssetStore;

  init = async () => {
    this.store = await createPersistStore<AssetStore>({
      name: 'asset',
      template: {
        bitwayBalanceList: [],
        btcBalanceList: []
      }
    });
  };

  setBitwayBalanceList = (data: BalanceItem[]) => {
    this.store.bitwayBalanceList = data;
  };

  getBitwayBalanceList = () => {
    return this.store.bitwayBalanceList;
  };

  setBtcBalanceList = (data: BalanceItem[]) => {
    this.store.btcBalanceList = data;
  };

  getBtcBalanceList = () => {
    return this.store.btcBalanceList;
  };
}

export default new AssetService();
