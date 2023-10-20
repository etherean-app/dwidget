import { Widget } from "./components/Widget";
import { GrpcContextProvider } from "./contexts/GrpcContext";
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

export function App() {
  return (
    <div>
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <GrpcContextProvider>
            <Widget />
          </GrpcContextProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </div>
  );
}
