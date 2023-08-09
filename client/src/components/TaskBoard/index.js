import React, { useState, useEffect } from "react";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import TaskLane from "../TaskLane";
import AddCard from "../AddCard";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PROJECT } from "../../utils/queries";
import { UPDATE_TASK } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const flexContainerStyle = {
  display: "flex",
  flexDirection: "column",
};

export default function TaskBoard() {
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
  });

  const [todoItems, setTodoItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    if (data) {
      const { tasks } = data.project;
      const newTodoItems = tasks.filter((task) => task.status === "To-Do");
      const newInProgressItems = tasks.filter((task) => task.status === "In Progress");
      const newDoneItems = tasks.filter((task) => task.status === "Completed");
      setTodoItems(newTodoItems);
      setInProgressItems(newInProgressItems);
      setDoneItems(newDoneItems);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddTask = async (newTask) => {
    try {
      const { data: addTaskData } = await addTask({
        variables: {
          projectId,
          name: newTask.name,
          comment: newTask.comment,
          status: newTask.status,
          dueDate: newTask.dueDate,
        },
      });

      const updatedTasks = [...todoItems, addTaskData.addTask];
      setTodoItems(updatedTasks);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <DndContext collisionDetection={rectIntersection}>
      <div style={flexContainerStyle}>
        <AddCard addTask={handleAddTask}/>
        <div style={{ display: "flex" }}>
          <TaskLane title="To-Do" tasks={todoItems} />
          <TaskLane title="In Progress" tasks={inProgressItems} />
          <TaskLane title="Completed" tasks={doneItems} />
        </div>
      </div>
    </DndContext>
  );
}