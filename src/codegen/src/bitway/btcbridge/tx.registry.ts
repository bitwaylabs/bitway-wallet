//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSubmitDepositTransaction, MsgSubmitWithdrawTransaction, MsgSubmitFeeRate, MsgUpdateTrustedNonBtcRelayers, MsgUpdateTrustedFeeProviders, MsgWithdrawToBitcoin, MsgSubmitSignatures, MsgConsolidateVaults, MsgInitiateDKG, MsgCompleteDKG, MsgRefresh, MsgCompleteRefreshing, MsgTransferVault, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/bitway.btcbridge.MsgSubmitDepositTransaction", MsgSubmitDepositTransaction], ["/bitway.btcbridge.MsgSubmitWithdrawTransaction", MsgSubmitWithdrawTransaction], ["/bitway.btcbridge.MsgSubmitFeeRate", MsgSubmitFeeRate], ["/bitway.btcbridge.MsgUpdateTrustedNonBtcRelayers", MsgUpdateTrustedNonBtcRelayers], ["/bitway.btcbridge.MsgUpdateTrustedFeeProviders", MsgUpdateTrustedFeeProviders], ["/bitway.btcbridge.MsgWithdrawToBitcoin", MsgWithdrawToBitcoin], ["/bitway.btcbridge.MsgSubmitSignatures", MsgSubmitSignatures], ["/bitway.btcbridge.MsgConsolidateVaults", MsgConsolidateVaults], ["/bitway.btcbridge.MsgInitiateDKG", MsgInitiateDKG], ["/bitway.btcbridge.MsgCompleteDKG", MsgCompleteDKG], ["/bitway.btcbridge.MsgRefresh", MsgRefresh], ["/bitway.btcbridge.MsgCompleteRefreshing", MsgCompleteRefreshing], ["/bitway.btcbridge.MsgTransferVault", MsgTransferVault], ["/bitway.btcbridge.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitDepositTransaction",
        value: MsgSubmitDepositTransaction.encode(value).finish()
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransaction) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitWithdrawTransaction",
        value: MsgSubmitWithdrawTransaction.encode(value).finish()
      };
    },
    submitFeeRate(value: MsgSubmitFeeRate) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitFeeRate",
        value: MsgSubmitFeeRate.encode(value).finish()
      };
    },
    updateTrustedNonBtcRelayers(value: MsgUpdateTrustedNonBtcRelayers) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateTrustedNonBtcRelayers",
        value: MsgUpdateTrustedNonBtcRelayers.encode(value).finish()
      };
    },
    updateTrustedFeeProviders(value: MsgUpdateTrustedFeeProviders) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateTrustedFeeProviders",
        value: MsgUpdateTrustedFeeProviders.encode(value).finish()
      };
    },
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/bitway.btcbridge.MsgWithdrawToBitcoin",
        value: MsgWithdrawToBitcoin.encode(value).finish()
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitSignatures",
        value: MsgSubmitSignatures.encode(value).finish()
      };
    },
    consolidateVaults(value: MsgConsolidateVaults) {
      return {
        typeUrl: "/bitway.btcbridge.MsgConsolidateVaults",
        value: MsgConsolidateVaults.encode(value).finish()
      };
    },
    initiateDKG(value: MsgInitiateDKG) {
      return {
        typeUrl: "/bitway.btcbridge.MsgInitiateDKG",
        value: MsgInitiateDKG.encode(value).finish()
      };
    },
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/bitway.btcbridge.MsgCompleteDKG",
        value: MsgCompleteDKG.encode(value).finish()
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/bitway.btcbridge.MsgRefresh",
        value: MsgRefresh.encode(value).finish()
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/bitway.btcbridge.MsgCompleteRefreshing",
        value: MsgCompleteRefreshing.encode(value).finish()
      };
    },
    transferVault(value: MsgTransferVault) {
      return {
        typeUrl: "/bitway.btcbridge.MsgTransferVault",
        value: MsgTransferVault.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitDepositTransaction",
        value
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransaction) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitWithdrawTransaction",
        value
      };
    },
    submitFeeRate(value: MsgSubmitFeeRate) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitFeeRate",
        value
      };
    },
    updateTrustedNonBtcRelayers(value: MsgUpdateTrustedNonBtcRelayers) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateTrustedNonBtcRelayers",
        value
      };
    },
    updateTrustedFeeProviders(value: MsgUpdateTrustedFeeProviders) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateTrustedFeeProviders",
        value
      };
    },
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/bitway.btcbridge.MsgWithdrawToBitcoin",
        value
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitSignatures",
        value
      };
    },
    consolidateVaults(value: MsgConsolidateVaults) {
      return {
        typeUrl: "/bitway.btcbridge.MsgConsolidateVaults",
        value
      };
    },
    initiateDKG(value: MsgInitiateDKG) {
      return {
        typeUrl: "/bitway.btcbridge.MsgInitiateDKG",
        value
      };
    },
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/bitway.btcbridge.MsgCompleteDKG",
        value
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/bitway.btcbridge.MsgRefresh",
        value
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/bitway.btcbridge.MsgCompleteRefreshing",
        value
      };
    },
    transferVault(value: MsgTransferVault) {
      return {
        typeUrl: "/bitway.btcbridge.MsgTransferVault",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitDepositTransaction",
        value: MsgSubmitDepositTransaction.fromPartial(value)
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransaction) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitWithdrawTransaction",
        value: MsgSubmitWithdrawTransaction.fromPartial(value)
      };
    },
    submitFeeRate(value: MsgSubmitFeeRate) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitFeeRate",
        value: MsgSubmitFeeRate.fromPartial(value)
      };
    },
    updateTrustedNonBtcRelayers(value: MsgUpdateTrustedNonBtcRelayers) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateTrustedNonBtcRelayers",
        value: MsgUpdateTrustedNonBtcRelayers.fromPartial(value)
      };
    },
    updateTrustedFeeProviders(value: MsgUpdateTrustedFeeProviders) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateTrustedFeeProviders",
        value: MsgUpdateTrustedFeeProviders.fromPartial(value)
      };
    },
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/bitway.btcbridge.MsgWithdrawToBitcoin",
        value: MsgWithdrawToBitcoin.fromPartial(value)
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/bitway.btcbridge.MsgSubmitSignatures",
        value: MsgSubmitSignatures.fromPartial(value)
      };
    },
    consolidateVaults(value: MsgConsolidateVaults) {
      return {
        typeUrl: "/bitway.btcbridge.MsgConsolidateVaults",
        value: MsgConsolidateVaults.fromPartial(value)
      };
    },
    initiateDKG(value: MsgInitiateDKG) {
      return {
        typeUrl: "/bitway.btcbridge.MsgInitiateDKG",
        value: MsgInitiateDKG.fromPartial(value)
      };
    },
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/bitway.btcbridge.MsgCompleteDKG",
        value: MsgCompleteDKG.fromPartial(value)
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/bitway.btcbridge.MsgRefresh",
        value: MsgRefresh.fromPartial(value)
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/bitway.btcbridge.MsgCompleteRefreshing",
        value: MsgCompleteRefreshing.fromPartial(value)
      };
    },
    transferVault(value: MsgTransferVault) {
      return {
        typeUrl: "/bitway.btcbridge.MsgTransferVault",
        value: MsgTransferVault.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.btcbridge.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};