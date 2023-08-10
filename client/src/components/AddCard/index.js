import React, { useState } from "react";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../../utils/mutations";
import { useParams } from "react-router-dom";

export default function AddTask() {
  const { projectId } = useParams();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("To-Do");
  const [dueDate, setDueDate] = useState("");

  const [addTask, { loading, error, data: addTaskData }] = useMutation(ADD_TASK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedDueDate = dayjs(dueDate).format("MM/DD/YYYY");
      const { data } = await addTask({
        variables: {
          projectId: projectId,
          name: name,
          comment: comment,
          status: status,
          dueDate: parsedDueDate,
        },
      });

      console.log("Task created:", data.addTask);
      setName("");
      setComment("");
      setStatus("To-Do");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className='task-board'>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Task Name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <h2>Status</h2>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <h2>Due Date</h2>
          <input
            type="text"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="MM/DD/YYYY"
          />
          {dueDate && (
            <p>Formatted Due Date: {dayjs(dueDate).format("MM/DD/YYYY")}</p>
          )}
        </div>
        <button className="loginBtn"type="submit" disabled={loading}>
          {loading ? "Adding Task..." : "Add Task"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}