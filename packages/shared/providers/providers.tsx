import { ComponentChildren } from "preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GrpcContextProvider, IGrpcClients } from "../contexts/GrpcContext";
import { WagmiProvider } from "./wagmi";

export const queryClient = new QueryClient();

interface Props<Clients> {
  clients: Clients;
  children: ComponentChildren;
}

export function DProviders<Clients extends IGrpcClients>({
  clients,
  children,
}: Props<Clients>) {
  return (
    <WagmiProvider>
      <QueryClientProvider client={queryClient}>
        <GrpcContextProvider clients={clients}>{children}</GrpcContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
