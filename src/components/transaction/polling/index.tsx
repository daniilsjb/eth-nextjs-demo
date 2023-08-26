import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { Flex, Loader, Text } from "@mantine/core";
import { TxHash } from "@/components/transaction/types";

const showSuccessNotification = () => {
  notifications.show({
    title: "Transaction completed",
    message: "Your transaction has been completed successfully.",
    color: "green",
  });
};

const showFailureNotification = () => {
  notifications.show({
    title: "Polling failed",
    message: "Something went wrong while monitoring the transaction.",
    color: "red",
  });
};

type TxPollingProps = {
  hash: TxHash;
  isSuccess: boolean;
  isFailure: boolean;
  onSuccess: () => void;
  onFailure: () => void;
};

const TxPolling = ({ hash, isSuccess, isFailure, onSuccess, onFailure }: TxPollingProps) => {
  useEffect(() => {
    if (!isSuccess) return;
    onSuccess();
    showSuccessNotification();
  }, [isSuccess, onSuccess]);

  useEffect(() => {
    if (!isFailure) return;
    onFailure();
    showFailureNotification();
  }, [isFailure, onFailure]);

  return (
    <Flex direction="column" align="center">
      <Text mt="xl" align="center">
        Your transaction is pending. This may take a while...
      </Text>
      <Text mb="xl" align="center" color="dimmed">
        ({hash})
      </Text>
      <Loader variant="dots" />
    </Flex>
  );
};

export default TxPolling;
