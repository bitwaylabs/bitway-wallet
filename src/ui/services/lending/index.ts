import { AxiosRequestConfig } from 'axios';

import { getQueryParams } from '../getQueryParams';
import ApiClient from '../network/ApiClient';
import { BaseRequestOffChainApi, BaseRequestPage } from '../types';
import {
  GetCetInfoRequest,
  GetCetInfoResponse,
  GetCollateralAddressRequest,
  GetCollateralAddressResponse,
  GetDlcAttestationByIdResponse,
  GetDlcAttestationsResponse,
  GetDlcDcmsRequest,
  GetDlcDcmsResponse,
  GetDlcEventByIdResponse,
  GetDlcEventsRequest,
  GetDlcEventsResponse,
  GetDlcNoncesByOracleIdIndexRequest,
  GetDlcNoncesByOracleIdIndexResponse,
  GetDlcNoncesByOracleIdRequest,
  GetDlcNoncesByOracleIdResponse,
  GetDlcNoncesCountResponse,
  GetDlcOraclesRequest,
  GetDlcOraclesResponse,
  GetDlcParamsResponse,
  GetDlcPriceResponse,
  GetLeadingParamsResponse,
  GetLeadingPoolByIdResponse,
  GetLeadingPoolsResponse,
  GetLendingLiquidityProvidersRequest,
  GetLendingLiquidityProvidersResponse,
  GetLendingPoolsResponse,
  GetLendingUserActivityRequest,
  GetLendingUserActivityResponse,
  GetLiquidationByIdResponse,
  GetLiquidationCetRequest,
  GetLiquidationCetResponse,
  GetLiquidationDlcMetaResponse,
  GetLiquidationEventRequest,
  GetLiquidationParamsResponse,
  GetLiquidationPriceRequest,
  GetLiquidationRecordsRequest,
  GetLiquidationRecordsResponse,
  GetLiquidationsRequest,
  GetLiquidationsResponse,
  GetLoanAuthorizationResponse,
  GetLoanBaseDataRequest,
  GetLoanBaseDataResponse,
  GetLoanByIdCexResponse,
  GetLoanByIdResponse,
  GetLoanDepositsResponse,
  GetLoanInterestResponse,
  GetLoanRepaymentResponse,
  GetLoansRequest,
  GetLoansResponse,
  GetOverviewDataResponse,
  LiquidationEvent,
  PostLoanExpectedCollateralAmountData
} from './types';

export default class LendingService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getDlcDcms(data: GetDlcDcmsRequest, config: AxiosRequestConfig): Promise<GetDlcDcmsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcDcmsResponse>(`/bitway/dlc/dcms?${queryParams}`, config);
  }

  async getDlcAttestations(data: BaseRequestPage, config: AxiosRequestConfig): Promise<GetDlcAttestationsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcAttestationsResponse>(`/bitway/dlc/attestations?${queryParams}`, config);
  }

  async getDlcAttestationById(id: string, config: AxiosRequestConfig): Promise<GetDlcAttestationByIdResponse> {
    return this.apiClient.get<GetDlcAttestationByIdResponse>(`/bitway/dlc/attestations/${id}`, config);
  }

  async getDlcEvents(data: GetDlcEventsRequest, config: AxiosRequestConfig): Promise<GetDlcEventsResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcEventsResponse>(`/bitway/dlc/events?${queryParams}`, config);
  }

  async getDlcNoncesCount(config: AxiosRequestConfig): Promise<GetDlcNoncesCountResponse> {
    return this.apiClient.get<GetDlcNoncesCountResponse>('/bitway/dlc/nonces/count', config);
  }

  async getDlcNoncesByOracleId(
    oracle_id: string,
    data: GetDlcNoncesByOracleIdRequest,
    config: AxiosRequestConfig
  ): Promise<GetDlcNoncesByOracleIdResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcNoncesByOracleIdResponse>(`/bitway/dlc/nonces/${oracle_id}?${queryParams}`, config);
  }

  async getDlcNoncesByOracleIdIndex(
    oracle_id: string,
    index: string,
    data: GetDlcNoncesByOracleIdIndexRequest,
    config: AxiosRequestConfig
  ): Promise<GetDlcNoncesByOracleIdIndexResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcNoncesByOracleIdIndexResponse>(
      `/bitway/dlc/nonces/${oracle_id}/${index}?${queryParams}`,
      config
    );
  }

  async getDlcOracles(data: GetDlcOraclesRequest, config: AxiosRequestConfig): Promise<GetDlcOraclesResponse> {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetDlcOraclesResponse>(`/bitway/dlc/oracles?${queryParams}`, config);
  }

  async getDlcEventById(id: string, config: AxiosRequestConfig): Promise<GetDlcEventByIdResponse> {
    return this.apiClient.get<GetDlcEventByIdResponse>(`/bitway/dlc/events/${id}`, config);
  }

  async getDlcParams(config: AxiosRequestConfig): Promise<GetDlcParamsResponse> {
    return this.apiClient.get<GetDlcParamsResponse>('/bitway/dlc/params', config);
  }

  async getDlcPrice(symbol: string, config: AxiosRequestConfig): Promise<GetDlcPriceResponse> {
    return this.apiClient.get<GetDlcPriceResponse>(`/bitway/oracle/prices/${symbol}`, config);
  }

  async getCollateralAddress(data: GetCollateralAddressRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetCollateralAddressResponse>(
      `/bitway/lending/collateral/address?${queryParams}`,
      config
    );
  }

  async getLiquidationCet(data: GetLiquidationCetRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLiquidationCetResponse>(`/bitway/lending/liquidation/cet?${queryParams}`, config);
  }

  async getLiquidationEvent(data: GetLiquidationEventRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<LiquidationEvent>(`/bitway/lending/liquidation/event?${queryParams}`, config);
  }

  async getLiquidationPrice(data: GetLiquidationPriceRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<{ price: string; pair: string }>(
      `/bitway/lending/liquidation/price?${queryParams}`,
      config
    );
  }

  async getDlcEventCount(config: AxiosRequestConfig) {
    return this.apiClient.get<{ count: string }>('/bitway/lending/dlc/event/count', config);
  }

  async getCetInfo(data: GetCetInfoRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetCetInfoResponse>(`/bitway/lending/loan/cet/infos?${queryParams}`, config);
  }

  async getLiquidationDlcMeta(data: { loan_id: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLiquidationDlcMetaResponse>(`/bitway/lending/loan/dlc/meta?${queryParams}`, config);
  }

  async getLoanRepayment(data: { loan_id: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoanRepaymentResponse>(`/bitway/lending/loan/repayment?${queryParams}`, config);
  }

  async getLoans(data: GetLoansRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoansResponse>(`/bitway/lending/loans?${queryParams}`, config);
  }

  async getLoansByAddress(address: string, data: GetLoansRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoansResponse>(`/bitway/lending/loans/address/${address}?${queryParams}`, config);
  }

  async getLoanById(id: string, config: AxiosRequestConfig) {
    return this.apiClient.get<GetLoanByIdResponse>(`/bitway/lending/loans/${id}`, config);
  }

  async getLoanByIdCex(data: { vaultAddress: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoanByIdCexResponse>(`/lending/loan/detail?${queryParams}`, config);
  }

  async getLoanBaseData(data: GetLoanBaseDataRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoanBaseDataResponse>(`/lending/loans?${queryParams}`, config);
  }

  async getLoanCurrentInterest(id: string, config: AxiosRequestConfig) {
    const queryParams = getQueryParams({
      loan_id: id
    });
    return this.apiClient.get<GetLoanInterestResponse>(`/bitway/lending/loan/current_interest?${queryParams}`, config);
  }

  async saveLoanExpectedCollateralAmount(data: PostLoanExpectedCollateralAmountData, config: AxiosRequestConfig) {
    return this.apiClient.post('/lending/loan/save', data, config);
  }

  async getLeadingParams(config: AxiosRequestConfig) {
    return this.apiClient.get<GetLeadingParamsResponse>('/bitway/lending/params', config);
  }

  async getLeadingPoolById(id: string, config: AxiosRequestConfig) {
    return this.apiClient.get<GetLeadingPoolByIdResponse>(`/bitway/lending/pools/${id}`, config);
  }

  async getLendingPools(data: BaseRequestPage, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLeadingPoolsResponse>(`/bitway/lending/pools?${queryParams}`, config);
  }

  async getLendingPoolsBase(data: BaseRequestOffChainApi, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLendingPoolsResponse>(`/lending/pools?${queryParams}`, config);
  }

  async getLendingPoolsExchangeRate(data: { pool_id: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<{
      exchange_rate: string;
    }>(`/bitway/lending/pool/exchange_rate?${queryParams}`, config);
  }

  async getOverviewData(config: AxiosRequestConfig) {
    return this.apiClient.get<GetOverviewDataResponse>('/lending/overall-statistic', config);
  }

  async getLendingLiquidityProviders(data: GetLendingLiquidityProvidersRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLendingLiquidityProvidersResponse>(`lending/pool/providers?${queryParams}`, config);
  }

  async getLendingUserActivity(data: GetLendingUserActivityRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLendingUserActivityResponse>(`lending/pool/activities?${queryParams}`, config);
  }

  async getLiquidations(data: GetLiquidationsRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLiquidationsResponse>(`/bitway/liquidation/liquidations?${queryParams}`, config);
  }

  async getLiquidationById(id: string, config: AxiosRequestConfig) {
    return this.apiClient.get<GetLiquidationByIdResponse>(`/bitway/liquidation/liquidations/${id}`, config);
  }

  async getLiquidationParams(config: AxiosRequestConfig) {
    return this.apiClient.get<GetLiquidationParamsResponse>('/bitway/liquidation/params', config);
  }

  async getLiquidationRecords(data: GetLiquidationRecordsRequest, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLiquidationRecordsResponse>(`/lending/liquidation/records?${queryParams}`, config);
  }

  async getLoanAuthorization(data: { loan_id: string; id: string }, config: AxiosRequestConfig) {
    const queryParams = getQueryParams(data as any);
    return this.apiClient.get<GetLoanAuthorizationResponse>(
      `/bitway/lending/loan/authorization?${queryParams}`,
      config
    );
  }

  async getLoanDeposits(loandId: string, config: AxiosRequestConfig) {
    return this.apiClient.get<GetLoanDepositsResponse>(`/bitway/lending/loan/deposits?loan_id=${loandId}`, config);
  }
}
