// @generated by protobuf-ts 2.9.1 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "transaction.proto" (package "etherean.type", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message etherean.type.TransactionId
 */
export interface TransactionId {
    /**
     * @generated from protobuf field: string value = 1;
     */
    value: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class TransactionId$Type extends MessageType<TransactionId> {
    constructor() {
        super("etherean.type.TransactionId", [
            { no: 1, name: "value", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.type.TransactionId
 */
export const TransactionId = new TransactionId$Type();
