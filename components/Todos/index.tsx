import { Button, Group, Overlay, Paper, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { AxiosInstance } from "../../config/axiosConfig";
import TodoItem from "./TodoItem";

const fetcher = (url) => AxiosInstance.get(url).then((res) => res.data);

const TodosContainer = () => {
  const { data, error } = useSWR("/todos", fetcher);
  const { mutate } = useSWRConfig();
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

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
    <>
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
            disabled={newTodo === "" || loading}
          >
            Add
          </Button>
        </Group>
      </Paper>
      <Paper
        shadow="md"
        p="md"
        sx={(theme) => ({
          width: "100%",
          marginTop: theme.spacing.lg,
        })}
      >
        <Stack spacing="lg">
          {data?.map((todo, index) => (
            <TodoItem
              key={`todo_item_${index}`}
              todo={todo}
              handleIsDone={handleIsDone}
            />
          ))}
        </Stack>
      </Paper>
    </>
  );
};

export default TodosContainer;
