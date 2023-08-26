import { useDisconnect } from "wagmi";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

const Disconnect = () => {
  const { disconnect } = useDisconnect();
  return (
    <Tooltip label="Disconnect" color="gray" withArrow>
      <ActionIcon color="gray" onClick={() => disconnect()}>
        <IconLogout />
      </ActionIcon>
    </Tooltip>
  );
};

export default Disconnect;
