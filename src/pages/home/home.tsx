import { Container } from "@mui/material";
import TodoList from "../../components/todo-list/todo-list";

const Home = () => {
  return (
    <Container maxWidth="sm">
      <TodoList />
    </Container>
  );
};

export default Home;
