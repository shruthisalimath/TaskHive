import React from "react";
import dayjs from "dayjs";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK, REMOVE_TASK } from "../../utils/mutations";


const TaskCard = ({ task, projectId }) => {
  console.log("projectId", projectId)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });


  const [updateTask] = useMutation(UPDATE_TASK);
  const [removeTask] = useMutation(REMOVE_TASK);


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


  const handleDeleteTask = async () => {
    console.log("deleting task:", task._id, task.projectId)
    try {
      await removeTask({
        variables: {
          taskId: task._id,
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const openModal = () => {
    console.log("edit task:", task)
  }


  return (
    <div
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      onDragEnd={(event) => {
        const overLane = event.over ? event.over.id : null;
        if (overLane) {
          handleTaskDrop(overLane);
        }
      }}
    >
      <p>{task.name}</p>
      <p>projectId: {task.projectId}</p>
      <p>Comment: {task.comment}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {dayjs(task.dueDate).format("MM/DD/YYYY")}</p>
      <button onClick={handleDeleteTask}>Delete</button>
      <button onClick={openModal}>Edit</button>
    </div>
  );
};


export default TaskCard;