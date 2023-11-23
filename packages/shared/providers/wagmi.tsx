import { ComponentChildren, FunctionalComponent } from "preact";
import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  sepolia,
} from "wagmi";
import { goerli } from "viem/chains"; // deprecated
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { LedgerConnector } from "wagmi/connectors/ledger";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia, goerli],
  [
    alchemyProvider({ apiKey: "rov5Tf9RhgB-SJGkULjyEzotCowvokH5" }),
    publicProvider(),
  ]
);

const config = createConfig({
  connectors: [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
    new LedgerConnector({
      chains,
      options: {
        walletConnectVersion: 2,
        projectId: "f7ad7e365f67c5668b2d5d06bf751760",
      },
    }),
  ],
  // autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

interface Props {
  children: ComponentChildren;
}

export const WagmiProvider: FunctionalComponent<Props> = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
