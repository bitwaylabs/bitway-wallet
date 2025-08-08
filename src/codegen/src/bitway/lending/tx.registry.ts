//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreatePool, MsgAddLiquidity, MsgRemoveLiquidity, MsgUpdatePoolConfig, MsgApply, MsgSubmitCets, MsgSubmitDepositTransaction, MsgRedeem, MsgRepay, MsgRegisterReferrer, MsgUpdateReferrer, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/bitway.lending.MsgCreatePool", MsgCreatePool], ["/bitway.lending.MsgAddLiquidity", MsgAddLiquidity], ["/bitway.lending.MsgRemoveLiquidity", MsgRemoveLiquidity], ["/bitway.lending.MsgUpdatePoolConfig", MsgUpdatePoolConfig], ["/bitway.lending.MsgApply", MsgApply], ["/bitway.lending.MsgSubmitCets", MsgSubmitCets], ["/bitway.lending.MsgSubmitDepositTransaction", MsgSubmitDepositTransaction], ["/bitway.lending.MsgRedeem", MsgRedeem], ["/bitway.lending.MsgRepay", MsgRepay], ["/bitway.lending.MsgRegisterReferrer", MsgRegisterReferrer], ["/bitway.lending.MsgUpdateReferrer", MsgUpdateReferrer], ["/bitway.lending.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/bitway.lending.MsgCreatePool",
        value: MsgCreatePool.encode(value).finish()
      };
    },
    addLiquidity(value: MsgAddLiquidity) {
      return {
        typeUrl: "/bitway.lending.MsgAddLiquidity",
        value: MsgAddLiquidity.encode(value).finish()
      };
    },
    removeLiquidity(value: MsgRemoveLiquidity) {
      return {
        typeUrl: "/bitway.lending.MsgRemoveLiquidity",
        value: MsgRemoveLiquidity.encode(value).finish()
      };
    },
    updatePoolConfig(value: MsgUpdatePoolConfig) {
      return {
        typeUrl: "/bitway.lending.MsgUpdatePoolConfig",
        value: MsgUpdatePoolConfig.encode(value).finish()
      };
    },
    apply(value: MsgApply) {
      return {
        typeUrl: "/bitway.lending.MsgApply",
        value: MsgApply.encode(value).finish()
      };
    },
    submitCets(value: MsgSubmitCets) {
      return {
        typeUrl: "/bitway.lending.MsgSubmitCets",
        value: MsgSubmitCets.encode(value).finish()
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/bitway.lending.MsgSubmitDepositTransaction",
        value: MsgSubmitDepositTransaction.encode(value).finish()
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/bitway.lending.MsgRedeem",
        value: MsgRedeem.encode(value).finish()
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/bitway.lending.MsgRepay",
        value: MsgRepay.encode(value).finish()
      };
    },
    registerReferrer(value: MsgRegisterReferrer) {
      return {
        typeUrl: "/bitway.lending.MsgRegisterReferrer",
        value: MsgRegisterReferrer.encode(value).finish()
      };
    },
    updateReferrer(value: MsgUpdateReferrer) {
      return {
        typeUrl: "/bitway.lending.MsgUpdateReferrer",
        value: MsgUpdateReferrer.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.lending.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/bitway.lending.MsgCreatePool",
        value
      };
    },
    addLiquidity(value: MsgAddLiquidity) {
      return {
        typeUrl: "/bitway.lending.MsgAddLiquidity",
        value
      };
    },
    removeLiquidity(value: MsgRemoveLiquidity) {
      return {
        typeUrl: "/bitway.lending.MsgRemoveLiquidity",
        value
      };
    },
    updatePoolConfig(value: MsgUpdatePoolConfig) {
      return {
        typeUrl: "/bitway.lending.MsgUpdatePoolConfig",
        value
      };
    },
    apply(value: MsgApply) {
      return {
        typeUrl: "/bitway.lending.MsgApply",
        value
      };
    },
    submitCets(value: MsgSubmitCets) {
      return {
        typeUrl: "/bitway.lending.MsgSubmitCets",
        value
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/bitway.lending.MsgSubmitDepositTransaction",
        value
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/bitway.lending.MsgRedeem",
        value
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/bitway.lending.MsgRepay",
        value
      };
    },
    registerReferrer(value: MsgRegisterReferrer) {
      return {
        typeUrl: "/bitway.lending.MsgRegisterReferrer",
        value
      };
    },
    updateReferrer(value: MsgUpdateReferrer) {
      return {
        typeUrl: "/bitway.lending.MsgUpdateReferrer",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.lending.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/bitway.lending.MsgCreatePool",
        value: MsgCreatePool.fromPartial(value)
      };
    },
    addLiquidity(value: MsgAddLiquidity) {
      return {
        typeUrl: "/bitway.lending.MsgAddLiquidity",
        value: MsgAddLiquidity.fromPartial(value)
      };
    },
    removeLiquidity(value: MsgRemoveLiquidity) {
      return {
        typeUrl: "/bitway.lending.MsgRemoveLiquidity",
        value: MsgRemoveLiquidity.fromPartial(value)
      };
    },
    updatePoolConfig(value: MsgUpdatePoolConfig) {
      return {
        typeUrl: "/bitway.lending.MsgUpdatePoolConfig",
        value: MsgUpdatePoolConfig.fromPartial(value)
      };
    },
    apply(value: MsgApply) {
      return {
        typeUrl: "/bitway.lending.MsgApply",
        value: MsgApply.fromPartial(value)
      };
    },
    submitCets(value: MsgSubmitCets) {
      return {
        typeUrl: "/bitway.lending.MsgSubmitCets",
        value: MsgSubmitCets.fromPartial(value)
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/bitway.lending.MsgSubmitDepositTransaction",
        value: MsgSubmitDepositTransaction.fromPartial(value)
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/bitway.lending.MsgRedeem",
        value: MsgRedeem.fromPartial(value)
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/bitway.lending.MsgRepay",
        value: MsgRepay.fromPartial(value)
      };
    },
    registerReferrer(value: MsgRegisterReferrer) {
      return {
        typeUrl: "/bitway.lending.MsgRegisterReferrer",
        value: MsgRegisterReferrer.fromPartial(value)
      };
    },
    updateReferrer(value: MsgUpdateReferrer) {
      return {
        typeUrl: "/bitway.lending.MsgUpdateReferrer",
        value: MsgUpdateReferrer.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.lending.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};