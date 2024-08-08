import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import styles from "./todo-list.module.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import TaskInput from "./task-input/task-input";
import { DragIndicator } from "@mui/icons-material";

const TodoList = () => {
  const todoList = [
    { id: 1, name: "task1", done: false },
    { id: 2, name: "task2", done: false },
    { id: 3, name: "task3", done: false },
  ];
  const [currentTodoList, setCurrentTodoList] =
    useState<Array<ITask>>(todoList);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(currentTodoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCurrentTodoList(items);
  };

  const handleCheck = (checkedTask: ITask, checked: boolean) => {
    const items = currentTodoList.map((task) => {
      if (task.id === checkedTask.id) {
        task.done = checked;
      }
      return task;
    });
    setCurrentTodoList(items);
  };

  const handleInputChange = (event: ChangeEvent, changedTask: ITask) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    const items = currentTodoList.map((task) => {
      if (task.id === changedTask.id) {
        task.name = value;
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
              sx={{ mt: 2 }}
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
                            <Box>
                              <TaskInput
                                value={task.name}
                                handleInputChange={(event: ChangeEvent) =>
                                  handleInputChange(event, task)
                                }
                                lineThrough={task.done}
                              />
                              <DragIndicator />
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
