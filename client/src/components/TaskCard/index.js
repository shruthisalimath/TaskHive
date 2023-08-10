import React, { useState } from "react";
import dayjs from "dayjs";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK, REMOVE_TASK } from "../../utils/mutations";

const TaskCard = ({ task, projectId }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const [updateTask] = useMutation(UPDATE_TASK);
  const [removeTask] = useMutation(REMOVE_TASK);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    comment: task.comment,
    status: task.status,
    dueDate: task.dueDate,
  });

  const style = {
    // padding: "8px",
    // backgroundColor: "white",
    // margin: "8px",
    // borderRadius: "8px",
    // border: "2px solid gray",
    // boxShadow: "0px 0px 5px 2px #2121213b",
    // transform: CSS.Translate.toString(transform),
    // cursor: "grab",
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

  const handleEditTask = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveEditedTask = async () => {
    try {
      await updateTask({
        variables: {
          taskId: task._id,
          ...editedTask,
          projectId: projectId,
        },
      });
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (

    // Task Card
    <div className="task-card">
      <h3>{task.name}</h3>
      <div className="spacer"></div>
      <p>{task.comment}</p>
      <div className="spacer2"></div>
      <p>Due: {dayjs(parseInt(task.dueDate)).format("MM/DD/YYYY")}</p>
      <div className="spacer2"></div>
      <div className='btn-row'>
        <button className="task-card-btn" onClick={handleEditTask}>Edit</button>
        <button className="task-card-btn"onClick= {handleDeleteTask}>Delete</button>
      </div>


      {/* @Edit Task Modal@ */}
      {modalIsOpen && (
        <div className="modal">
        <br></br>
          <div className="modal-content">
            <h2>Edit Task</h2>
            <div>
              {/* <p>Name:</p> */}
              <input
                className='name'
                type="text"
                value={editedTask.name}
                onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
              />
          
              {/* <p>Description:</p> */}
              <textarea
                value={editedTask.comment}
                onChange={(e) => setEditedTask({ ...editedTask, comment: e.target.value })}
              />
          
              {/* <p>Status:</p> */}
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              {/* <p>Due Date:</p> */}
              <input
                className='date'
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              />
            <div className="btn-row">
              <button className="task-card-btn" onClick={saveEditedTask}>Save</button>
              <button className="task-card-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;