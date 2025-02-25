import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import styles from "./todo-list.module.scss";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import TaskInput from "./task-input/task-input";
import { DragIndicator } from "@mui/icons-material";
import { getTestTasks } from "../../utils/api";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";

const TodoList = () => {
  const [currentTodoList, setCurrentTodoList] = useState<Array<ITask>>([]);
  const [currentDays, setCurrentDays] = useState<ITaskDays | null>(null);

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
        task.text = value;
      }
      return task;
    });
    setCurrentTodoList(items);
  };

  const createDays = (tasks: Array<ITask>) => {
    const days: ITaskDays = {};
    tasks.forEach((task) => {
      const date = new Date(task.create_date);
      const day = date.toDateString();
      if (!days[day]) {
        days[day] = [task];
      } else {
        days[day].push(task);
      }
    });
    setCurrentDays(days);
  };

  useEffect(() => {
    getTestTasks().then((data) => {
      createDays(data);
      setCurrentTodoList(data);
    });
  }, []);

  useUpdateEffect(() => {
    console.log(currentDays);
  }, [currentDays]);

  return (
    <Box className={styles.todolist}>
      <FormGroup>
        {currentDays &&
          Object.keys(currentDays)
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
            .map((day, index) => (
              <Box key={index}>
                <Typography>{day}</Typography>
                {currentDays[day].map((task) => (
                  <Box className={styles.task} key={task.id}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Box>
                          <TaskInput
                            value={task.text}
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
                ))}
              </Box>
            ))}
      </FormGroup>
    </Box>
  );
};

export default TodoList;
