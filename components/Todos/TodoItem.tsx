import { Box, Text } from "@mantine/core";

const TodoItem = ({ todo, handleIsDone }) => {
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
