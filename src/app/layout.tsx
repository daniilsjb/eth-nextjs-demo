import React from "react";
import type { Metadata } from "next";

import Providers from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Ethereum App",
  description: "An example viem-based Ethereum project using Next.js",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
