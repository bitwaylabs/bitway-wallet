//@ts-nocheck
import * as _0 from "./btcbridge/btcbridge";
import * as _1 from "./btcbridge/genesis";
import * as _2 from "./btcbridge/params";
import * as _3 from "./btcbridge/query";
import * as _4 from "./btcbridge/tx";
import * as _5 from "./dlc/dlc";
import * as _6 from "./dlc/genesis";
import * as _7 from "./dlc/params";
import * as _8 from "./dlc/query";
import * as _9 from "./dlc/tx";
import * as _10 from "./farming/farming";
import * as _11 from "./farming/genesis";
import * as _12 from "./farming/params";
import * as _13 from "./farming/query";
import * as _14 from "./farming/tx";
import * as _15 from "./incentive/genesis";
import * as _16 from "./incentive/incentive";
import * as _17 from "./incentive/params";
import * as _18 from "./incentive/query";
import * as _19 from "./incentive/tx";
import * as _20 from "./lending/genesis";
import * as _21 from "./lending/lending";
import * as _22 from "./lending/params";
import * as _23 from "./lending/query";
import * as _24 from "./lending/tx";
import * as _25 from "./liquidation/genesis";
import * as _26 from "./liquidation/liquidation";
import * as _27 from "./liquidation/params";
import * as _28 from "./liquidation/query";
import * as _29 from "./liquidation/tx";
import * as _30 from "./oracle/genesis";
import * as _31 from "./oracle/oracle";
import * as _32 from "./oracle/params";
import * as _33 from "./oracle/query";
import * as _34 from "./oracle/tx";
import * as _35 from "./tss/genesis";
import * as _36 from "./tss/params";
import * as _37 from "./tss/query";
import * as _38 from "./tss/tss";
import * as _39 from "./tss/tx";
import * as _48 from "./btcbridge/tx.amino";
import * as _49 from "./dlc/tx.amino";
import * as _50 from "./farming/tx.amino";
import * as _51 from "./incentive/tx.amino";
import * as _52 from "./lending/tx.amino";
import * as _53 from "./liquidation/tx.amino";
import * as _54 from "./oracle/tx.amino";
import * as _55 from "./tss/tx.amino";
import * as _56 from "./btcbridge/tx.registry";
import * as _57 from "./dlc/tx.registry";
import * as _58 from "./farming/tx.registry";
import * as _59 from "./incentive/tx.registry";
import * as _60 from "./lending/tx.registry";
import * as _61 from "./liquidation/tx.registry";
import * as _62 from "./oracle/tx.registry";
import * as _63 from "./tss/tx.registry";
import * as _64 from "./btcbridge/query.rpc.Query";
import * as _65 from "./dlc/query.rpc.Query";
import * as _66 from "./farming/query.rpc.Query";
import * as _67 from "./incentive/query.rpc.Query";
import * as _68 from "./lending/query.rpc.Query";
import * as _69 from "./liquidation/query.rpc.Query";
import * as _70 from "./oracle/query.rpc.Query";
import * as _71 from "./tss/query.rpc.Query";
import * as _72 from "./btcbridge/tx.rpc.msg";
import * as _73 from "./dlc/tx.rpc.msg";
import * as _74 from "./farming/tx.rpc.msg";
import * as _75 from "./incentive/tx.rpc.msg";
import * as _76 from "./lending/tx.rpc.msg";
import * as _77 from "./liquidation/tx.rpc.msg";
import * as _78 from "./oracle/tx.rpc.msg";
import * as _79 from "./tss/tx.rpc.msg";
import * as _80 from "./rpc.query";
import * as _81 from "./rpc.tx";
export namespace bitway {
  export const btcbridge = {
    ..._0,
    ..._1,
    ..._2,
    ..._3,
    ..._4,
    ..._48,
    ..._56,
    ..._64,
    ..._72
  };
  export const dlc = {
    ..._5,
    ..._6,
    ..._7,
    ..._8,
    ..._9,
    ..._49,
    ..._57,
    ..._65,
    ..._73
  };
  export const farming = {
    ..._10,
    ..._11,
    ..._12,
    ..._13,
    ..._14,
    ..._50,
    ..._58,
    ..._66,
    ..._74
  };
  export const incentive = {
    ..._15,
    ..._16,
    ..._17,
    ..._18,
    ..._19,
    ..._51,
    ..._59,
    ..._67,
    ..._75
  };
  export const lending = {
    ..._20,
    ..._21,
    ..._22,
    ..._23,
    ..._24,
    ..._52,
    ..._60,
    ..._68,
    ..._76
  };
  export const liquidation = {
    ..._25,
    ..._26,
    ..._27,
    ..._28,
    ..._29,
    ..._53,
    ..._61,
    ..._69,
    ..._77
  };
  export const oracle = {
    ..._30,
    ..._31,
    ..._32,
    ..._33,
    ..._34,
    ..._54,
    ..._62,
    ..._70,
    ..._78
  };
  export const tss = {
    ..._35,
    ..._36,
    ..._37,
    ..._38,
    ..._39,
    ..._55,
    ..._63,
    ..._71,
    ..._79
  };
  export const ClientFactory = {
    ..._80,
    ..._81
  };
}