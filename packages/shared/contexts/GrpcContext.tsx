import { createContext, ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { ServiceInfo } from "@protobuf-ts/runtime-rpc";

export const createTransport = (baseUrl: string) => {
  return new GrpcWebFetchTransport({
    baseUrl,
    fetchInit: { credentials: "include" },
    format: "binary",
  });
};

export interface IGrpcClients {
  [key: string]: ServiceInfo;
}

type IGrpcContext<Clients extends IGrpcClients> = {
  clients: Clients;
};

const GrpcContext = createContext<IGrpcContext<any>>({ clients: {} });

export function GrpcContextProvider<Clients extends IGrpcClients>({
  clients,
  children,
}: {
  clients: Clients;
  children: ComponentChildren;
}) {
  return (
    <GrpcContext.Provider value={{ clients }}>{children}</GrpcContext.Provider>
  );
}

export function useGrpcContext<Clients extends IGrpcClients>() {
  const context = useContext<IGrpcContext<Clients>>(GrpcContext);
  if (context === undefined) {
    throw new Error("useGrpcContext must be used within a GrpcContextProvider");
  }

  return context.clients;
}

export default GrpcContext;
