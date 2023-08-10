// import dependencies
import React, { useState, useEffect } from "react";
import TaskLane from "../TaskLane";
import AddCard from "../AddCard";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROJECT } from "../../utils/queries";
import { useParams } from "react-router-dom";

// styling
const flexContainerStyle = {
  display: "flex",
  flexDirection: "column",
};

export default function TaskBoard() {
  // pass projectId from url to query
  const { projectId } = useParams();
  // set up query to get project data
  const { loading, error, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
  });

  //  set up mutation and state for tasks
  const [tasks, setTasks] = useState([]);

  // set tasks to state when data loads
  useEffect(() => {
    if (data) {
      setTasks(data.project.tasks);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // function to add a new task to the database
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

  // return statement renders the page
  return (
      <div className="task-area" style={flexContainerStyle}>
        <AddCard addTask={handleAddTask} />
        <div className="lanes" >
          <TaskLane title="To-Do" tasks={tasks.filter((task) => task.status === "To-Do")} />
          <TaskLane title="In Progress" tasks={tasks.filter((task) => task.status === "In Progress")}/>
          <TaskLane title="Completed" tasks={tasks.filter((task) => task.status === "Completed")}/>
        </div>
      </div>
  );
}