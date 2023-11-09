// @generated by protobuf-ts 2.9.1 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "summer_fi.proto" (package "etherean.type", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
import { Token } from "./assets";
import { Decimal } from "./decimal";
import { Money } from "./uniswap";
/**
 * @generated from protobuf message etherean.type.Liquidation
 */
export interface Liquidation {
    /**
     * @generated from protobuf field: etherean.uniswap.Money price = 1;
     */
    price?: Money;
    /**
     * @generated from protobuf field: google.type.Decimal price_bellow = 2;
     */
    priceBellow?: Decimal;
}
/**
 * @generated from protobuf message etherean.type.Collateral
 */
export interface Collateral {
    /**
     * @generated from protobuf field: google.type.Decimal locked = 1;
     */
    locked?: Decimal;
    /**
     * @generated from protobuf field: etherean.uniswap.Money locked_fiat = 2;
     */
    lockedFiat?: Money;
    /**
     * @generated from protobuf field: etherean.assets.Token token_meta = 3;
     */
    tokenMeta?: Token;
}
/**
 * @generated from protobuf message etherean.type.Collateralization
 */
export interface Collateralization {
    /**
     * @generated from protobuf field: google.type.Decimal ratio = 1;
     */
    ratio?: Decimal;
    /**
     * @generated from protobuf field: google.type.Decimal ratio_on_next_price = 2;
     */
    ratioOnNextPrice?: Decimal;
}
/**
 * @generated from protobuf message etherean.type.Vault
 */
export interface Vault {
    /**
     * @generated from protobuf field: google.type.Decimal token_amount = 1;
     */
    tokenAmount?: Decimal;
    /**
     * @generated from protobuf field: etherean.assets.Token token_meta = 2;
     */
    tokenMeta?: Token;
}
/**
 * @generated from protobuf message etherean.type.Available
 */
export interface Available {
    /**
     * @generated from protobuf field: google.type.Decimal withdraw = 1;
     */
    withdraw?: Decimal;
    /**
     * @generated from protobuf field: google.type.Decimal generate = 2;
     */
    generate?: Decimal;
}
// @generated message type with reflection information, may provide speed optimized methods
class Liquidation$Type extends MessageType<Liquidation> {
    constructor() {
        super("etherean.type.Liquidation", [
            { no: 1, name: "price", kind: "message", T: () => Money },
            { no: 2, name: "price_bellow", kind: "message", T: () => Decimal }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.type.Liquidation
 */
export const Liquidation = new Liquidation$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Collateral$Type extends MessageType<Collateral> {
    constructor() {
        super("etherean.type.Collateral", [
            { no: 1, name: "locked", kind: "message", T: () => Decimal },
            { no: 2, name: "locked_fiat", kind: "message", T: () => Money },
            { no: 3, name: "token_meta", kind: "message", T: () => Token }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.type.Collateral
 */
export const Collateral = new Collateral$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Collateralization$Type extends MessageType<Collateralization> {
    constructor() {
        super("etherean.type.Collateralization", [
            { no: 1, name: "ratio", kind: "message", T: () => Decimal },
            { no: 2, name: "ratio_on_next_price", kind: "message", T: () => Decimal }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.type.Collateralization
 */
export const Collateralization = new Collateralization$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Vault$Type extends MessageType<Vault> {
    constructor() {
        super("etherean.type.Vault", [
            { no: 1, name: "token_amount", kind: "message", T: () => Decimal },
            { no: 2, name: "token_meta", kind: "message", T: () => Token }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.type.Vault
 */
export const Vault = new Vault$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Available$Type extends MessageType<Available> {
    constructor() {
        super("etherean.type.Available", [
            { no: 1, name: "withdraw", kind: "message", T: () => Decimal },
            { no: 2, name: "generate", kind: "message", T: () => Decimal }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.type.Available
 */
export const Available = new Available$Type();