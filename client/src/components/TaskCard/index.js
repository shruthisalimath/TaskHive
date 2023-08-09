import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "../../utils/mutations";

const TaskCard = ({ task, index, parent }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: {
      task,
      index,
      parent,
    },
  });

  const [updateTask] = useMutation(UPDATE_TASK);

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

  const handleTaskDrop = async (newStatus) => {
    try {
      await updateTask({
        variables: {
          taskId: task._id,
          status: newStatus,
        },
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      onDragEnd={(event) => {
        const overLane = event.over ? event.over.id : null;
        if (overLane !== parent) {
          handleTaskDrop(overLane);
        }
      }}
    >
      <p>{task.name}</p>
      <p>Comment: {task.comment}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.dueDate}</p>
    </div>
  );
};

export default TaskCard;