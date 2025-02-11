import { Box } from "@mui/material";
import TodoList from "../../components/todo-list/todo-list";
import styles from "./home.module.scss";
import Habits from "../../components/habits/habits";

const Home = () => {
  return (
    <Box className={styles.home}>
      <TodoList />
      <Habits />
    </Box>
  );
};

export default Home;
