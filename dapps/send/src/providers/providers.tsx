import { IGrpcClients, createTransport } from "@dwidget/shared/contexts";
import { DProviders } from "@dwidget/shared/providers";
import { EthereanGrpcClient } from "@dwidget/shared/proto/etherean.client";
import { AssetServiceClient } from "@dwidget/shared/proto/assets.client";
import { API_ENDPOINT } from "@/constants";
import { ComponentChildren, FunctionComponent } from "preact";
import { StateMachineProvider } from "./stateMachine";

const GRPC_TRANSPORT = createTransport(API_ENDPOINT);

export const ethereanClient = new EthereanGrpcClient(GRPC_TRANSPORT);
export const assetsClient = new AssetServiceClient(GRPC_TRANSPORT);

export interface IGrpcContext extends IGrpcClients {
  ethereanClient: EthereanGrpcClient;
  assetsClient: AssetServiceClient;
}

const clients: IGrpcContext = {
  ethereanClient: new EthereanGrpcClient(GRPC_TRANSPORT),
  assetsClient: new AssetServiceClient(GRPC_TRANSPORT),
};

interface Props {
  children: ComponentChildren;
}

export const Providers: FunctionComponent<Props> = ({ children }) => {
  return (
    <DProviders clients={clients}>
      <StateMachineProvider>{children}</StateMachineProvider>
    </DProviders>
  );
};
