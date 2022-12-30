import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";
import { AxiosInstance } from "../../../../config/axiosConfig";
import { handleApiError } from "../../../../utils/apiUtils";

type User = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        /^[a-zA-Z0-9]{3,30}$/.test(value) ? null : "Invalid username.",
      password: (value) =>
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
          ? null
          : "Invalid password.",
    },
  });
  const [loading, setLoading] = useState(false);

  const login = async (data: User) => {
    setLoading(true);
    AxiosInstance({
      method: "POST",
      url: "/auth/login",
      data: data,
    })
      .then((response) => {
        showNotification({
          title: "Success",
          message: "Login successful",
          color: "teal",
        });
        showNotification({
          title: "Loading",
          message: "You are being redirected to the home page",
          color: "teal",
          loading: true,
        });
        setTimeout(() => {
          setLoading(false);
          router.push("/");
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        handleApiError(error);
        return;
      });
  };
  return (
    <form onSubmit={form.onSubmit(login)}>
      <TextInput
        withAsterisk
        label="Username"
        placeholder="Username"
        {...form.getInputProps("username")}
      />
      <TextInput
        withAsterisk
        label="Password"
        placeholder="Password"
        type="password"
        {...form.getInputProps("password")}
      />
      <Group position="right" mt="md">
        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default LoginForm;
