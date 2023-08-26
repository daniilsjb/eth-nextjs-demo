import { ReactNode } from "react";
import { useAccount } from "wagmi";

import Header from "@/components/header";
import ClientOnly from "@/components/ClientOnly";
import ConnectWallet from "@/components/connect-wallet";
import DetectNetworkChange from "@/features/network/detect-change";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <ClientOnly>
        <ConnectWallet />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Header />
      {children}

      {/* Components that are only used for side effects. */}
      <DetectNetworkChange />
    </ClientOnly>
  );
};

export default Layout;
