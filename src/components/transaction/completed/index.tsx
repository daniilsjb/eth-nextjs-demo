import { Button, Flex, Text } from "@mantine/core";
import { TxHash } from "@/components/transaction/types";

type TxCompletedProps = {
  hash: TxHash;
  restart: () => void;
};

const TxCompleted = ({ hash, restart }: TxCompletedProps) => {
  return (
    <Flex direction="column" align="center">
      <Text mt="xl" align="center">
        Transaction completed successfully!
      </Text>
      <Text mb="xl" align="center" color="dimmed">
        ({hash})
      </Text>
      <Button onClick={() => restart()}>Continue</Button>
    </Flex>
  );
};

export default TxCompleted;
