import { useAccount, useBalance } from "wagmi";
import { Container, Tabs, Title } from "@mantine/core";

import Allowance from "@/features/usdt/allowance";
import Transaction from "@/features/usdt/transfer";
import { USDT_ADDRESS } from "@/features/usdt/constants";

const Page = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    watch: true,
    token: USDT_ADDRESS,
  });

  return (
    <Container size="lg">
      <Title fw="normal" align="center" py="xl">
        {balance ? `${balance.formatted} ${balance.symbol}` : "Loading balance..."}
      </Title>
      <Tabs defaultValue="transaction">
        <Tabs.List grow>
          <Tabs.Tab value="transaction">Transaction</Tabs.Tab>
          <Tabs.Tab value="allowance">Allowance</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="transaction" pt="xl">
          <Transaction />
        </Tabs.Panel>
        <Tabs.Panel value="allowance" pt="xl">
          <Allowance />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Page;
