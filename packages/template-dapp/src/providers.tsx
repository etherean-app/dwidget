// TODO: uncomment and use own proto clients
import { ComponentChildren, FunctionComponent } from "preact";
import { IGrpcClients /* createTransport */ } from "@dwidget/shared/contexts";
import { DProviders } from "@dwidget/shared/providers";
// import { EthereanGrpcClient } from "@dwidget/shared/proto/etherean.client";

// import { API_ENDPOINT } from "@/constants";

// const GRPC_TRANSPORT = createTransport(API_ENDPOINT);

export interface IGrpcContext extends IGrpcClients {
  // ethereanClient: EthereanGrpcClient;
}

const clients: IGrpcContext = {
  // ethereanClient: new EthereanGrpcClient(GRPC_TRANSPORT),
};

interface Props {
  children: ComponentChildren;
}

export const Providers: FunctionComponent<Props> = ({ children }) => {
  return <DProviders clients={clients}>{children}</DProviders>;
};
