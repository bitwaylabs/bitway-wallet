//@ts-nocheck
import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as bitwayBtcbridgeTxRegistry from "./btcbridge/tx.registry";
import * as bitwayDlcTxRegistry from "./dlc/tx.registry";
import * as bitwayFarmingTxRegistry from "./farming/tx.registry";
import * as bitwayIncentiveTxRegistry from "./incentive/tx.registry";
import * as bitwayLendingTxRegistry from "./lending/tx.registry";
import * as bitwayLiquidationTxRegistry from "./liquidation/tx.registry";
import * as bitwayOracleTxRegistry from "./oracle/tx.registry";
import * as bitwayTssTxRegistry from "./tss/tx.registry";
import * as bitwayBtcbridgeTxAmino from "./btcbridge/tx.amino";
import * as bitwayDlcTxAmino from "./dlc/tx.amino";
import * as bitwayFarmingTxAmino from "./farming/tx.amino";
import * as bitwayIncentiveTxAmino from "./incentive/tx.amino";
import * as bitwayLendingTxAmino from "./lending/tx.amino";
import * as bitwayLiquidationTxAmino from "./liquidation/tx.amino";
import * as bitwayOracleTxAmino from "./oracle/tx.amino";
import * as bitwayTssTxAmino from "./tss/tx.amino";
export const bitwayAminoConverters = {
  ...bitwayBtcbridgeTxAmino.AminoConverter,
  ...bitwayDlcTxAmino.AminoConverter,
  ...bitwayFarmingTxAmino.AminoConverter,
  ...bitwayIncentiveTxAmino.AminoConverter,
  ...bitwayLendingTxAmino.AminoConverter,
  ...bitwayLiquidationTxAmino.AminoConverter,
  ...bitwayOracleTxAmino.AminoConverter,
  ...bitwayTssTxAmino.AminoConverter
};
export const bitwayProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...bitwayBtcbridgeTxRegistry.registry, ...bitwayDlcTxRegistry.registry, ...bitwayFarmingTxRegistry.registry, ...bitwayIncentiveTxRegistry.registry, ...bitwayLendingTxRegistry.registry, ...bitwayLiquidationTxRegistry.registry, ...bitwayOracleTxRegistry.registry, ...bitwayTssTxRegistry.registry];
export const getSigningBitwayClientOptions = ({
  defaultTypes = defaultRegistryTypes
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...bitwayProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...bitwayAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningBitwayClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningBitwayClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: registry as any,
    aminoTypes
  });
  return client;
};