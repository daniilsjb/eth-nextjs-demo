import { ReactNode } from "react";

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, mainnet } from "wagmi/chains";

const supportedChains = [mainnet, hardhat];
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const { chains, publicClient } = configureChains(supportedChains, [w3mProvider({ projectId })]);

const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(config, chains);

const EthereumProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <WagmiConfig config={config}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default EthereumProvider;
