import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "../../utils/mutations";

function TaskLane({ title, tasks }) {
    console.log("tasks", tasks);
    console.log("title", title);
  const { setNodeRef, isOver, isOverContainer } = useDroppable({
    id: title,
  });

  const [updateTask, { loading, error, data: updateTaskData }] = useMutation(UPDATE_TASK);

  const laneStyle = {
    padding: "5px",
    flexDirection: "column",
    minHeight: "10rem",
    border: isOver && isOverContainer ? "2px dashed green" : "none",
  };

  const laneContentStyle = {
     
  };

  return (
    <div className="lane" style={laneStyle}>
      <h2 >{title}</h2>
      <div ref={setNodeRef} style={laneContentStyle}>
        {tasks.map((task, key) => (
          <TaskCard task={task} key={task._id} index={key} parent={title} />
        ))}
      </div>
    </div>
  );
}

export default TaskLane;