import { useAccount } from "wagmi";
import { useClipboard } from "@mantine/hooks";
import { Button, Tooltip } from "@mantine/core";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons-react";

const Address = () => {
  const { address } = useAccount();
  const { copy, copied } = useClipboard({ timeout: 10_000 });
  const icon = copied ? <IconClipboardCheck size={18} /> : <IconClipboard size={18} />;
  return (
    <Tooltip label={copied ? "Copied!" : "Copy address"} color="blue" withArrow>
      <Button onClick={() => copy(address)} variant="light" radius="xl" rightIcon={icon}>
        {address?.slice(0, 5)}...{address?.slice(-4)}
      </Button>
    </Tooltip>
  );
};

export default Address;
