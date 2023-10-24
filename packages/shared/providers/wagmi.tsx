import { ComponentChildren, FunctionalComponent } from "preact";
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

interface Props {
  children: ComponentChildren;
}

export const WagmiProvider: FunctionalComponent<Props> = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
