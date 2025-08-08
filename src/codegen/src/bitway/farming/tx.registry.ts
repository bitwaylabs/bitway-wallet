//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgStake, MsgUnstake, MsgClaim, MsgClaimAll, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/bitway.farming.MsgStake", MsgStake], ["/bitway.farming.MsgUnstake", MsgUnstake], ["/bitway.farming.MsgClaim", MsgClaim], ["/bitway.farming.MsgClaimAll", MsgClaimAll], ["/bitway.farming.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    stake(value: MsgStake) {
      return {
        typeUrl: "/bitway.farming.MsgStake",
        value: MsgStake.encode(value).finish()
      };
    },
    unstake(value: MsgUnstake) {
      return {
        typeUrl: "/bitway.farming.MsgUnstake",
        value: MsgUnstake.encode(value).finish()
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/bitway.farming.MsgClaim",
        value: MsgClaim.encode(value).finish()
      };
    },
    claimAll(value: MsgClaimAll) {
      return {
        typeUrl: "/bitway.farming.MsgClaimAll",
        value: MsgClaimAll.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.farming.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    stake(value: MsgStake) {
      return {
        typeUrl: "/bitway.farming.MsgStake",
        value
      };
    },
    unstake(value: MsgUnstake) {
      return {
        typeUrl: "/bitway.farming.MsgUnstake",
        value
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/bitway.farming.MsgClaim",
        value
      };
    },
    claimAll(value: MsgClaimAll) {
      return {
        typeUrl: "/bitway.farming.MsgClaimAll",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.farming.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    stake(value: MsgStake) {
      return {
        typeUrl: "/bitway.farming.MsgStake",
        value: MsgStake.fromPartial(value)
      };
    },
    unstake(value: MsgUnstake) {
      return {
        typeUrl: "/bitway.farming.MsgUnstake",
        value: MsgUnstake.fromPartial(value)
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/bitway.farming.MsgClaim",
        value: MsgClaim.fromPartial(value)
      };
    },
    claimAll(value: MsgClaimAll) {
      return {
        typeUrl: "/bitway.farming.MsgClaimAll",
        value: MsgClaimAll.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.farming.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};