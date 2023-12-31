// @generated by protobuf-ts 2.9.1 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "user_wallet.proto" (package "etherean.type", syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message etherean.type.UserWallet
 */
export interface UserWallet {
    /**
     * @generated from protobuf field: string wallet_address = 1;
     */
    walletAddress: string; // ethereum wallet address
}
// @generated message type with reflection information, may provide speed optimized methods
class UserWallet$Type extends MessageType<UserWallet> {
    constructor() {
        super("etherean.type.UserWallet", [
            { no: 1, name: "wallet_address", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message etherean.type.UserWallet
 */
export const UserWallet = new UserWallet$Type();
