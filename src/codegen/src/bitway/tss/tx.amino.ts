//@ts-nocheck
import { MsgCompleteDKG, MsgSubmitSignatures, MsgRefresh, MsgCompleteRefreshing, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/bitway.tss.MsgCompleteDKG": {
    aminoType: "/bitway.tss.MsgCompleteDKG",
    toAmino: MsgCompleteDKG.toAmino,
    fromAmino: MsgCompleteDKG.fromAmino
  },
  "/bitway.tss.MsgSubmitSignatures": {
    aminoType: "/bitway.tss.MsgSubmitSignatures",
    toAmino: MsgSubmitSignatures.toAmino,
    fromAmino: MsgSubmitSignatures.fromAmino
  },
  "/bitway.tss.MsgRefresh": {
    aminoType: "/bitway.tss.MsgRefresh",
    toAmino: MsgRefresh.toAmino,
    fromAmino: MsgRefresh.fromAmino
  },
  "/bitway.tss.MsgCompleteRefreshing": {
    aminoType: "/bitway.tss.MsgCompleteRefreshing",
    toAmino: MsgCompleteRefreshing.toAmino,
    fromAmino: MsgCompleteRefreshing.fromAmino
  },
  "/bitway.tss.MsgUpdateParams": {
    aminoType: "/bitway.tss.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};