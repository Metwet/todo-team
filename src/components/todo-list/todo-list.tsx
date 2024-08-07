import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import styles from "./todo-list.module.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SyntheticEvent, useState } from "react";

const TodoList = () => {
  const todoList = [
    { id: 1, name: "task1", done: false },
    { id: 2, name: "task2", done: false },
    { id: 3, name: "task3", done: false },
  ];
  const [currentTodoList, setCurrentTodoList] = useState<Array<any>>(todoList);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(currentTodoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCurrentTodoList(items);
  };

  const handleCheck = (checkedTask: any, checked: boolean) => {
    const items = currentTodoList.map((task) => {
      if (task.id === checkedTask.id) {
        task.done = checked;
      }
      return task;
    });
    setCurrentTodoList(items);
  };

  return (
    <Box className={styles.todolist}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="subjects">
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ width: 500, mt: 2 }}
            >
              <FormGroup>
                {currentTodoList.map((task, index) => (
                  <Draggable
                    key={task.id.toString()}
                    index={index}
                    draggableId={task.id.toString()}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.task}
                      >
                        <FormControlLabel
                          control={<Checkbox />}
                          label={
                            <Box
                              className={`${
                                task.done ? styles.lineThrough : ""
                              }`}
                            >
                              {task.name}
                            </Box>
                          }
                          checked={task.done}
                          onChange={(
                            event: SyntheticEvent<Element, Event>,
                            checked: boolean
                          ) => handleCheck(task, checked)}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
              </FormGroup>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default TodoList;
