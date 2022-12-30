import { Box } from "@mantine/core";
import TodosContainer from "../components/Todos";
import Layout from "./layout";

const Home = () => {
  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing.sm,
        width: "100%",
      })}
    >
      <TodosContainer />
    </Box>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
