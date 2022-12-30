import { showNotification } from "@mantine/notifications";

export const handleApiError = (error: any) => {
  showNotification({
    title: "Error",
    message: error.response.data.message,
    color: "red",
  });
};
