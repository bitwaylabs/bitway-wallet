//@ts-nocheck
import { MsgStake, MsgUnstake, MsgClaim, MsgClaimAll, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/bitway.farming.MsgStake": {
    aminoType: "/bitway.farming.MsgStake",
    toAmino: MsgStake.toAmino,
    fromAmino: MsgStake.fromAmino
  },
  "/bitway.farming.MsgUnstake": {
    aminoType: "/bitway.farming.MsgUnstake",
    toAmino: MsgUnstake.toAmino,
    fromAmino: MsgUnstake.fromAmino
  },
  "/bitway.farming.MsgClaim": {
    aminoType: "/bitway.farming.MsgClaim",
    toAmino: MsgClaim.toAmino,
    fromAmino: MsgClaim.fromAmino
  },
  "/bitway.farming.MsgClaimAll": {
    aminoType: "/bitway.farming.MsgClaimAll",
    toAmino: MsgClaimAll.toAmino,
    fromAmino: MsgClaimAll.fromAmino
  },
  "/bitway.farming.MsgUpdateParams": {
    aminoType: "/bitway.farming.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};