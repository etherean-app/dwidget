// @generated by protobuf-ts 2.9.1 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "uniswap.proto" (package "etherean.uniswap", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
import { Amount } from "./amount";
import { Token } from "./token";
/**
 * @generated from protobuf message etherean.uniswap.TokenFilter
 */
export interface TokenFilter {
    /**
     * @generated from protobuf field: optional string address = 1;
     */
    address?: string;
    /**
     * @generated from protobuf field: optional string symbol = 2;
     */
    symbol?: string;
}
/**
 * @generated from protobuf message etherean.uniswap.Liquidity
 */
export interface Liquidity {
    /**
     * @generated from protobuf field: etherean.type.Token token = 1;
     */
    token?: Token;
    /**
     * @generated from protobuf field: etherean.type.Amount amount = 2;
     */
    amount?: Amount;
    /**
     * @generated from protobuf field: float percent = 3;
     */
    percent: number;
}
/**
 * @generated from protobuf message etherean.uniswap.Reward
 */
export interface Reward {
    /**
     * @generated from protobuf field: etherean.type.Token token = 1;
     */
    token?: Token;
    /**
     * @generated from protobuf field: etherean.type.Amount amount = 2;
     */
    amount?: Amount;
}
// @generated message type with reflection information, may provide speed optimized methods
class TokenFilter$Type extends MessageType<TokenFilter> {
    constructor() {
        super("etherean.uniswap.TokenFilter", [
            { no: 1, name: "address", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "symbol", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.uniswap.TokenFilter
 */
export const TokenFilter = new TokenFilter$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Liquidity$Type extends MessageType<Liquidity> {
    constructor() {
        super("etherean.uniswap.Liquidity", [
            { no: 1, name: "token", kind: "message", T: () => Token },
            { no: 2, name: "amount", kind: "message", T: () => Amount },
            { no: 3, name: "percent", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.uniswap.Liquidity
 */
export const Liquidity = new Liquidity$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Reward$Type extends MessageType<Reward> {
    constructor() {
        super("etherean.uniswap.Reward", [
            { no: 1, name: "token", kind: "message", T: () => Token },
            { no: 2, name: "amount", kind: "message", T: () => Amount }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.uniswap.Reward
 */
export const Reward = new Reward$Type();
