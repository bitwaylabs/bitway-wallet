//@ts-nocheck
import { MsgCreatePool, MsgAddLiquidity, MsgRemoveLiquidity, MsgUpdatePoolConfig, MsgApply, MsgSubmitCets, MsgSubmitDepositTransaction, MsgRedeem, MsgRepay, MsgRegisterReferrer, MsgUpdateReferrer, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/bitway.lending.MsgCreatePool": {
    aminoType: "/bitway.lending.MsgCreatePool",
    toAmino: MsgCreatePool.toAmino,
    fromAmino: MsgCreatePool.fromAmino
  },
  "/bitway.lending.MsgAddLiquidity": {
    aminoType: "/bitway.lending.MsgAddLiquidity",
    toAmino: MsgAddLiquidity.toAmino,
    fromAmino: MsgAddLiquidity.fromAmino
  },
  "/bitway.lending.MsgRemoveLiquidity": {
    aminoType: "/bitway.lending.MsgRemoveLiquidity",
    toAmino: MsgRemoveLiquidity.toAmino,
    fromAmino: MsgRemoveLiquidity.fromAmino
  },
  "/bitway.lending.MsgUpdatePoolConfig": {
    aminoType: "/bitway.lending.MsgUpdatePoolConfig",
    toAmino: MsgUpdatePoolConfig.toAmino,
    fromAmino: MsgUpdatePoolConfig.fromAmino
  },
  "/bitway.lending.MsgApply": {
    aminoType: "/bitway.lending.MsgApply",
    toAmino: MsgApply.toAmino,
    fromAmino: MsgApply.fromAmino
  },
  "/bitway.lending.MsgSubmitCets": {
    aminoType: "/bitway.lending.MsgSubmitCets",
    toAmino: MsgSubmitCets.toAmino,
    fromAmino: MsgSubmitCets.fromAmino
  },
  "/bitway.lending.MsgSubmitDepositTransaction": {
    aminoType: "/bitway.lending.MsgSubmitDepositTransaction",
    toAmino: MsgSubmitDepositTransaction.toAmino,
    fromAmino: MsgSubmitDepositTransaction.fromAmino
  },
  "/bitway.lending.MsgRedeem": {
    aminoType: "/bitway.lending.MsgRedeem",
    toAmino: MsgRedeem.toAmino,
    fromAmino: MsgRedeem.fromAmino
  },
  "/bitway.lending.MsgRepay": {
    aminoType: "/bitway.lending.MsgRepay",
    toAmino: MsgRepay.toAmino,
    fromAmino: MsgRepay.fromAmino
  },
  "/bitway.lending.MsgRegisterReferrer": {
    aminoType: "/bitway.lending.MsgRegisterReferrer",
    toAmino: MsgRegisterReferrer.toAmino,
    fromAmino: MsgRegisterReferrer.fromAmino
  },
  "/bitway.lending.MsgUpdateReferrer": {
    aminoType: "/bitway.lending.MsgUpdateReferrer",
    toAmino: MsgUpdateReferrer.toAmino,
    fromAmino: MsgUpdateReferrer.fromAmino
  },
  "/bitway.lending.MsgUpdateParams": {
    aminoType: "/bitway.lending.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};