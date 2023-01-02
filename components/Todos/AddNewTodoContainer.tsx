import { Button, Group, Paper, TextInput } from "@mantine/core";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { AxiosInstance } from "../../config/axiosConfig";

const AddNewTodoContainer = () => {
  const { mutate } = useSWRConfig();
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const isTodoValid = () => {
    const todo = newTodo.trim();
    if (todo === "") {
      return false;
    }
    return true;
  };

  const addNewTodo = () => {
    setLoading(true);
    AxiosInstance.post("/todos", { title: newTodo, done: false })
      .then((res) => {
        setLoading(false);
        setNewTodo("");
        mutate("/todos");
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <Paper
      shadow="md"
      p="md"
      sx={(theme) => ({
        width: "100%",
      })}
    >
      <Group position="apart">
        <TextInput
          onChange={(e) => setNewTodo(e.target.value)}
          sx={{ flex: "1 1" }}
          value={newTodo}
          disabled={loading}
        />
        <Button
          loading={loading}
          onClick={addNewTodo}
          disabled={!isTodoValid() || loading}
        >
          Add
        </Button>
      </Group>
    </Paper>
  );
};

export default AddNewTodoContainer;
