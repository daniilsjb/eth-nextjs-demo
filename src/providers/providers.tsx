import { ReactNode } from "react";

import EthereumProvider from "@/providers/EthereumProvider";
import ComponentProvider from "@/providers/ComponentProvider";

const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <EthereumProvider>
      <ComponentProvider>{children}</ComponentProvider>
    </EthereumProvider>
  );
};

export default RootProvider;
