# Ethereum Next.js Application

![Preview](img/dark/preview.png#gh-dark-mode-only "Thumbnail")
![Preview](img/light/preview.png#gh-light-mode-only "Thumbnail")

This is a demonstration showcasing [Next.js](https://nextjs.org/) frontend integration with Ethereum dapps. This
projects uses [viem](https://viem.sh/) and [wagmi](https://wagmi.sh/) packages for interactions with the blockchain,
[Web3Modal](https://web3modal.com/) for wallet  connections, and [Mantine](https://mantine.dev/) for UI components.

## Features

- Allows transferring ETH in Ether, Gwei, or Wei units.
- Allows transferring USDT tokens and managing allowances.
- Provides step-by-step feedback for every fund transfer.
- Automatically refreshes balance and wallet information.
- Detects network changes and offers switching to the mainnet.
- Issues warnings if transaction recipient is a smart contract.
- Supports dark and light themes.

> **Warning**
> This is only a demonstration, I do not recommend using this to actually manage your funds.

## Running Locally

If you would like to test this application using a local network, such as Hardhat, do the following:

1. Obtain an API key from [WalletConnect](cloud.walletconnect.com) and place it in `.env.local` (refer to `.env.local.example`).
2. Start the local development environment by running `npm run dev`.
3. Open <http://localhost:3000> to use the application.

> **Note**
> Only Ethereum mainnet and Hardhat test network are supported, due to the dependency on the USDT contract. For testing
> and development purposes, it is highly recommended that you launch a [local mainnet fork][1] and use the
> impersonation feature to obtain USDT funds for test accounts.

[1]: https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#forking-from-mainnet
