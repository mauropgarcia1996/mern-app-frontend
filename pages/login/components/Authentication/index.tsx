import { Box, Tabs } from "@mantine/core";
import { NextPageWithLayout } from "../../../_app";
import LoginForm from "./LoginForm";

const AuthenticationContainer: NextPageWithLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Tabs defaultValue="login">
          <Tabs.List>
            <Tabs.Tab value="login">Log In</Tabs.Tab>
            <Tabs.Tab disabled value="signup">
              Sign Up
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="login">
            <Box>
              <h1>Log In</h1>
              <LoginForm />
            </Box>
          </Tabs.Panel>
          <Tabs.Panel value="signup">
            <Box></Box>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Box>
  );
};

export default AuthenticationContainer;
