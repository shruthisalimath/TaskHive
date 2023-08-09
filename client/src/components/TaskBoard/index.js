import React, { useState, useEffect } from "react";
import { DndContext, rectIntersection, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const [updateTask] = useMutation(UPDATE_TASK);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      setTasks(data.project.tasks);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddTask = async (newTask) => {
    try {
      const { data: addTaskData } = await addTask({
        variables: {
          projectId,
          ...newTask,
        },
      });

      setTasks([...tasks, addTaskData.addTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleTaskDrop = async (taskId, newStatus) => {
    try {
      await updateTask({
        variables: {
          taskId,
          status: newStatus,
        },
      });

      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={rectIntersection}>
      <div style={flexContainerStyle}>
        <AddCard addTask={handleAddTask} />
        <div style={{ display: "flex" }}>
          <TaskLane title="To-Do" tasks={tasks.filter((task) => task.status === "To-Do")} onTaskDrop={handleTaskDrop} />
          <TaskLane title="In Progress" tasks={tasks.filter((task) => task.status === "In Progress")} onTaskDrop={handleTaskDrop} />
          <TaskLane title="Completed" tasks={tasks.filter((task) => task.status === "Completed")} onTaskDrop={handleTaskDrop} />
        </div>
      </div>
    </DndContext>
  );
}