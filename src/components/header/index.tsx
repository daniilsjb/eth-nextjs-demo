import { Container, Flex, Paper } from "@mantine/core";

import Address from "@/components/header/address";
import Disconnect from "@/components/header/disconnect";
import Navigation from "@/components/header/navigation";
import ToggleTheme from "@/components/header/toggle-theme";

const Header = () => {
  return (
    <Paper shadow="sm" radius="xs" p="md">
      <Container size="lg">
        <Flex justify="space-between" align="center">
          <Navigation />
          <Address />
          <Flex gap="xl">
            <ToggleTheme />
            <Disconnect />
          </Flex>
        </Flex>
      </Container>
    </Paper>
  );
};

export default Header;
