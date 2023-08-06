import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const KanbanCard = ({ title, index, parent }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });

  const style = {
    padding: "8px",
    backgroundColor: "white",
    margin: "8px",
    borderRadius: "8px",
    border: "2px solid gray",
    boxShadow: "0px 0px 5px 2px #2121213b",
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <p>{title}</p>
    </div>
  );
};

export default KanbanCard;