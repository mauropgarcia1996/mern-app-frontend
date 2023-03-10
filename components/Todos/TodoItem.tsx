import { Box, Text } from "@mantine/core";
import { mutate } from "swr";
import { AxiosInstance } from "../../config/axiosConfig";

const TodoItem = ({ todo }: any) => {
  const handleIsDone = (id: string, done: boolean) => {
    AxiosInstance({
      method: "PATCH",
      url: `/todos/${id}`,
      data: { done: !done },
    })
      .then((res) => {
        mutate("/todos");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        textDecoration: todo.done ? "line-through" : "none",
        "&:hover": {
          cursor: "pointer",
          textDecoration: "line-through",
        },
      })}
      onClick={() => handleIsDone(todo._id, todo.done)}
    >
      <Text>{todo.title}</Text>
    </Box>
  );
};

export default TodoItem;
