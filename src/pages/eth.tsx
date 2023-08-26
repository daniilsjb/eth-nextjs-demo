import { useAccount, useBalance } from "wagmi";
import { Container, Divider, Title } from "@mantine/core";

import Transfer from "@/features/eth/transfer";

const Page = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address, watch: true });

  return (
    <Container size="lg">
      <Title fw="normal" align="center" py="xl">
        {balance ? `${balance.formatted} ${balance.symbol}` : "Loading balance..."}
      </Title>
      <Divider mb="xl" />
      <Transfer />
    </Container>
  );
};

export default Page;
