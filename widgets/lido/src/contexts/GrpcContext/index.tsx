import { createContext, ComponentChildren } from "preact";
import { useContext } from "preact/hooks";

import { EthereanGrpcClient } from "@/proto/etherean.client";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { apiEndpoint } from "@/constants";

const GRPC_SERVICE_HOST = `${apiEndpoint}`;

const GRPC_TRANSPORT = new GrpcWebFetchTransport({
  baseUrl: GRPC_SERVICE_HOST,
  fetchInit: { credentials: "include" },
  format: "binary",
});

interface IGrpcContext {
  ethereanClient: EthereanGrpcClient;
}

const defaultValue: IGrpcContext = {
  ethereanClient: new EthereanGrpcClient(GRPC_TRANSPORT),
};

const GrpcContext = createContext<IGrpcContext>(defaultValue);

export const GrpcContextProvider = ({
  children,
}: {
  children: ComponentChildren;
}) => (
  <GrpcContext.Provider value={defaultValue}>{children}</GrpcContext.Provider>
);

export const useGrpcContext = () => {
  const context = useContext(GrpcContext);
  if (context === undefined) {
    throw new Error("useGrpcContext must be used within a GrpcContextProvider");
  }

  return context;
};

export default GrpcContext;
