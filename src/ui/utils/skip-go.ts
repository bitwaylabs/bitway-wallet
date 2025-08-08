import {
  bitwayBTCBridgeRegistry,
  bitwayBridgeAminoConverter,
  bitwayDlcAminoConverter,
  bitwayDlcRegistry,
  bitwayLendingAminoConverter,
  bitwayLendingRegistry,
  bitwayLiquidationAminoConverter,
  bitwayLiquidationRegistry
} from '@/codegen/src';
import { createWasmAminoConverters } from '@cosmjs/cosmwasm-stargate';
import { wasmTypes } from '@cosmjs/cosmwasm-stargate/build/modules';
import { GeneratedType, Registry } from '@cosmjs/proto-signing';
import {
  AminoTypes,
  createDefaultAminoConverters,
  createIbcAminoConverters,
  defaultRegistryTypes
} from '@cosmjs/stargate';
import { SkipClient } from '@skip-go/client';

const aminoTypes = new AminoTypes({
  ...createDefaultAminoConverters(),
  ...createIbcAminoConverters(),
  ...createWasmAminoConverters(),
  ...bitwayBridgeAminoConverter,
  ...bitwayLiquidationAminoConverter,
  ...bitwayDlcAminoConverter,
  ...bitwayLendingAminoConverter
});

const sideProtoRegistry: Iterable<[string, GeneratedType]> = [
  ...bitwayBTCBridgeRegistry.registry,
  ...bitwayDlcRegistry.registry,
  ...bitwayLendingRegistry.registry,
  ...bitwayLiquidationRegistry.registry
];

const registry = new Registry([...defaultRegistryTypes, ...wasmTypes, ...sideProtoRegistry]);

export const skipClient = new SkipClient({
  aminoTypes: {
    ...createDefaultAminoConverters(),
    ...createIbcAminoConverters(),
    ...createWasmAminoConverters(),
    ...bitwayBridgeAminoConverter,
    ...bitwayLiquidationAminoConverter,
    ...bitwayDlcAminoConverter,
    ...bitwayLendingAminoConverter
  },
  registryTypes: [...defaultRegistryTypes, ...wasmTypes, ...sideProtoRegistry]
});
