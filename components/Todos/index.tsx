import { Paper, Stack } from "@mantine/core";
import useSWR from "swr";
import { AxiosInstance } from "../../config/axiosConfig";
import AddNewTodoContainer from "./AddNewTodoContainer";
import TodoFilters from "./TodoFilters";
import TodoItem from "./TodoItem";

const fetcher = (url) => AxiosInstance.get(url).then((res) => res.data);

const TodosContainer = () => {
  const { data } = useSWR("/todos", fetcher);

  return (
    <>
      <AddNewTodoContainer />
      <TodoFilters />
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
            <TodoItem key={`todo_item_${index}`} todo={todo} />
          ))}
        </Stack>
      </Paper>
    </>
  );
};

export default TodosContainer;
