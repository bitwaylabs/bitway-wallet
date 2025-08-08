//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { DCMStatus, DLCOracleStatus, DLCAttestation, DLCAttestationAmino, DLCAttestationSDKType, DCM, DCMAmino, DCMSDKType, DLCOracle, DLCOracleAmino, DLCOracleSDKType, DLCNonce, DLCNonceAmino, DLCNonceSDKType, DLCEvent, DLCEventAmino, DLCEventSDKType, OracleParticipantLiveness, OracleParticipantLivenessAmino, OracleParticipantLivenessSDKType } from "./dlc";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface QueryAttestationRequest {
  id: bigint;
}
export interface QueryAttestationRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryAttestationRequest";
  value: Uint8Array;
}
export interface QueryAttestationRequestAmino {
  id?: string;
}
export interface QueryAttestationRequestAminoMsg {
  type: "/bitway.dlc.QueryAttestationRequest";
  value: QueryAttestationRequestAmino;
}
export interface QueryAttestationRequestSDKType {
  id: bigint;
}
export interface QueryAttestationResponse {
  attestation?: DLCAttestation;
}
export interface QueryAttestationResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryAttestationResponse";
  value: Uint8Array;
}
export interface QueryAttestationResponseAmino {
  attestation?: DLCAttestationAmino;
}
export interface QueryAttestationResponseAminoMsg {
  type: "/bitway.dlc.QueryAttestationResponse";
  value: QueryAttestationResponseAmino;
}
export interface QueryAttestationResponseSDKType {
  attestation?: DLCAttestationSDKType;
}
export interface QueryAttestationByEventRequest {
  eventId: bigint;
}
export interface QueryAttestationByEventRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryAttestationByEventRequest";
  value: Uint8Array;
}
export interface QueryAttestationByEventRequestAmino {
  event_id?: string;
}
export interface QueryAttestationByEventRequestAminoMsg {
  type: "/bitway.dlc.QueryAttestationByEventRequest";
  value: QueryAttestationByEventRequestAmino;
}
export interface QueryAttestationByEventRequestSDKType {
  event_id: bigint;
}
export interface QueryAttestationByEventResponse {
  attestation?: DLCAttestation;
}
export interface QueryAttestationByEventResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryAttestationByEventResponse";
  value: Uint8Array;
}
export interface QueryAttestationByEventResponseAmino {
  attestation?: DLCAttestationAmino;
}
export interface QueryAttestationByEventResponseAminoMsg {
  type: "/bitway.dlc.QueryAttestationByEventResponse";
  value: QueryAttestationByEventResponseAmino;
}
export interface QueryAttestationByEventResponseSDKType {
  attestation?: DLCAttestationSDKType;
}
export interface QueryAttestationsRequest {
  pagination?: PageRequest;
}
export interface QueryAttestationsRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryAttestationsRequest";
  value: Uint8Array;
}
export interface QueryAttestationsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryAttestationsRequestAminoMsg {
  type: "/bitway.dlc.QueryAttestationsRequest";
  value: QueryAttestationsRequestAmino;
}
export interface QueryAttestationsRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryAttestationsResponse {
  attestations: DLCAttestation[];
  pagination?: PageResponse;
}
export interface QueryAttestationsResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryAttestationsResponse";
  value: Uint8Array;
}
export interface QueryAttestationsResponseAmino {
  attestations?: DLCAttestationAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryAttestationsResponseAminoMsg {
  type: "/bitway.dlc.QueryAttestationsResponse";
  value: QueryAttestationsResponseAmino;
}
export interface QueryAttestationsResponseSDKType {
  attestations: DLCAttestationSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryDCMRequest {
  id: bigint;
  pubKey: string;
}
export interface QueryDCMRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryDCMRequest";
  value: Uint8Array;
}
export interface QueryDCMRequestAmino {
  id?: string;
  pub_key?: string;
}
export interface QueryDCMRequestAminoMsg {
  type: "/bitway.dlc.QueryDCMRequest";
  value: QueryDCMRequestAmino;
}
export interface QueryDCMRequestSDKType {
  id: bigint;
  pub_key: string;
}
export interface QueryDCMResponse {
  dcm?: DCM;
  participants: string[];
}
export interface QueryDCMResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryDCMResponse";
  value: Uint8Array;
}
export interface QueryDCMResponseAmino {
  dcm?: DCMAmino;
  participants?: string[];
}
export interface QueryDCMResponseAminoMsg {
  type: "/bitway.dlc.QueryDCMResponse";
  value: QueryDCMResponseAmino;
}
export interface QueryDCMResponseSDKType {
  dcm?: DCMSDKType;
  participants: string[];
}
export interface QueryDCMsRequest {
  status: DCMStatus;
  pagination?: PageRequest;
}
export interface QueryDCMsRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryDCMsRequest";
  value: Uint8Array;
}
export interface QueryDCMsRequestAmino {
  status?: DCMStatus;
  pagination?: PageRequestAmino;
}
export interface QueryDCMsRequestAminoMsg {
  type: "/bitway.dlc.QueryDCMsRequest";
  value: QueryDCMsRequestAmino;
}
export interface QueryDCMsRequestSDKType {
  status: DCMStatus;
  pagination?: PageRequestSDKType;
}
export interface QueryDCMsResponse {
  dcms: DCM[];
  pagination?: PageResponse;
}
export interface QueryDCMsResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryDCMsResponse";
  value: Uint8Array;
}
export interface QueryDCMsResponseAmino {
  dcms?: DCMAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryDCMsResponseAminoMsg {
  type: "/bitway.dlc.QueryDCMsResponse";
  value: QueryDCMsResponseAmino;
}
export interface QueryDCMsResponseSDKType {
  dcms: DCMSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryOracleRequest {
  id: bigint;
  pubKey: string;
}
export interface QueryOracleRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryOracleRequest";
  value: Uint8Array;
}
export interface QueryOracleRequestAmino {
  id?: string;
  pub_key?: string;
}
export interface QueryOracleRequestAminoMsg {
  type: "/bitway.dlc.QueryOracleRequest";
  value: QueryOracleRequestAmino;
}
export interface QueryOracleRequestSDKType {
  id: bigint;
  pub_key: string;
}
export interface QueryOracleResponse {
  oracle?: DLCOracle;
  participants: string[];
}
export interface QueryOracleResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryOracleResponse";
  value: Uint8Array;
}
export interface QueryOracleResponseAmino {
  oracle?: DLCOracleAmino;
  participants?: string[];
}
export interface QueryOracleResponseAminoMsg {
  type: "/bitway.dlc.QueryOracleResponse";
  value: QueryOracleResponseAmino;
}
export interface QueryOracleResponseSDKType {
  oracle?: DLCOracleSDKType;
  participants: string[];
}
export interface QueryOraclesRequest {
  status: DLCOracleStatus;
  pagination?: PageRequest;
}
export interface QueryOraclesRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryOraclesRequest";
  value: Uint8Array;
}
export interface QueryOraclesRequestAmino {
  status?: DLCOracleStatus;
  pagination?: PageRequestAmino;
}
export interface QueryOraclesRequestAminoMsg {
  type: "/bitway.dlc.QueryOraclesRequest";
  value: QueryOraclesRequestAmino;
}
export interface QueryOraclesRequestSDKType {
  status: DLCOracleStatus;
  pagination?: PageRequestSDKType;
}
export interface QueryOraclesResponse {
  oracles: DLCOracle[];
  pagination?: PageResponse;
}
export interface QueryOraclesResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryOraclesResponse";
  value: Uint8Array;
}
export interface QueryOraclesResponseAmino {
  oracles?: DLCOracleAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryOraclesResponseAminoMsg {
  type: "/bitway.dlc.QueryOraclesResponse";
  value: QueryOraclesResponseAmino;
}
export interface QueryOraclesResponseSDKType {
  oracles: DLCOracleSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryCountNoncesRequest {}
export interface QueryCountNoncesRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryCountNoncesRequest";
  value: Uint8Array;
}
export interface QueryCountNoncesRequestAmino {}
export interface QueryCountNoncesRequestAminoMsg {
  type: "/bitway.dlc.QueryCountNoncesRequest";
  value: QueryCountNoncesRequestAmino;
}
export interface QueryCountNoncesRequestSDKType {}
/**
 * QueryCountNoncesResponse is response type for the Query/CountNonces RPC method.
 * counts should use the same order as recommended oracles in Params
 */
export interface QueryCountNoncesResponse {
  /** qty of nonce in the cache queue */
  counts: number[];
}
export interface QueryCountNoncesResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryCountNoncesResponse";
  value: Uint8Array;
}
/**
 * QueryCountNoncesResponse is response type for the Query/CountNonces RPC method.
 * counts should use the same order as recommended oracles in Params
 */
export interface QueryCountNoncesResponseAmino {
  /** qty of nonce in the cache queue */
  counts?: number[];
}
export interface QueryCountNoncesResponseAminoMsg {
  type: "/bitway.dlc.QueryCountNoncesResponse";
  value: QueryCountNoncesResponseAmino;
}
/**
 * QueryCountNoncesResponse is response type for the Query/CountNonces RPC method.
 * counts should use the same order as recommended oracles in Params
 */
export interface QueryCountNoncesResponseSDKType {
  counts: number[];
}
export interface QueryNonceRequest {
  oracleId: bigint;
  index: bigint;
}
export interface QueryNonceRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryNonceRequest";
  value: Uint8Array;
}
export interface QueryNonceRequestAmino {
  oracle_id?: string;
  index?: string;
}
export interface QueryNonceRequestAminoMsg {
  type: "/bitway.dlc.QueryNonceRequest";
  value: QueryNonceRequestAmino;
}
export interface QueryNonceRequestSDKType {
  oracle_id: bigint;
  index: bigint;
}
export interface QueryNonceResponse {
  nonce?: DLCNonce;
}
export interface QueryNonceResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryNonceResponse";
  value: Uint8Array;
}
export interface QueryNonceResponseAmino {
  nonce?: DLCNonceAmino;
}
export interface QueryNonceResponseAminoMsg {
  type: "/bitway.dlc.QueryNonceResponse";
  value: QueryNonceResponseAmino;
}
export interface QueryNonceResponseSDKType {
  nonce?: DLCNonceSDKType;
}
export interface QueryNoncesRequest {
  oracleId: bigint;
  pagination?: PageRequest;
}
export interface QueryNoncesRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryNoncesRequest";
  value: Uint8Array;
}
export interface QueryNoncesRequestAmino {
  oracle_id?: string;
  pagination?: PageRequestAmino;
}
export interface QueryNoncesRequestAminoMsg {
  type: "/bitway.dlc.QueryNoncesRequest";
  value: QueryNoncesRequestAmino;
}
export interface QueryNoncesRequestSDKType {
  oracle_id: bigint;
  pagination?: PageRequestSDKType;
}
export interface QueryNoncesResponse {
  nonces: DLCNonce[];
  pagination?: PageResponse;
}
export interface QueryNoncesResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryNoncesResponse";
  value: Uint8Array;
}
export interface QueryNoncesResponseAmino {
  nonces?: DLCNonceAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryNoncesResponseAminoMsg {
  type: "/bitway.dlc.QueryNoncesResponse";
  value: QueryNoncesResponseAmino;
}
export interface QueryNoncesResponseSDKType {
  nonces: DLCNonceSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryEventRequest is request type for the Query/Event RPC method. */
export interface QueryEventRequest {
  id: bigint;
}
export interface QueryEventRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryEventRequest";
  value: Uint8Array;
}
/** QueryEventRequest is request type for the Query/Event RPC method. */
export interface QueryEventRequestAmino {
  id?: string;
}
export interface QueryEventRequestAminoMsg {
  type: "/bitway.dlc.QueryEventRequest";
  value: QueryEventRequestAmino;
}
/** QueryEventRequest is request type for the Query/Event RPC method. */
export interface QueryEventRequestSDKType {
  id: bigint;
}
/** QueryEventResponse is response type for the Query/Event RPC method. */
export interface QueryEventResponse {
  event?: DLCEvent;
}
export interface QueryEventResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryEventResponse";
  value: Uint8Array;
}
/** QueryEventResponse is response type for the Query/Event RPC method. */
export interface QueryEventResponseAmino {
  event?: DLCEventAmino;
}
export interface QueryEventResponseAminoMsg {
  type: "/bitway.dlc.QueryEventResponse";
  value: QueryEventResponseAmino;
}
/** QueryEventResponse is response type for the Query/Event RPC method. */
export interface QueryEventResponseSDKType {
  event?: DLCEventSDKType;
}
/** QueryEventsRequest is request type for the Query/Events RPC method. */
export interface QueryEventsRequest {
  triggered: boolean;
  pagination?: PageRequest;
}
export interface QueryEventsRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryEventsRequest";
  value: Uint8Array;
}
/** QueryEventsRequest is request type for the Query/Events RPC method. */
export interface QueryEventsRequestAmino {
  triggered?: boolean;
  pagination?: PageRequestAmino;
}
export interface QueryEventsRequestAminoMsg {
  type: "/bitway.dlc.QueryEventsRequest";
  value: QueryEventsRequestAmino;
}
/** QueryEventsRequest is request type for the Query/Events RPC method. */
export interface QueryEventsRequestSDKType {
  triggered: boolean;
  pagination?: PageRequestSDKType;
}
/** QueryEventsResponse is response type for the Query/Events RPC method. */
export interface QueryEventsResponse {
  events: DLCEvent[];
  pagination?: PageResponse;
}
export interface QueryEventsResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryEventsResponse";
  value: Uint8Array;
}
/** QueryEventsResponse is response type for the Query/Events RPC method. */
export interface QueryEventsResponseAmino {
  events?: DLCEventAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryEventsResponseAminoMsg {
  type: "/bitway.dlc.QueryEventsResponse";
  value: QueryEventsResponseAmino;
}
/** QueryEventsResponse is response type for the Query/Events RPC method. */
export interface QueryEventsResponseSDKType {
  events: DLCEventSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryOracleParticipantLivenessRequest {
  consensusPubkey: string;
  alive: boolean;
}
export interface QueryOracleParticipantLivenessRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryOracleParticipantLivenessRequest";
  value: Uint8Array;
}
export interface QueryOracleParticipantLivenessRequestAmino {
  consensus_pubkey?: string;
  alive?: boolean;
}
export interface QueryOracleParticipantLivenessRequestAminoMsg {
  type: "/bitway.dlc.QueryOracleParticipantLivenessRequest";
  value: QueryOracleParticipantLivenessRequestAmino;
}
export interface QueryOracleParticipantLivenessRequestSDKType {
  consensus_pubkey: string;
  alive: boolean;
}
export interface QueryOracleParticipantLivenessResponse {
  participantLivenesses: OracleParticipantLiveness[];
}
export interface QueryOracleParticipantLivenessResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryOracleParticipantLivenessResponse";
  value: Uint8Array;
}
export interface QueryOracleParticipantLivenessResponseAmino {
  participant_livenesses?: OracleParticipantLivenessAmino[];
}
export interface QueryOracleParticipantLivenessResponseAminoMsg {
  type: "/bitway.dlc.QueryOracleParticipantLivenessResponse";
  value: QueryOracleParticipantLivenessResponseAmino;
}
export interface QueryOracleParticipantLivenessResponseSDKType {
  participant_livenesses: OracleParticipantLivenessSDKType[];
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/bitway.dlc.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/bitway.dlc.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/bitway.dlc.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/bitway.dlc.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
function createBaseQueryAttestationRequest(): QueryAttestationRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryAttestationRequest = {
  typeUrl: "/bitway.dlc.QueryAttestationRequest",
  encode(message: QueryAttestationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationRequest>): QueryAttestationRequest {
    const message = createBaseQueryAttestationRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAttestationRequestAmino): QueryAttestationRequest {
    const message = createBaseQueryAttestationRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryAttestationRequest): QueryAttestationRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationRequestAminoMsg): QueryAttestationRequest {
    return QueryAttestationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationRequestProtoMsg): QueryAttestationRequest {
    return QueryAttestationRequest.decode(message.value);
  },
  toProto(message: QueryAttestationRequest): Uint8Array {
    return QueryAttestationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationRequest): QueryAttestationRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryAttestationRequest",
      value: QueryAttestationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationResponse(): QueryAttestationResponse {
  return {
    attestation: undefined
  };
}
export const QueryAttestationResponse = {
  typeUrl: "/bitway.dlc.QueryAttestationResponse",
  encode(message: QueryAttestationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attestation !== undefined) {
      DLCAttestation.encode(message.attestation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attestation = DLCAttestation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationResponse>): QueryAttestationResponse {
    const message = createBaseQueryAttestationResponse();
    message.attestation = object.attestation !== undefined && object.attestation !== null ? DLCAttestation.fromPartial(object.attestation) : undefined;
    return message;
  },
  fromAmino(object: QueryAttestationResponseAmino): QueryAttestationResponse {
    const message = createBaseQueryAttestationResponse();
    if (object.attestation !== undefined && object.attestation !== null) {
      message.attestation = DLCAttestation.fromAmino(object.attestation);
    }
    return message;
  },
  toAmino(message: QueryAttestationResponse): QueryAttestationResponseAmino {
    const obj: any = {};
    obj.attestation = message.attestation ? DLCAttestation.toAmino(message.attestation) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationResponseAminoMsg): QueryAttestationResponse {
    return QueryAttestationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationResponseProtoMsg): QueryAttestationResponse {
    return QueryAttestationResponse.decode(message.value);
  },
  toProto(message: QueryAttestationResponse): Uint8Array {
    return QueryAttestationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationResponse): QueryAttestationResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryAttestationResponse",
      value: QueryAttestationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationByEventRequest(): QueryAttestationByEventRequest {
  return {
    eventId: BigInt(0)
  };
}
export const QueryAttestationByEventRequest = {
  typeUrl: "/bitway.dlc.QueryAttestationByEventRequest",
  encode(message: QueryAttestationByEventRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.eventId !== BigInt(0)) {
      writer.uint32(8).uint64(message.eventId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationByEventRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationByEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationByEventRequest>): QueryAttestationByEventRequest {
    const message = createBaseQueryAttestationByEventRequest();
    message.eventId = object.eventId !== undefined && object.eventId !== null ? BigInt(object.eventId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAttestationByEventRequestAmino): QueryAttestationByEventRequest {
    const message = createBaseQueryAttestationByEventRequest();
    if (object.event_id !== undefined && object.event_id !== null) {
      message.eventId = BigInt(object.event_id);
    }
    return message;
  },
  toAmino(message: QueryAttestationByEventRequest): QueryAttestationByEventRequestAmino {
    const obj: any = {};
    obj.event_id = message.eventId !== BigInt(0) ? message.eventId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationByEventRequestAminoMsg): QueryAttestationByEventRequest {
    return QueryAttestationByEventRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationByEventRequestProtoMsg): QueryAttestationByEventRequest {
    return QueryAttestationByEventRequest.decode(message.value);
  },
  toProto(message: QueryAttestationByEventRequest): Uint8Array {
    return QueryAttestationByEventRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationByEventRequest): QueryAttestationByEventRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryAttestationByEventRequest",
      value: QueryAttestationByEventRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationByEventResponse(): QueryAttestationByEventResponse {
  return {
    attestation: undefined
  };
}
export const QueryAttestationByEventResponse = {
  typeUrl: "/bitway.dlc.QueryAttestationByEventResponse",
  encode(message: QueryAttestationByEventResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attestation !== undefined) {
      DLCAttestation.encode(message.attestation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationByEventResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationByEventResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attestation = DLCAttestation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationByEventResponse>): QueryAttestationByEventResponse {
    const message = createBaseQueryAttestationByEventResponse();
    message.attestation = object.attestation !== undefined && object.attestation !== null ? DLCAttestation.fromPartial(object.attestation) : undefined;
    return message;
  },
  fromAmino(object: QueryAttestationByEventResponseAmino): QueryAttestationByEventResponse {
    const message = createBaseQueryAttestationByEventResponse();
    if (object.attestation !== undefined && object.attestation !== null) {
      message.attestation = DLCAttestation.fromAmino(object.attestation);
    }
    return message;
  },
  toAmino(message: QueryAttestationByEventResponse): QueryAttestationByEventResponseAmino {
    const obj: any = {};
    obj.attestation = message.attestation ? DLCAttestation.toAmino(message.attestation) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationByEventResponseAminoMsg): QueryAttestationByEventResponse {
    return QueryAttestationByEventResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationByEventResponseProtoMsg): QueryAttestationByEventResponse {
    return QueryAttestationByEventResponse.decode(message.value);
  },
  toProto(message: QueryAttestationByEventResponse): Uint8Array {
    return QueryAttestationByEventResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationByEventResponse): QueryAttestationByEventResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryAttestationByEventResponse",
      value: QueryAttestationByEventResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationsRequest(): QueryAttestationsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAttestationsRequest = {
  typeUrl: "/bitway.dlc.QueryAttestationsRequest",
  encode(message: QueryAttestationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationsRequest>): QueryAttestationsRequest {
    const message = createBaseQueryAttestationsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAttestationsRequestAmino): QueryAttestationsRequest {
    const message = createBaseQueryAttestationsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAttestationsRequest): QueryAttestationsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationsRequestAminoMsg): QueryAttestationsRequest {
    return QueryAttestationsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationsRequestProtoMsg): QueryAttestationsRequest {
    return QueryAttestationsRequest.decode(message.value);
  },
  toProto(message: QueryAttestationsRequest): Uint8Array {
    return QueryAttestationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationsRequest): QueryAttestationsRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryAttestationsRequest",
      value: QueryAttestationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationsResponse(): QueryAttestationsResponse {
  return {
    attestations: [],
    pagination: undefined
  };
}
export const QueryAttestationsResponse = {
  typeUrl: "/bitway.dlc.QueryAttestationsResponse",
  encode(message: QueryAttestationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.attestations) {
      DLCAttestation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attestations.push(DLCAttestation.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationsResponse>): QueryAttestationsResponse {
    const message = createBaseQueryAttestationsResponse();
    message.attestations = object.attestations?.map(e => DLCAttestation.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAttestationsResponseAmino): QueryAttestationsResponse {
    const message = createBaseQueryAttestationsResponse();
    message.attestations = object.attestations?.map(e => DLCAttestation.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAttestationsResponse): QueryAttestationsResponseAmino {
    const obj: any = {};
    if (message.attestations) {
      obj.attestations = message.attestations.map(e => e ? DLCAttestation.toAmino(e) : undefined);
    } else {
      obj.attestations = message.attestations;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationsResponseAminoMsg): QueryAttestationsResponse {
    return QueryAttestationsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationsResponseProtoMsg): QueryAttestationsResponse {
    return QueryAttestationsResponse.decode(message.value);
  },
  toProto(message: QueryAttestationsResponse): Uint8Array {
    return QueryAttestationsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationsResponse): QueryAttestationsResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryAttestationsResponse",
      value: QueryAttestationsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDCMRequest(): QueryDCMRequest {
  return {
    id: BigInt(0),
    pubKey: ""
  };
}
export const QueryDCMRequest = {
  typeUrl: "/bitway.dlc.QueryDCMRequest",
  encode(message: QueryDCMRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.pubKey !== "") {
      writer.uint32(18).string(message.pubKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDCMRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDCMRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDCMRequest>): QueryDCMRequest {
    const message = createBaseQueryDCMRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.pubKey = object.pubKey ?? "";
    return message;
  },
  fromAmino(object: QueryDCMRequestAmino): QueryDCMRequest {
    const message = createBaseQueryDCMRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = object.pub_key;
    }
    return message;
  },
  toAmino(message: QueryDCMRequest): QueryDCMRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.pub_key = message.pubKey === "" ? undefined : message.pubKey;
    return obj;
  },
  fromAminoMsg(object: QueryDCMRequestAminoMsg): QueryDCMRequest {
    return QueryDCMRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDCMRequestProtoMsg): QueryDCMRequest {
    return QueryDCMRequest.decode(message.value);
  },
  toProto(message: QueryDCMRequest): Uint8Array {
    return QueryDCMRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDCMRequest): QueryDCMRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryDCMRequest",
      value: QueryDCMRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDCMResponse(): QueryDCMResponse {
  return {
    dcm: undefined,
    participants: []
  };
}
export const QueryDCMResponse = {
  typeUrl: "/bitway.dlc.QueryDCMResponse",
  encode(message: QueryDCMResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.dcm !== undefined) {
      DCM.encode(message.dcm, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.participants) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDCMResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDCMResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dcm = DCM.decode(reader, reader.uint32());
          break;
        case 2:
          message.participants.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDCMResponse>): QueryDCMResponse {
    const message = createBaseQueryDCMResponse();
    message.dcm = object.dcm !== undefined && object.dcm !== null ? DCM.fromPartial(object.dcm) : undefined;
    message.participants = object.participants?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryDCMResponseAmino): QueryDCMResponse {
    const message = createBaseQueryDCMResponse();
    if (object.dcm !== undefined && object.dcm !== null) {
      message.dcm = DCM.fromAmino(object.dcm);
    }
    message.participants = object.participants?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryDCMResponse): QueryDCMResponseAmino {
    const obj: any = {};
    obj.dcm = message.dcm ? DCM.toAmino(message.dcm) : undefined;
    if (message.participants) {
      obj.participants = message.participants.map(e => e);
    } else {
      obj.participants = message.participants;
    }
    return obj;
  },
  fromAminoMsg(object: QueryDCMResponseAminoMsg): QueryDCMResponse {
    return QueryDCMResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDCMResponseProtoMsg): QueryDCMResponse {
    return QueryDCMResponse.decode(message.value);
  },
  toProto(message: QueryDCMResponse): Uint8Array {
    return QueryDCMResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDCMResponse): QueryDCMResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryDCMResponse",
      value: QueryDCMResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDCMsRequest(): QueryDCMsRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QueryDCMsRequest = {
  typeUrl: "/bitway.dlc.QueryDCMsRequest",
  encode(message: QueryDCMsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDCMsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDCMsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDCMsRequest>): QueryDCMsRequest {
    const message = createBaseQueryDCMsRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDCMsRequestAmino): QueryDCMsRequest {
    const message = createBaseQueryDCMsRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDCMsRequest): QueryDCMsRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDCMsRequestAminoMsg): QueryDCMsRequest {
    return QueryDCMsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDCMsRequestProtoMsg): QueryDCMsRequest {
    return QueryDCMsRequest.decode(message.value);
  },
  toProto(message: QueryDCMsRequest): Uint8Array {
    return QueryDCMsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDCMsRequest): QueryDCMsRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryDCMsRequest",
      value: QueryDCMsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDCMsResponse(): QueryDCMsResponse {
  return {
    dcms: [],
    pagination: undefined
  };
}
export const QueryDCMsResponse = {
  typeUrl: "/bitway.dlc.QueryDCMsResponse",
  encode(message: QueryDCMsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.dcms) {
      DCM.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDCMsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDCMsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dcms.push(DCM.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDCMsResponse>): QueryDCMsResponse {
    const message = createBaseQueryDCMsResponse();
    message.dcms = object.dcms?.map(e => DCM.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDCMsResponseAmino): QueryDCMsResponse {
    const message = createBaseQueryDCMsResponse();
    message.dcms = object.dcms?.map(e => DCM.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDCMsResponse): QueryDCMsResponseAmino {
    const obj: any = {};
    if (message.dcms) {
      obj.dcms = message.dcms.map(e => e ? DCM.toAmino(e) : undefined);
    } else {
      obj.dcms = message.dcms;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDCMsResponseAminoMsg): QueryDCMsResponse {
    return QueryDCMsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDCMsResponseProtoMsg): QueryDCMsResponse {
    return QueryDCMsResponse.decode(message.value);
  },
  toProto(message: QueryDCMsResponse): Uint8Array {
    return QueryDCMsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDCMsResponse): QueryDCMsResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryDCMsResponse",
      value: QueryDCMsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOracleRequest(): QueryOracleRequest {
  return {
    id: BigInt(0),
    pubKey: ""
  };
}
export const QueryOracleRequest = {
  typeUrl: "/bitway.dlc.QueryOracleRequest",
  encode(message: QueryOracleRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.pubKey !== "") {
      writer.uint32(18).string(message.pubKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOracleRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOracleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOracleRequest>): QueryOracleRequest {
    const message = createBaseQueryOracleRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.pubKey = object.pubKey ?? "";
    return message;
  },
  fromAmino(object: QueryOracleRequestAmino): QueryOracleRequest {
    const message = createBaseQueryOracleRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = object.pub_key;
    }
    return message;
  },
  toAmino(message: QueryOracleRequest): QueryOracleRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.pub_key = message.pubKey === "" ? undefined : message.pubKey;
    return obj;
  },
  fromAminoMsg(object: QueryOracleRequestAminoMsg): QueryOracleRequest {
    return QueryOracleRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOracleRequestProtoMsg): QueryOracleRequest {
    return QueryOracleRequest.decode(message.value);
  },
  toProto(message: QueryOracleRequest): Uint8Array {
    return QueryOracleRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOracleRequest): QueryOracleRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryOracleRequest",
      value: QueryOracleRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOracleResponse(): QueryOracleResponse {
  return {
    oracle: undefined,
    participants: []
  };
}
export const QueryOracleResponse = {
  typeUrl: "/bitway.dlc.QueryOracleResponse",
  encode(message: QueryOracleResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oracle !== undefined) {
      DLCOracle.encode(message.oracle, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.participants) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOracleResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOracleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracle = DLCOracle.decode(reader, reader.uint32());
          break;
        case 2:
          message.participants.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOracleResponse>): QueryOracleResponse {
    const message = createBaseQueryOracleResponse();
    message.oracle = object.oracle !== undefined && object.oracle !== null ? DLCOracle.fromPartial(object.oracle) : undefined;
    message.participants = object.participants?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryOracleResponseAmino): QueryOracleResponse {
    const message = createBaseQueryOracleResponse();
    if (object.oracle !== undefined && object.oracle !== null) {
      message.oracle = DLCOracle.fromAmino(object.oracle);
    }
    message.participants = object.participants?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryOracleResponse): QueryOracleResponseAmino {
    const obj: any = {};
    obj.oracle = message.oracle ? DLCOracle.toAmino(message.oracle) : undefined;
    if (message.participants) {
      obj.participants = message.participants.map(e => e);
    } else {
      obj.participants = message.participants;
    }
    return obj;
  },
  fromAminoMsg(object: QueryOracleResponseAminoMsg): QueryOracleResponse {
    return QueryOracleResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOracleResponseProtoMsg): QueryOracleResponse {
    return QueryOracleResponse.decode(message.value);
  },
  toProto(message: QueryOracleResponse): Uint8Array {
    return QueryOracleResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOracleResponse): QueryOracleResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryOracleResponse",
      value: QueryOracleResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOraclesRequest(): QueryOraclesRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QueryOraclesRequest = {
  typeUrl: "/bitway.dlc.QueryOraclesRequest",
  encode(message: QueryOraclesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOraclesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOraclesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOraclesRequest>): QueryOraclesRequest {
    const message = createBaseQueryOraclesRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOraclesRequestAmino): QueryOraclesRequest {
    const message = createBaseQueryOraclesRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOraclesRequest): QueryOraclesRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOraclesRequestAminoMsg): QueryOraclesRequest {
    return QueryOraclesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOraclesRequestProtoMsg): QueryOraclesRequest {
    return QueryOraclesRequest.decode(message.value);
  },
  toProto(message: QueryOraclesRequest): Uint8Array {
    return QueryOraclesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOraclesRequest): QueryOraclesRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryOraclesRequest",
      value: QueryOraclesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOraclesResponse(): QueryOraclesResponse {
  return {
    oracles: [],
    pagination: undefined
  };
}
export const QueryOraclesResponse = {
  typeUrl: "/bitway.dlc.QueryOraclesResponse",
  encode(message: QueryOraclesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.oracles) {
      DLCOracle.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOraclesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOraclesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracles.push(DLCOracle.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOraclesResponse>): QueryOraclesResponse {
    const message = createBaseQueryOraclesResponse();
    message.oracles = object.oracles?.map(e => DLCOracle.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOraclesResponseAmino): QueryOraclesResponse {
    const message = createBaseQueryOraclesResponse();
    message.oracles = object.oracles?.map(e => DLCOracle.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOraclesResponse): QueryOraclesResponseAmino {
    const obj: any = {};
    if (message.oracles) {
      obj.oracles = message.oracles.map(e => e ? DLCOracle.toAmino(e) : undefined);
    } else {
      obj.oracles = message.oracles;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOraclesResponseAminoMsg): QueryOraclesResponse {
    return QueryOraclesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOraclesResponseProtoMsg): QueryOraclesResponse {
    return QueryOraclesResponse.decode(message.value);
  },
  toProto(message: QueryOraclesResponse): Uint8Array {
    return QueryOraclesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOraclesResponse): QueryOraclesResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryOraclesResponse",
      value: QueryOraclesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCountNoncesRequest(): QueryCountNoncesRequest {
  return {};
}
export const QueryCountNoncesRequest = {
  typeUrl: "/bitway.dlc.QueryCountNoncesRequest",
  encode(_: QueryCountNoncesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCountNoncesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCountNoncesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryCountNoncesRequest>): QueryCountNoncesRequest {
    const message = createBaseQueryCountNoncesRequest();
    return message;
  },
  fromAmino(_: QueryCountNoncesRequestAmino): QueryCountNoncesRequest {
    const message = createBaseQueryCountNoncesRequest();
    return message;
  },
  toAmino(_: QueryCountNoncesRequest): QueryCountNoncesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryCountNoncesRequestAminoMsg): QueryCountNoncesRequest {
    return QueryCountNoncesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCountNoncesRequestProtoMsg): QueryCountNoncesRequest {
    return QueryCountNoncesRequest.decode(message.value);
  },
  toProto(message: QueryCountNoncesRequest): Uint8Array {
    return QueryCountNoncesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCountNoncesRequest): QueryCountNoncesRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryCountNoncesRequest",
      value: QueryCountNoncesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCountNoncesResponse(): QueryCountNoncesResponse {
  return {
    counts: []
  };
}
export const QueryCountNoncesResponse = {
  typeUrl: "/bitway.dlc.QueryCountNoncesResponse",
  encode(message: QueryCountNoncesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.counts) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCountNoncesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCountNoncesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.counts.push(reader.uint32());
            }
          } else {
            message.counts.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCountNoncesResponse>): QueryCountNoncesResponse {
    const message = createBaseQueryCountNoncesResponse();
    message.counts = object.counts?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryCountNoncesResponseAmino): QueryCountNoncesResponse {
    const message = createBaseQueryCountNoncesResponse();
    message.counts = object.counts?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryCountNoncesResponse): QueryCountNoncesResponseAmino {
    const obj: any = {};
    if (message.counts) {
      obj.counts = message.counts.map(e => e);
    } else {
      obj.counts = message.counts;
    }
    return obj;
  },
  fromAminoMsg(object: QueryCountNoncesResponseAminoMsg): QueryCountNoncesResponse {
    return QueryCountNoncesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCountNoncesResponseProtoMsg): QueryCountNoncesResponse {
    return QueryCountNoncesResponse.decode(message.value);
  },
  toProto(message: QueryCountNoncesResponse): Uint8Array {
    return QueryCountNoncesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCountNoncesResponse): QueryCountNoncesResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryCountNoncesResponse",
      value: QueryCountNoncesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryNonceRequest(): QueryNonceRequest {
  return {
    oracleId: BigInt(0),
    index: BigInt(0)
  };
}
export const QueryNonceRequest = {
  typeUrl: "/bitway.dlc.QueryNonceRequest",
  encode(message: QueryNonceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oracleId !== BigInt(0)) {
      writer.uint32(8).uint64(message.oracleId);
    }
    if (message.index !== BigInt(0)) {
      writer.uint32(16).uint64(message.index);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNonceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracleId = reader.uint64();
          break;
        case 2:
          message.index = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryNonceRequest>): QueryNonceRequest {
    const message = createBaseQueryNonceRequest();
    message.oracleId = object.oracleId !== undefined && object.oracleId !== null ? BigInt(object.oracleId.toString()) : BigInt(0);
    message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryNonceRequestAmino): QueryNonceRequest {
    const message = createBaseQueryNonceRequest();
    if (object.oracle_id !== undefined && object.oracle_id !== null) {
      message.oracleId = BigInt(object.oracle_id);
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = BigInt(object.index);
    }
    return message;
  },
  toAmino(message: QueryNonceRequest): QueryNonceRequestAmino {
    const obj: any = {};
    obj.oracle_id = message.oracleId !== BigInt(0) ? message.oracleId.toString() : undefined;
    obj.index = message.index !== BigInt(0) ? message.index.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNonceRequestAminoMsg): QueryNonceRequest {
    return QueryNonceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNonceRequestProtoMsg): QueryNonceRequest {
    return QueryNonceRequest.decode(message.value);
  },
  toProto(message: QueryNonceRequest): Uint8Array {
    return QueryNonceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryNonceRequest): QueryNonceRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryNonceRequest",
      value: QueryNonceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryNonceResponse(): QueryNonceResponse {
  return {
    nonce: undefined
  };
}
export const QueryNonceResponse = {
  typeUrl: "/bitway.dlc.QueryNonceResponse",
  encode(message: QueryNonceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== undefined) {
      DLCNonce.encode(message.nonce, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNonceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = DLCNonce.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryNonceResponse>): QueryNonceResponse {
    const message = createBaseQueryNonceResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? DLCNonce.fromPartial(object.nonce) : undefined;
    return message;
  },
  fromAmino(object: QueryNonceResponseAmino): QueryNonceResponse {
    const message = createBaseQueryNonceResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = DLCNonce.fromAmino(object.nonce);
    }
    return message;
  },
  toAmino(message: QueryNonceResponse): QueryNonceResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? DLCNonce.toAmino(message.nonce) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNonceResponseAminoMsg): QueryNonceResponse {
    return QueryNonceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNonceResponseProtoMsg): QueryNonceResponse {
    return QueryNonceResponse.decode(message.value);
  },
  toProto(message: QueryNonceResponse): Uint8Array {
    return QueryNonceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryNonceResponse): QueryNonceResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryNonceResponse",
      value: QueryNonceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryNoncesRequest(): QueryNoncesRequest {
  return {
    oracleId: BigInt(0),
    pagination: undefined
  };
}
export const QueryNoncesRequest = {
  typeUrl: "/bitway.dlc.QueryNoncesRequest",
  encode(message: QueryNoncesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oracleId !== BigInt(0)) {
      writer.uint32(8).uint64(message.oracleId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNoncesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNoncesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracleId = reader.uint64();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryNoncesRequest>): QueryNoncesRequest {
    const message = createBaseQueryNoncesRequest();
    message.oracleId = object.oracleId !== undefined && object.oracleId !== null ? BigInt(object.oracleId.toString()) : BigInt(0);
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryNoncesRequestAmino): QueryNoncesRequest {
    const message = createBaseQueryNoncesRequest();
    if (object.oracle_id !== undefined && object.oracle_id !== null) {
      message.oracleId = BigInt(object.oracle_id);
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryNoncesRequest): QueryNoncesRequestAmino {
    const obj: any = {};
    obj.oracle_id = message.oracleId !== BigInt(0) ? message.oracleId.toString() : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNoncesRequestAminoMsg): QueryNoncesRequest {
    return QueryNoncesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNoncesRequestProtoMsg): QueryNoncesRequest {
    return QueryNoncesRequest.decode(message.value);
  },
  toProto(message: QueryNoncesRequest): Uint8Array {
    return QueryNoncesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryNoncesRequest): QueryNoncesRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryNoncesRequest",
      value: QueryNoncesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryNoncesResponse(): QueryNoncesResponse {
  return {
    nonces: [],
    pagination: undefined
  };
}
export const QueryNoncesResponse = {
  typeUrl: "/bitway.dlc.QueryNoncesResponse",
  encode(message: QueryNoncesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.nonces) {
      DLCNonce.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNoncesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNoncesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonces.push(DLCNonce.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryNoncesResponse>): QueryNoncesResponse {
    const message = createBaseQueryNoncesResponse();
    message.nonces = object.nonces?.map(e => DLCNonce.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryNoncesResponseAmino): QueryNoncesResponse {
    const message = createBaseQueryNoncesResponse();
    message.nonces = object.nonces?.map(e => DLCNonce.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryNoncesResponse): QueryNoncesResponseAmino {
    const obj: any = {};
    if (message.nonces) {
      obj.nonces = message.nonces.map(e => e ? DLCNonce.toAmino(e) : undefined);
    } else {
      obj.nonces = message.nonces;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNoncesResponseAminoMsg): QueryNoncesResponse {
    return QueryNoncesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNoncesResponseProtoMsg): QueryNoncesResponse {
    return QueryNoncesResponse.decode(message.value);
  },
  toProto(message: QueryNoncesResponse): Uint8Array {
    return QueryNoncesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryNoncesResponse): QueryNoncesResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryNoncesResponse",
      value: QueryNoncesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryEventRequest(): QueryEventRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryEventRequest = {
  typeUrl: "/bitway.dlc.QueryEventRequest",
  encode(message: QueryEventRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEventRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEventRequest>): QueryEventRequest {
    const message = createBaseQueryEventRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryEventRequestAmino): QueryEventRequest {
    const message = createBaseQueryEventRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryEventRequest): QueryEventRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEventRequestAminoMsg): QueryEventRequest {
    return QueryEventRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEventRequestProtoMsg): QueryEventRequest {
    return QueryEventRequest.decode(message.value);
  },
  toProto(message: QueryEventRequest): Uint8Array {
    return QueryEventRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEventRequest): QueryEventRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryEventRequest",
      value: QueryEventRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEventResponse(): QueryEventResponse {
  return {
    event: undefined
  };
}
export const QueryEventResponse = {
  typeUrl: "/bitway.dlc.QueryEventResponse",
  encode(message: QueryEventResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.event !== undefined) {
      DLCEvent.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEventResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEventResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = DLCEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEventResponse>): QueryEventResponse {
    const message = createBaseQueryEventResponse();
    message.event = object.event !== undefined && object.event !== null ? DLCEvent.fromPartial(object.event) : undefined;
    return message;
  },
  fromAmino(object: QueryEventResponseAmino): QueryEventResponse {
    const message = createBaseQueryEventResponse();
    if (object.event !== undefined && object.event !== null) {
      message.event = DLCEvent.fromAmino(object.event);
    }
    return message;
  },
  toAmino(message: QueryEventResponse): QueryEventResponseAmino {
    const obj: any = {};
    obj.event = message.event ? DLCEvent.toAmino(message.event) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEventResponseAminoMsg): QueryEventResponse {
    return QueryEventResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEventResponseProtoMsg): QueryEventResponse {
    return QueryEventResponse.decode(message.value);
  },
  toProto(message: QueryEventResponse): Uint8Array {
    return QueryEventResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEventResponse): QueryEventResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryEventResponse",
      value: QueryEventResponse.encode(message).finish()
    };
  }
};
function createBaseQueryEventsRequest(): QueryEventsRequest {
  return {
    triggered: false,
    pagination: undefined
  };
}
export const QueryEventsRequest = {
  typeUrl: "/bitway.dlc.QueryEventsRequest",
  encode(message: QueryEventsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.triggered === true) {
      writer.uint32(8).bool(message.triggered);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEventsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.triggered = reader.bool();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEventsRequest>): QueryEventsRequest {
    const message = createBaseQueryEventsRequest();
    message.triggered = object.triggered ?? false;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryEventsRequestAmino): QueryEventsRequest {
    const message = createBaseQueryEventsRequest();
    if (object.triggered !== undefined && object.triggered !== null) {
      message.triggered = object.triggered;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryEventsRequest): QueryEventsRequestAmino {
    const obj: any = {};
    obj.triggered = message.triggered === false ? undefined : message.triggered;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEventsRequestAminoMsg): QueryEventsRequest {
    return QueryEventsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEventsRequestProtoMsg): QueryEventsRequest {
    return QueryEventsRequest.decode(message.value);
  },
  toProto(message: QueryEventsRequest): Uint8Array {
    return QueryEventsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEventsRequest): QueryEventsRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryEventsRequest",
      value: QueryEventsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEventsResponse(): QueryEventsResponse {
  return {
    events: [],
    pagination: undefined
  };
}
export const QueryEventsResponse = {
  typeUrl: "/bitway.dlc.QueryEventsResponse",
  encode(message: QueryEventsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.events) {
      DLCEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEventsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(DLCEvent.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEventsResponse>): QueryEventsResponse {
    const message = createBaseQueryEventsResponse();
    message.events = object.events?.map(e => DLCEvent.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryEventsResponseAmino): QueryEventsResponse {
    const message = createBaseQueryEventsResponse();
    message.events = object.events?.map(e => DLCEvent.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryEventsResponse): QueryEventsResponseAmino {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map(e => e ? DLCEvent.toAmino(e) : undefined);
    } else {
      obj.events = message.events;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEventsResponseAminoMsg): QueryEventsResponse {
    return QueryEventsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEventsResponseProtoMsg): QueryEventsResponse {
    return QueryEventsResponse.decode(message.value);
  },
  toProto(message: QueryEventsResponse): Uint8Array {
    return QueryEventsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEventsResponse): QueryEventsResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryEventsResponse",
      value: QueryEventsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOracleParticipantLivenessRequest(): QueryOracleParticipantLivenessRequest {
  return {
    consensusPubkey: "",
    alive: false
  };
}
export const QueryOracleParticipantLivenessRequest = {
  typeUrl: "/bitway.dlc.QueryOracleParticipantLivenessRequest",
  encode(message: QueryOracleParticipantLivenessRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consensusPubkey !== "") {
      writer.uint32(10).string(message.consensusPubkey);
    }
    if (message.alive === true) {
      writer.uint32(16).bool(message.alive);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOracleParticipantLivenessRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOracleParticipantLivenessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusPubkey = reader.string();
          break;
        case 2:
          message.alive = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOracleParticipantLivenessRequest>): QueryOracleParticipantLivenessRequest {
    const message = createBaseQueryOracleParticipantLivenessRequest();
    message.consensusPubkey = object.consensusPubkey ?? "";
    message.alive = object.alive ?? false;
    return message;
  },
  fromAmino(object: QueryOracleParticipantLivenessRequestAmino): QueryOracleParticipantLivenessRequest {
    const message = createBaseQueryOracleParticipantLivenessRequest();
    if (object.consensus_pubkey !== undefined && object.consensus_pubkey !== null) {
      message.consensusPubkey = object.consensus_pubkey;
    }
    if (object.alive !== undefined && object.alive !== null) {
      message.alive = object.alive;
    }
    return message;
  },
  toAmino(message: QueryOracleParticipantLivenessRequest): QueryOracleParticipantLivenessRequestAmino {
    const obj: any = {};
    obj.consensus_pubkey = message.consensusPubkey === "" ? undefined : message.consensusPubkey;
    obj.alive = message.alive === false ? undefined : message.alive;
    return obj;
  },
  fromAminoMsg(object: QueryOracleParticipantLivenessRequestAminoMsg): QueryOracleParticipantLivenessRequest {
    return QueryOracleParticipantLivenessRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOracleParticipantLivenessRequestProtoMsg): QueryOracleParticipantLivenessRequest {
    return QueryOracleParticipantLivenessRequest.decode(message.value);
  },
  toProto(message: QueryOracleParticipantLivenessRequest): Uint8Array {
    return QueryOracleParticipantLivenessRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOracleParticipantLivenessRequest): QueryOracleParticipantLivenessRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryOracleParticipantLivenessRequest",
      value: QueryOracleParticipantLivenessRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOracleParticipantLivenessResponse(): QueryOracleParticipantLivenessResponse {
  return {
    participantLivenesses: []
  };
}
export const QueryOracleParticipantLivenessResponse = {
  typeUrl: "/bitway.dlc.QueryOracleParticipantLivenessResponse",
  encode(message: QueryOracleParticipantLivenessResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.participantLivenesses) {
      OracleParticipantLiveness.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOracleParticipantLivenessResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOracleParticipantLivenessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participantLivenesses.push(OracleParticipantLiveness.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOracleParticipantLivenessResponse>): QueryOracleParticipantLivenessResponse {
    const message = createBaseQueryOracleParticipantLivenessResponse();
    message.participantLivenesses = object.participantLivenesses?.map(e => OracleParticipantLiveness.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryOracleParticipantLivenessResponseAmino): QueryOracleParticipantLivenessResponse {
    const message = createBaseQueryOracleParticipantLivenessResponse();
    message.participantLivenesses = object.participant_livenesses?.map(e => OracleParticipantLiveness.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryOracleParticipantLivenessResponse): QueryOracleParticipantLivenessResponseAmino {
    const obj: any = {};
    if (message.participantLivenesses) {
      obj.participant_livenesses = message.participantLivenesses.map(e => e ? OracleParticipantLiveness.toAmino(e) : undefined);
    } else {
      obj.participant_livenesses = message.participantLivenesses;
    }
    return obj;
  },
  fromAminoMsg(object: QueryOracleParticipantLivenessResponseAminoMsg): QueryOracleParticipantLivenessResponse {
    return QueryOracleParticipantLivenessResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOracleParticipantLivenessResponseProtoMsg): QueryOracleParticipantLivenessResponse {
    return QueryOracleParticipantLivenessResponse.decode(message.value);
  },
  toProto(message: QueryOracleParticipantLivenessResponse): Uint8Array {
    return QueryOracleParticipantLivenessResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOracleParticipantLivenessResponse): QueryOracleParticipantLivenessResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryOracleParticipantLivenessResponse",
      value: QueryOracleParticipantLivenessResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/bitway.dlc.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/bitway.dlc.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/bitway.dlc.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};