import { ComponentChildren, FunctionComponent } from "preact";
import { IGrpcClients, createTransport } from "@dwidget/shared/contexts";
import { DProviders } from "@dwidget/shared/providers";
import { HistoryServiceClient } from "@dwidget/shared/proto/history.client";

import { API_ENDPOINT } from "@/constants";
import { StateMachineProvider } from "./stateMachine";

const GRPC_TRANSPORT = createTransport(API_ENDPOINT);

export const historyClient = new HistoryServiceClient(GRPC_TRANSPORT);

export interface IGrpcContext extends IGrpcClients {
  historyClient: HistoryServiceClient;
}

const clients: IGrpcContext = {
  historyClient,
};

interface Props {
  children: ComponentChildren;
}

export const Providers: FunctionComponent<Props> = ({ children }) => {
  return (
    <DProviders clients={clients}>
      <StateMachineProvider> {children}</StateMachineProvider>
    </DProviders>
  );
};
