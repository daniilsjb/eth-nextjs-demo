import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const ToggleTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Tooltip label="Toggle theme" color="gray" withArrow>
      <ActionIcon color="gray" onClick={() => toggleColorScheme()}>
        {colorScheme === "light" ? <IconSun /> : <IconMoonStars />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleTheme;
