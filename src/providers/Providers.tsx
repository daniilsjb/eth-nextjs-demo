"use client";

import React from "react";
import WagmiProvider from "@/providers/WagmiProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <WagmiProvider>{children}</WagmiProvider>;
};

export default Providers;
