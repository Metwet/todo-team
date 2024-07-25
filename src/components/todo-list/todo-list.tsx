import { Box } from "@mui/material";
import styles from "./todo-list.module.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

const TodoList = () => {
  const todoList = [
    { id: 1, name: "task1" },
    { id: 2, name: "task2" },
    { id: 3, name: "task3" },
  ];
  const [currentTodoList, setCurrentTodoList] = useState<Array<any>>(todoList);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(currentTodoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
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
              {currentTodoList.map((subject, index) => (
                <Draggable
                  key={subject.id.toString()}
                  index={index}
                  draggableId={subject.id.toString()}
                >
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ width: 300 }}
                    >
                      {subject.name}
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default TodoList;
