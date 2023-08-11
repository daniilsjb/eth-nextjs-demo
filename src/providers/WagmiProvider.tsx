import React from "react";

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

// This specifies all the EVM chains on which the application is supposed to function.
// Therefore, they must also be our deployment targets for any custom contracts.
const chains = [sepolia];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(config, chains);

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WagmiConfig config={config}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default WagmiProvider;
