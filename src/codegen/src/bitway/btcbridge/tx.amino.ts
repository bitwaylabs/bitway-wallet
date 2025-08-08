//@ts-nocheck
import { MsgSubmitDepositTransaction, MsgSubmitWithdrawTransaction, MsgSubmitFeeRate, MsgUpdateTrustedNonBtcRelayers, MsgUpdateTrustedFeeProviders, MsgWithdrawToBitcoin, MsgSubmitSignatures, MsgConsolidateVaults, MsgInitiateDKG, MsgCompleteDKG, MsgRefresh, MsgCompleteRefreshing, MsgTransferVault, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/bitway.btcbridge.MsgSubmitDepositTransaction": {
    aminoType: "/bitway.btcbridge.MsgSubmitDepositTransaction",
    toAmino: MsgSubmitDepositTransaction.toAmino,
    fromAmino: MsgSubmitDepositTransaction.fromAmino
  },
  "/bitway.btcbridge.MsgSubmitWithdrawTransaction": {
    aminoType: "/bitway.btcbridge.MsgSubmitWithdrawTransaction",
    toAmino: MsgSubmitWithdrawTransaction.toAmino,
    fromAmino: MsgSubmitWithdrawTransaction.fromAmino
  },
  "/bitway.btcbridge.MsgSubmitFeeRate": {
    aminoType: "/bitway.btcbridge.MsgSubmitFeeRate",
    toAmino: MsgSubmitFeeRate.toAmino,
    fromAmino: MsgSubmitFeeRate.fromAmino
  },
  "/bitway.btcbridge.MsgUpdateTrustedNonBtcRelayers": {
    aminoType: "/bitway.btcbridge.MsgUpdateTrustedNonBtcRelayers",
    toAmino: MsgUpdateTrustedNonBtcRelayers.toAmino,
    fromAmino: MsgUpdateTrustedNonBtcRelayers.fromAmino
  },
  "/bitway.btcbridge.MsgUpdateTrustedFeeProviders": {
    aminoType: "/bitway.btcbridge.MsgUpdateTrustedFeeProviders",
    toAmino: MsgUpdateTrustedFeeProviders.toAmino,
    fromAmino: MsgUpdateTrustedFeeProviders.fromAmino
  },
  "/bitway.btcbridge.MsgWithdrawToBitcoin": {
    aminoType: "/bitway.btcbridge.MsgWithdrawToBitcoin",
    toAmino: MsgWithdrawToBitcoin.toAmino,
    fromAmino: MsgWithdrawToBitcoin.fromAmino
  },
  "/bitway.btcbridge.MsgSubmitSignatures": {
    aminoType: "/bitway.btcbridge.MsgSubmitSignatures",
    toAmino: MsgSubmitSignatures.toAmino,
    fromAmino: MsgSubmitSignatures.fromAmino
  },
  "/bitway.btcbridge.MsgConsolidateVaults": {
    aminoType: "/bitway.btcbridge.MsgConsolidateVaults",
    toAmino: MsgConsolidateVaults.toAmino,
    fromAmino: MsgConsolidateVaults.fromAmino
  },
  "/bitway.btcbridge.MsgInitiateDKG": {
    aminoType: "/bitway.btcbridge.MsgInitiateDKG",
    toAmino: MsgInitiateDKG.toAmino,
    fromAmino: MsgInitiateDKG.fromAmino
  },
  "/bitway.btcbridge.MsgCompleteDKG": {
    aminoType: "/bitway.btcbridge.MsgCompleteDKG",
    toAmino: MsgCompleteDKG.toAmino,
    fromAmino: MsgCompleteDKG.fromAmino
  },
  "/bitway.btcbridge.MsgRefresh": {
    aminoType: "/bitway.btcbridge.MsgRefresh",
    toAmino: MsgRefresh.toAmino,
    fromAmino: MsgRefresh.fromAmino
  },
  "/bitway.btcbridge.MsgCompleteRefreshing": {
    aminoType: "/bitway.btcbridge.MsgCompleteRefreshing",
    toAmino: MsgCompleteRefreshing.toAmino,
    fromAmino: MsgCompleteRefreshing.fromAmino
  },
  "/bitway.btcbridge.MsgTransferVault": {
    aminoType: "/bitway.btcbridge.MsgTransferVault",
    toAmino: MsgTransferVault.toAmino,
    fromAmino: MsgTransferVault.fromAmino
  },
  "/bitway.btcbridge.MsgUpdateParams": {
    aminoType: "/bitway.btcbridge.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};