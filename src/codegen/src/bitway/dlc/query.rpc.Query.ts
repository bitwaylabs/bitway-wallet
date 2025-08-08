//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryEventRequest, QueryEventResponse, QueryEventsRequest, QueryEventsResponse, QueryAttestationRequest, QueryAttestationResponse, QueryAttestationByEventRequest, QueryAttestationByEventResponse, QueryAttestationsRequest, QueryAttestationsResponse, QueryNonceRequest, QueryNonceResponse, QueryNoncesRequest, QueryNoncesResponse, QueryCountNoncesRequest, QueryCountNoncesResponse, QueryDCMRequest, QueryDCMResponse, QueryDCMsRequest, QueryDCMsResponse, QueryOracleRequest, QueryOracleResponse, QueryOraclesRequest, QueryOraclesResponse, QueryOracleParticipantLivenessRequest, QueryOracleParticipantLivenessResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Event queries the event by the given id. */
  event(request: QueryEventRequest): Promise<QueryEventResponse>;
  /** Events queries events by the given status. */
  events(request: QueryEventsRequest): Promise<QueryEventsResponse>;
  /** Attestation queries the attestation by the given id. */
  attestation(request: QueryAttestationRequest): Promise<QueryAttestationResponse>;
  /** AttestationByEvent queries the attestation by the given event id. */
  attestationByEvent(request: QueryAttestationByEventRequest): Promise<QueryAttestationByEventResponse>;
  /** Attestations queries all attestations. */
  attestations(request?: QueryAttestationsRequest): Promise<QueryAttestationsResponse>;
  /** Nonce queries the nonce by the given oracle id and index */
  nonce(request: QueryNonceRequest): Promise<QueryNonceResponse>;
  /** Nonces queries all nonces of the given oracle */
  nonces(request: QueryNoncesRequest): Promise<QueryNoncesResponse>;
  /** CountNonces queries the total count of nonces. */
  countNonces(request?: QueryCountNoncesRequest): Promise<QueryCountNoncesResponse>;
  /** DCM queries the DCM by the given id or public key. */
  dCM(request: QueryDCMRequest): Promise<QueryDCMResponse>;
  /** DCMs queries DCMs by the given status. */
  dCMs(request: QueryDCMsRequest): Promise<QueryDCMsResponse>;
  /** Oracle queries the oracle by the given id or public key. */
  oracle(request: QueryOracleRequest): Promise<QueryOracleResponse>;
  /** Oracles queries oracles by the given status. */
  oracles(request: QueryOraclesRequest): Promise<QueryOraclesResponse>;
  /** OracleParticipantLiveness queries the oracle participant liveness */
  oracleParticipantLiveness(request: QueryOracleParticipantLivenessRequest): Promise<QueryOracleParticipantLivenessResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.event = this.event.bind(this);
    this.events = this.events.bind(this);
    this.attestation = this.attestation.bind(this);
    this.attestationByEvent = this.attestationByEvent.bind(this);
    this.attestations = this.attestations.bind(this);
    this.nonce = this.nonce.bind(this);
    this.nonces = this.nonces.bind(this);
    this.countNonces = this.countNonces.bind(this);
    this.dCM = this.dCM.bind(this);
    this.dCMs = this.dCMs.bind(this);
    this.oracle = this.oracle.bind(this);
    this.oracles = this.oracles.bind(this);
    this.oracleParticipantLiveness = this.oracleParticipantLiveness.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  event(request: QueryEventRequest): Promise<QueryEventResponse> {
    const data = QueryEventRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Event", data);
    return promise.then(data => QueryEventResponse.decode(new BinaryReader(data)));
  }
  events(request: QueryEventsRequest): Promise<QueryEventsResponse> {
    const data = QueryEventsRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Events", data);
    return promise.then(data => QueryEventsResponse.decode(new BinaryReader(data)));
  }
  attestation(request: QueryAttestationRequest): Promise<QueryAttestationResponse> {
    const data = QueryAttestationRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Attestation", data);
    return promise.then(data => QueryAttestationResponse.decode(new BinaryReader(data)));
  }
  attestationByEvent(request: QueryAttestationByEventRequest): Promise<QueryAttestationByEventResponse> {
    const data = QueryAttestationByEventRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "AttestationByEvent", data);
    return promise.then(data => QueryAttestationByEventResponse.decode(new BinaryReader(data)));
  }
  attestations(request: QueryAttestationsRequest = {
    pagination: undefined
  }): Promise<QueryAttestationsResponse> {
    const data = QueryAttestationsRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Attestations", data);
    return promise.then(data => QueryAttestationsResponse.decode(new BinaryReader(data)));
  }
  nonce(request: QueryNonceRequest): Promise<QueryNonceResponse> {
    const data = QueryNonceRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Nonce", data);
    return promise.then(data => QueryNonceResponse.decode(new BinaryReader(data)));
  }
  nonces(request: QueryNoncesRequest): Promise<QueryNoncesResponse> {
    const data = QueryNoncesRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Nonces", data);
    return promise.then(data => QueryNoncesResponse.decode(new BinaryReader(data)));
  }
  countNonces(request: QueryCountNoncesRequest = {}): Promise<QueryCountNoncesResponse> {
    const data = QueryCountNoncesRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "CountNonces", data);
    return promise.then(data => QueryCountNoncesResponse.decode(new BinaryReader(data)));
  }
  dCM(request: QueryDCMRequest): Promise<QueryDCMResponse> {
    const data = QueryDCMRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "DCM", data);
    return promise.then(data => QueryDCMResponse.decode(new BinaryReader(data)));
  }
  dCMs(request: QueryDCMsRequest): Promise<QueryDCMsResponse> {
    const data = QueryDCMsRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "DCMs", data);
    return promise.then(data => QueryDCMsResponse.decode(new BinaryReader(data)));
  }
  oracle(request: QueryOracleRequest): Promise<QueryOracleResponse> {
    const data = QueryOracleRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Oracle", data);
    return promise.then(data => QueryOracleResponse.decode(new BinaryReader(data)));
  }
  oracles(request: QueryOraclesRequest): Promise<QueryOraclesResponse> {
    const data = QueryOraclesRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "Oracles", data);
    return promise.then(data => QueryOraclesResponse.decode(new BinaryReader(data)));
  }
  oracleParticipantLiveness(request: QueryOracleParticipantLivenessRequest): Promise<QueryOracleParticipantLivenessResponse> {
    const data = QueryOracleParticipantLivenessRequest.encode(request).finish();
    const promise = this.rpc.request("bitway.dlc.Query", "OracleParticipantLiveness", data);
    return promise.then(data => QueryOracleParticipantLivenessResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    event(request: QueryEventRequest): Promise<QueryEventResponse> {
      return queryService.event(request);
    },
    events(request: QueryEventsRequest): Promise<QueryEventsResponse> {
      return queryService.events(request);
    },
    attestation(request: QueryAttestationRequest): Promise<QueryAttestationResponse> {
      return queryService.attestation(request);
    },
    attestationByEvent(request: QueryAttestationByEventRequest): Promise<QueryAttestationByEventResponse> {
      return queryService.attestationByEvent(request);
    },
    attestations(request?: QueryAttestationsRequest): Promise<QueryAttestationsResponse> {
      return queryService.attestations(request);
    },
    nonce(request: QueryNonceRequest): Promise<QueryNonceResponse> {
      return queryService.nonce(request);
    },
    nonces(request: QueryNoncesRequest): Promise<QueryNoncesResponse> {
      return queryService.nonces(request);
    },
    countNonces(request?: QueryCountNoncesRequest): Promise<QueryCountNoncesResponse> {
      return queryService.countNonces(request);
    },
    dCM(request: QueryDCMRequest): Promise<QueryDCMResponse> {
      return queryService.dCM(request);
    },
    dCMs(request: QueryDCMsRequest): Promise<QueryDCMsResponse> {
      return queryService.dCMs(request);
    },
    oracle(request: QueryOracleRequest): Promise<QueryOracleResponse> {
      return queryService.oracle(request);
    },
    oracles(request: QueryOraclesRequest): Promise<QueryOraclesResponse> {
      return queryService.oracles(request);
    },
    oracleParticipantLiveness(request: QueryOracleParticipantLivenessRequest): Promise<QueryOracleParticipantLivenessResponse> {
      return queryService.oracleParticipantLiveness(request);
    }
  };
};