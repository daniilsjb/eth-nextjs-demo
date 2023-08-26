import { useWeb3Modal } from "@web3modal/react";
import { Button, Flex, Text } from "@mantine/core";

const ConnectWallet = () => {
  const { open } = useWeb3Modal();
  return (
    <Flex mih="100vh" direction="column" align="center" justify="center" gap="xs">
      <Text align="center" fz="xl">
        Please, connect your wallet
      </Text>
      <Text align="center">
        You need to connect your wallet to view your balance, manage allowance, and transfer funds.
      </Text>
      <Button onClick={open} mt="sm" variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
        Connect
      </Button>
    </Flex>
  );
};

export default ConnectWallet;
