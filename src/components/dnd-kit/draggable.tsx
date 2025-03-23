import { useDraggable } from "@dnd-kit/core";
import { FC, ReactNode } from "react";

interface IDraggableProps {
  children: ReactNode;
  id: string;
}

const Draggable: FC<IDraggableProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;
