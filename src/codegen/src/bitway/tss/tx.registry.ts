//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCompleteDKG, MsgSubmitSignatures, MsgRefresh, MsgCompleteRefreshing, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/bitway.tss.MsgCompleteDKG", MsgCompleteDKG], ["/bitway.tss.MsgSubmitSignatures", MsgSubmitSignatures], ["/bitway.tss.MsgRefresh", MsgRefresh], ["/bitway.tss.MsgCompleteRefreshing", MsgCompleteRefreshing], ["/bitway.tss.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/bitway.tss.MsgCompleteDKG",
        value: MsgCompleteDKG.encode(value).finish()
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/bitway.tss.MsgSubmitSignatures",
        value: MsgSubmitSignatures.encode(value).finish()
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/bitway.tss.MsgRefresh",
        value: MsgRefresh.encode(value).finish()
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/bitway.tss.MsgCompleteRefreshing",
        value: MsgCompleteRefreshing.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.tss.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/bitway.tss.MsgCompleteDKG",
        value
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/bitway.tss.MsgSubmitSignatures",
        value
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/bitway.tss.MsgRefresh",
        value
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/bitway.tss.MsgCompleteRefreshing",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.tss.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/bitway.tss.MsgCompleteDKG",
        value: MsgCompleteDKG.fromPartial(value)
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/bitway.tss.MsgSubmitSignatures",
        value: MsgSubmitSignatures.fromPartial(value)
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/bitway.tss.MsgRefresh",
        value: MsgRefresh.fromPartial(value)
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/bitway.tss.MsgCompleteRefreshing",
        value: MsgCompleteRefreshing.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.tss.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};