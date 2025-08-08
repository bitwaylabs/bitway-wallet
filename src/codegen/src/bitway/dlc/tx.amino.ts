//@ts-nocheck
import { MsgCreateDCM, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/bitway.dlc.MsgCreateDCM": {
    aminoType: "/bitway.dlc.MsgCreateDCM",
    toAmino: MsgCreateDCM.toAmino,
    fromAmino: MsgCreateDCM.fromAmino
  },
  "/bitway.dlc.MsgUpdateParams": {
    aminoType: "/bitway.dlc.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};