import ApiClient from "../network/ApiClient";
import { AxiosRequestConfig } from "axios";

import {
  GetValidatorsResponse,
  GetValidatorsRequest,
  GetRewardsResponse,
  GetValidatorResponse,
  GetValidatorByDelegationResponse,
  GetValidatorUnDelegationResponse,
  GetValidatorReDelegationResponse,
  GetDelegationsResponse,
  GetParamsResponse,
  GetValidatorLogoDataResponse,
  GetPoolResponse,
  GetDistributionValidatorOutstandingRewardsResponse,
  GetDistributionValidatorCommissionResponse,
  GetTotalSupplysResponse,
  GetValidatorDistributionInfoResponse,
} from "./types";
import { Coin } from "cosmwasm";

export default class StakingService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getValidatorLogo(data: string): Promise<GetValidatorLogoDataResponse> {
    return await this.apiClient.get<GetValidatorLogoDataResponse>(
      `https://keybase.io/_/api/1.0/user/user_search.json?q=${data}`,
    );
  }

  async getValidators(data: GetValidatorsRequest, config: AxiosRequestConfig): Promise<GetValidatorsResponse> {
    const res = await fetch(
      `${config.baseURL}/cosmos/staking/v1beta1/validators?pagination.limit=${data["pagination.limit"]}&status=${data["status"]}`,
      {
        method: "GET",
      },
    );
    return res.json();
  }

  async getDelegations(delegatorAddress: string, config: AxiosRequestConfig): Promise<GetDelegationsResponse> {
    return await this.apiClient.get<GetDelegationsResponse>(`/cosmos/staking/v1beta1/delegations/${delegatorAddress}`, {
      ...config,
      params: {
        "pagination.limit": 500,
      },
    });
  }

  async getRewards(delegatorAddress: string, config: AxiosRequestConfig): Promise<GetRewardsResponse> {
    return await this.apiClient.get<GetRewardsResponse>(
      `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards`,
      config,
    );
  }

  async getValidatorByAddr(validatorAddress: string, config: AxiosRequestConfig): Promise<GetValidatorResponse> {
    return await this.apiClient.get<GetValidatorResponse>(
      `/cosmos/staking/v1beta1/validators/${validatorAddress}`,
      config,
    );
  }

  async getValidatorByDelegation(
    param: {
      validatorAddress: string;
      delegatorAddress: string;
    },
    config: AxiosRequestConfig,
  ): Promise<GetValidatorByDelegationResponse> {
    return await this.apiClient.get<GetValidatorByDelegationResponse>(
      `/cosmos/staking/v1beta1/validators/${param.validatorAddress}/delegations/${param.delegatorAddress}`,
      config,
    );
  }

  async getValidatorByUnDelegation(
    param: {
      validatorAddress: string;
      delegatorAddress: string;
    },
    config: AxiosRequestConfig,
  ): Promise<GetValidatorUnDelegationResponse> {
    return await this.apiClient.get<GetValidatorUnDelegationResponse>(
      `/cosmos/staking/v1beta1/delegators/${param.delegatorAddress}/unbonding_delegations`,
      config,
    );
  }

  async getValidatorRedelegation(
    delegatorAddress: string,
    config: AxiosRequestConfig,
  ): Promise<GetValidatorReDelegationResponse> {
    return await this.apiClient.get<GetValidatorReDelegationResponse>(
      `/cosmos/staking/v1beta1/delegators/${delegatorAddress}/redelegations`,
      config,
    );
  }
  async getParams(config: AxiosRequestConfig): Promise<GetParamsResponse> {
    return await this.apiClient.get<GetParamsResponse>(`/cosmos/staking/v1beta1/params`, config);
  }

  async getPool(config: AxiosRequestConfig): Promise<GetPoolResponse> {
    return await this.apiClient.get<GetPoolResponse>(`/cosmos/staking/v1beta1/pool`, config);
  }

  async getDistributionValidatorOutstandingRewards(
    delegatorAddress: string,
    config: AxiosRequestConfig,
  ): Promise<GetDistributionValidatorOutstandingRewardsResponse> {
    return await this.apiClient.get<GetDistributionValidatorOutstandingRewardsResponse>(
      `/cosmos/distribution/v1beta1/validators/${delegatorAddress}/outstanding_rewards`,
      config,
    );
  }

  async getDistributionValidatorCommission(
    delegatorAddress: string,
    config: AxiosRequestConfig,
  ): Promise<GetDistributionValidatorCommissionResponse> {
    return await this.apiClient.get<GetDistributionValidatorCommissionResponse>(
      `/cosmos/distribution/v1beta1/validators/${delegatorAddress}/commission`,
      config,
    );
  }

  async getTotalSupplys(config: AxiosRequestConfig): Promise<GetTotalSupplysResponse> {
    return await this.apiClient.get<GetTotalSupplysResponse>(`/cosmos/bank/v1beta1/supply`, config);
  }

  async getHistoricalInfoByHeight(height: string, config: AxiosRequestConfig): Promise<GetValidatorResponse> {
    return await this.apiClient.get<GetValidatorResponse>(`/cosmos/bank/v1beta1/historical_info/${height}`, config);
  }

  async getValidatorDistributionInfoByaddr(
    validator_address: string,
    config: AxiosRequestConfig,
  ): Promise<GetValidatorDistributionInfoResponse> {
    return await this.apiClient.get<GetValidatorDistributionInfoResponse>(
      `/cosmos/distribution/v1beta1/validators/${validator_address}`,
      config,
    );
  }

  async getBankSupplyByDenom(denom: string, config: AxiosRequestConfig): Promise<{ amount: Coin }> {
    return await this.apiClient.get<{ amount: Coin }>(`/cosmos/bank/v1beta1/supply/by_denom?denom=${denom}`, config);
  }
}
