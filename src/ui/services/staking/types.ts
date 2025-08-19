import { Coin } from "@cosmjs/stargate";
import { BaseRequestPage, PaginationResponse } from "../types";

export type GetValidatorsRequest = {
  status: string;
} & BaseRequestPage;

export interface GetValidatorsData {
  validators: Validator[];
  pagination: Pagination;
}

export interface Pagination {
  next_key: null;
  total: string;
}

export interface Validator {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: Description;
  unbonding_height: string;
  unbonding_time: string;
  commission: Commission;
  min_self_delegation: string;
  unbonding_on_hold_ref_count: string;
  unbonding_ids: any[];
}

export interface Commission {
  commission_rates: CommissionRates;
  update_time: string;
}

export interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

export interface ConsensusPubkey {
  "@type": string;
  key: string;
}

export interface Description {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

export type GetValidatorsResponse = Awaited<Readonly<GetValidatorsData>>;

interface IRewardsItem {
  validator_address: "string";
  reward: Coin[];
}

export interface IGetRewardsData {
  rewards: IRewardsItem[];
  total: Coin[];
}

export interface IGetValidatorByDelegationData {
  delegation_response: {
    delegation: {
      delegator_address: string;
      validator_address: string;
      shares: string;
    };
    balance: {
      denom: string;
      amount: string;
    };
  };
}

export interface IGetValidatorUnDelegation {
  unbonding_responses: UnbondingResponse[];
  pagination: PaginationResponse;
}

export interface UnbondingResponse {
  delegator_address: string;
  validator_address: string;
  entries: Entry[];
}

export interface IGetValidatorReDelegation {
  redelegation_responses: ReDelegationResponse[];
  pagination: PaginationResponse;
}
export interface ReDelegationResponse {
  redelegation: {
    delegator_address: string;
    validator_src_address: string;
    validator_dst_address: string;
    entries: {
      creation_height: string;
      completion_time: string;
      initial_balance: string;
      shares_dst: string;
    }[];
  };
  entries: {
    redelegation_entry: {
      creation_height: string;
      completion_time: string;
      initial_balance: string;
      shares_dst: string;
    };
    balance: string;
  }[];
}
export interface Entry {
  creation_height: string;
  completion_time: string;
  initial_balance: string;
  balance: string;
  unbonding_id: string;
  unbonding_on_hold_ref_count: string;
}

export interface DelegationsData {
  delegation_responses: IGetValidatorByDelegationData["delegation_response"][];
  pagination: Pagination;
}

export interface ParamsData {
  unbonding_time: string;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
  min_commission_rate: string;
}

export interface ValidatorLogoData {
  status: {
    code: number;
    name: string;
  };
  list: [
    {
      score: number;
      keybase: {
        username: string;
        uid: string;
        picture_url: string;
        full_name: string;
        raw_score: number;
        stellar: null | any;
        is_followee: boolean;
      };
      services_summary: {
        twitter: {
          username: string;
          service_name: string;
        };
      };
    },
  ];
}

export interface StakingPoolData {
  bonded_tokens: string;
  not_bonded_tokens: string;
}
export type GetRewardsResponse = Awaited<Readonly<IGetRewardsData>>;
export type GetValidatorResponse = Awaited<Readonly<{ validator: Validator }>>;
export type GetValidatorByDelegationResponse = Awaited<Readonly<IGetValidatorByDelegationData>>;

export type GetValidatorUnDelegationResponse = Awaited<Readonly<IGetValidatorUnDelegation>>;
export type GetValidatorReDelegationResponse = Awaited<Readonly<IGetValidatorReDelegation>>;

export type GetDelegationsResponse = Awaited<Readonly<DelegationsData>>;
export type GetParamsResponse = Awaited<Readonly<{ params: ParamsData }>>;
export type GetPoolResponse = Awaited<Readonly<{ pool: StakingPoolData }>>;
export type GetValidatorLogoDataResponse = Awaited<ValidatorLogoData>;

export type GetDistributionValidatorOutstandingRewardsResponse = Awaited<
  Readonly<{
    rewards?: { rewards?: Coin[] };
  }>
>;
export type GetDistributionValidatorCommissionResponse = Awaited<
  Readonly<{
    commission?: { commission?: Coin[] };
  }>
>;

export type GetTotalSupplysResponse = Awaited<
  Readonly<{
    pagination: {};
    supply: { amount: string; denom: string }[];
  }>
>;

export type GetValidatorDistributionInfoResponse = Awaited<
  Readonly<{
    operator_address: string;
    self_bond_rewards: Array<{
      denom: string;
      amount: string;
    }>;
    commission: Array<{
      denom: string;
      amount: string;
    }>;
  }>
>;
