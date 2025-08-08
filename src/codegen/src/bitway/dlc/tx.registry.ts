//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateDCM, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/bitway.dlc.MsgCreateDCM", MsgCreateDCM], ["/bitway.dlc.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createDCM(value: MsgCreateDCM) {
      return {
        typeUrl: "/bitway.dlc.MsgCreateDCM",
        value: MsgCreateDCM.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.dlc.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createDCM(value: MsgCreateDCM) {
      return {
        typeUrl: "/bitway.dlc.MsgCreateDCM",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.dlc.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    createDCM(value: MsgCreateDCM) {
      return {
        typeUrl: "/bitway.dlc.MsgCreateDCM",
        value: MsgCreateDCM.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/bitway.dlc.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};