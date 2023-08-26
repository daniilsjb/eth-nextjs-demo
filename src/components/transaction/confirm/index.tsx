import { useEffect } from "react";
import { Flex, Loader, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const showFailureNotification = () => {
  notifications.show({
    title: "Transaction cancelled",
    message: "This transaction was rejected and will not get executed.",
    color: "red",
  });
};

type TxConfirmProps = {
  isSuccess: boolean;
  isFailure: boolean;
  onSuccess: () => void;
  onFailure: () => void;
};

const TxConfirm = ({ isSuccess, isFailure, onSuccess, onFailure }: TxConfirmProps) => {
  useEffect(() => {
    if (!isSuccess) return;
    onSuccess();
  }, [isSuccess, onSuccess]);

  useEffect(() => {
    if (!isFailure) return;
    onFailure();
    showFailureNotification();
  }, [isFailure, onFailure]);

  return (
    <Flex direction="column" align="center">
      <Text my="xl" align="center">
        Please, confirm the transaction through your wallet.
      </Text>
      <Loader variant="dots" />
    </Flex>
  );
};

export default TxConfirm;
