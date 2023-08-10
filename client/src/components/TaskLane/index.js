import React from "react";
import TaskCard from "../TaskCard";

function TaskLane({ title, tasks }) {



  // styling for the lanes
  const laneStyle = {
    padding: "5px",
    flexDirection: "column",
    minHeight: "10rem",
  };


  // return statement renders TaskCards into the corresponding lane
  return (
    <div className="lane" style={laneStyle}>
      <h2 >{title}</h2>
      <div>
        {tasks.map((task, key) => (
          <TaskCard task={task} key={task._id} index={key} parent={title} />
        ))}
      </div>
    </div>
  );
}

export default TaskLane;