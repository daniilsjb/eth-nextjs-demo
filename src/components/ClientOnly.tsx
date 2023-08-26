import { ReactNode, useEffect, useState } from "react";

/**
 * Wrapper component that forces its children to NOT be pre-rendered on the server as a
 * way of preventing hydration errors that may be caused by wallet reconnections, etc.
 *
 * Based on: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
 */
const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
