//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** Params defines the parameters for the module. */
export interface Params {
  /** minimum liquidation factor */
  minLiquidationFactor: string;
  /** liquidation bonus factor */
  liquidationBonusFactor: string;
  /** protocol liquidation fee factor */
  protocolLiquidationFeeFactor: string;
  /** protocol liquidation fee collector */
  protocolLiquidationFeeCollector: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/bitway.liquidation.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** minimum liquidation factor */
  min_liquidation_factor?: string;
  /** liquidation bonus factor */
  liquidation_bonus_factor?: string;
  /** protocol liquidation fee factor */
  protocol_liquidation_fee_factor?: string;
  /** protocol liquidation fee collector */
  protocol_liquidation_fee_collector?: string;
}
export interface ParamsAminoMsg {
  type: "/bitway.liquidation.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  min_liquidation_factor: string;
  liquidation_bonus_factor: string;
  protocol_liquidation_fee_factor: string;
  protocol_liquidation_fee_collector: string;
}
function createBaseParams(): Params {
  return {
    minLiquidationFactor: "",
    liquidationBonusFactor: "",
    protocolLiquidationFeeFactor: "",
    protocolLiquidationFeeCollector: ""
  };
}
export const Params = {
  typeUrl: "/bitway.liquidation.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minLiquidationFactor !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.minLiquidationFactor, 18).atomics);
    }
    if (message.liquidationBonusFactor !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.liquidationBonusFactor, 18).atomics);
    }
    if (message.protocolLiquidationFeeFactor !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.protocolLiquidationFeeFactor, 18).atomics);
    }
    if (message.protocolLiquidationFeeCollector !== "") {
      writer.uint32(34).string(message.protocolLiquidationFeeCollector);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minLiquidationFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.liquidationBonusFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.protocolLiquidationFeeFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.protocolLiquidationFeeCollector = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.minLiquidationFactor = object.minLiquidationFactor ?? "";
    message.liquidationBonusFactor = object.liquidationBonusFactor ?? "";
    message.protocolLiquidationFeeFactor = object.protocolLiquidationFeeFactor ?? "";
    message.protocolLiquidationFeeCollector = object.protocolLiquidationFeeCollector ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.min_liquidation_factor !== undefined && object.min_liquidation_factor !== null) {
      message.minLiquidationFactor = object.min_liquidation_factor;
    }
    if (object.liquidation_bonus_factor !== undefined && object.liquidation_bonus_factor !== null) {
      message.liquidationBonusFactor = object.liquidation_bonus_factor;
    }
    if (object.protocol_liquidation_fee_factor !== undefined && object.protocol_liquidation_fee_factor !== null) {
      message.protocolLiquidationFeeFactor = object.protocol_liquidation_fee_factor;
    }
    if (object.protocol_liquidation_fee_collector !== undefined && object.protocol_liquidation_fee_collector !== null) {
      message.protocolLiquidationFeeCollector = object.protocol_liquidation_fee_collector;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.min_liquidation_factor = message.minLiquidationFactor === "" ? undefined : message.minLiquidationFactor;
    obj.liquidation_bonus_factor = message.liquidationBonusFactor === "" ? undefined : message.liquidationBonusFactor;
    obj.protocol_liquidation_fee_factor = message.protocolLiquidationFeeFactor === "" ? undefined : message.protocolLiquidationFeeFactor;
    obj.protocol_liquidation_fee_collector = message.protocolLiquidationFeeCollector === "" ? undefined : message.protocolLiquidationFeeCollector;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/bitway.liquidation.Params",
      value: Params.encode(message).finish()
    };
  }
};