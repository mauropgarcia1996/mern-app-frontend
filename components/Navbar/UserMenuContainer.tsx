import {
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconChevronRight } from "@tabler/icons";
import { useRouter } from "next/router";
import { AxiosInstance } from "../../config/axiosConfig";
import useUser from "../../hooks/useUser";
import { useUserStore } from "../../stores/userStore";
import { handleApiError } from "../../utils/apiUtils";

const UserMenuContainer = () => {
  const router = useRouter();
  const { user, update } = useUserStore((state) => state);

  const signOut = () => {
    AxiosInstance({
      method: "POST",
      url: "/auth/logout",
      withCredentials: true,
      data: {
        username: "test",
      },
    })
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Sign out successful",
          color: "teal",
        });
        showNotification({
          title: "Loading",
          message: "You are being redirected to the login page",
          color: "teal",
          loading: true,
        });
        setTimeout(() => {
          update(null);
          router.push("/login");
        }, 3000);
      })
      .catch((error) => {
        handleApiError(error);
      });
  };
  return (
    <Box>
      <Menu>
        <Menu.Target>
          <UnstyledButton
            sx={(theme) => ({
              display: "block",
              width: "100%",
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.orange[1],
              },
            })}
          >
            <Group>
              <Avatar
                radius="xl"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              />
              <Box>
                <Text size="sm" weight="500" suppressHydrationWarning>
                  {`${user?.firstName} ${user?.lastName}`}
                </Text>
                <Text size="xs" color="dimmed">
                  Administrator
                </Text>
              </Box>
              <IconChevronRight size={16} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item onClick={signOut}>Sign out</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default UserMenuContainer;
