import { Group, Paper, Select } from "@mantine/core";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { AxiosInstance } from "../../config/axiosConfig";

const fetcher = (url: string, { arg }: any) =>
  AxiosInstance.get(url, { params: { status: arg } }).then((res) => res.data);

const TodoFilters = () => {
  const { trigger } = useSWRMutation("/todos", fetcher);
  const FILTERS = [
    { label: "All", value: "all" },
    { label: "Done", value: "done" },
    { label: "Incompleted", value: "incompleted" },
  ];

  const filterTodos = (filter: string) => {
    mutate("/todos", trigger(filter), { revalidate: false });
  };
  return (
    <Paper
      shadow="md"
      mt="md"
      p="md"
      sx={(theme) => ({
        width: "100%",
      })}
    >
      <Group>
        <Select
          label="Status"
          placeholder="Select status"
          data={FILTERS}
          defaultValue="all"
          onChange={filterTodos}
        />
      </Group>
    </Paper>
  );
};

export default TodoFilters;
