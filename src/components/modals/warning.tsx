import { modals } from "@mantine/modals";
import { Group, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

type WarningModal = {
  title: string;
  message: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const openWarningModal = ({ title, message, onCancel, onConfirm }: WarningModal) => {
  modals.openConfirmModal({
    title: (
      <Group>
        <IconAlertCircle />
        <Text>{title}</Text>
      </Group>
    ),
    children: <Text size="sm">{message}</Text>,
    labels: {
      cancel: "Cancel",
      confirm: "Confirm",
    },
    onCancel,
    onConfirm,
  });
};

export default openWarningModal;
