//@ts-nocheck
import { MsgLiquidate, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/bitway.liquidation.MsgLiquidate": {
    aminoType: "/bitway.liquidation.MsgLiquidate",
    toAmino: MsgLiquidate.toAmino,
    fromAmino: MsgLiquidate.fromAmino
  },
  "/bitway.liquidation.MsgUpdateParams": {
    aminoType: "/bitway.liquidation.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};