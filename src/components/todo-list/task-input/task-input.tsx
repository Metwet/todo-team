import { Input } from "@mui/material";
import styles from "./task-input.module.scss";
import { ChangeEvent, FC } from "react";

interface ITaskInputProps {
  value: string;
  handleInputChange: (event: ChangeEvent) => void;
  lineThrough: boolean;
}

const TaskInput: FC<ITaskInputProps> = ({
  value,
  handleInputChange,
  lineThrough,
}) => {
  return (
    <Input
      value={value}
      onChange={handleInputChange}
      className={`${lineThrough ? styles.lineThrough : ""}`}
      disableUnderline
    />
  );
};

export default TaskInput;
