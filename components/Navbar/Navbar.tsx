import { Box, Button, Group, Menu, Title } from "@mantine/core";
import UserMenuContainer from "./UserMenuContainer";

const Navbar = () => {
  return (
    <Group
      sx={(theme) => ({
        width: "100%",
        backgroundColor: "#FEFCF3",
        padding: theme.spacing.md,
      })}
      position="apart"
    >
      <Title>MERN App</Title>
      <UserMenuContainer />
    </Group>
  );
};

export default Navbar;
