import { ComponentChildren } from "preact";
import { GrpcContextProvider, IGrpcClients } from "./contexts/GrpcContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { createPublicClient, http } from "viem";

const config = createConfig({
  connectors: [new MetaMaskConnector(), new InjectedConnector()],
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

const queryClient = new QueryClient();

interface Props<Clients> {
  clients: Clients;
  children: ComponentChildren;
}

export function DProviders<Clients extends IGrpcClients>({
  clients,
  children,
}: Props<Clients>) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <GrpcContextProvider clients={clients}>{children}</GrpcContextProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
