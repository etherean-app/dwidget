// @generated by protobuf-ts 2.9.1 with parameter generate_dependencies,optimize_code_size
// @generated from protobuf file "assets.proto" (package "etherean.assets", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { AssetService } from "./assets";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { AssetsResponse } from "./assets";
import type { AssetsRequest } from "./assets";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service etherean.assets.AssetService
 */
export interface IAssetServiceClient {
    /**
     * @generated from protobuf rpc: GetAssets(etherean.assets.AssetsRequest) returns (etherean.assets.AssetsResponse);
     */
    getAssets(input: AssetsRequest, options?: RpcOptions): UnaryCall<AssetsRequest, AssetsResponse>;
}
/**
 * @generated from protobuf service etherean.assets.AssetService
 */
export class AssetServiceClient implements IAssetServiceClient, ServiceInfo {
    typeName = AssetService.typeName;
    methods = AssetService.methods;
    options = AssetService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: GetAssets(etherean.assets.AssetsRequest) returns (etherean.assets.AssetsResponse);
     */
    getAssets(input: AssetsRequest, options?: RpcOptions): UnaryCall<AssetsRequest, AssetsResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<AssetsRequest, AssetsResponse>("unary", this._transport, method, opt, input);
    }
}
