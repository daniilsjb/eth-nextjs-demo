import { Address } from "viem";
import { usePublicClient } from "wagmi";
import { notifications } from "@mantine/notifications";
import openWarningModal from "@/components/modals/warning";

const showFailureNotification = () => {
  notifications.show({
    title: "Failed to determine recipient type",
    message: "Encountered an error while trying to determine if the recipient is a smart contract.",
    color: "red",
  });
};

type ContractRecipientModal = {
  address: Address;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const openContractRecipientModal = ({ address, onCancel, onConfirm }: ContractRecipientModal) => {
  openWarningModal({
    title: "Recipient is a contract",
    message: `Address ${address} belongs to a smart contract.
          Are you sure you want to proceed with this transaction?`,
    onCancel,
    onConfirm,
  });
};

type VerifyAsync = {
  onCancel?: () => void;
  onConfirm?: () => void;
};

type UseVerifyRecipient = {
  address?: Address;
};

type VerifyRecipientResult = {
  verifyAsync?: (args: VerifyAsync) => Promise<void>;
};

const useVerifyRecipient = ({ address }: UseVerifyRecipient): VerifyRecipientResult => {
  const publicClient = usePublicClient();
  if (!address) return {};

  const verifyAsync = async ({ onCancel, onConfirm }: VerifyAsync) => {
    try {
      if (await publicClient.getBytecode({ address })) {
        openContractRecipientModal({ address, onCancel, onConfirm });
      } else {
        onConfirm?.();
      }
    } catch (_) {
      showFailureNotification();
    }
  };

  return { verifyAsync };
};

export default useVerifyRecipient;
