import React from "react";
import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "../KanbanCard";

function KanbanLane({ title, items }) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  const laneStyle = {
    flex: "3",
    padding: "5px",
    flexDirection: "column",
    minHeight: "10rem",
  };

  const laneContentStyle = {
    backgroundColor: "gray",
    borderRadius: "8px",
    flex: "1",
    padding: "2px",
    flexDirection: "column",
  };

  return (
    <div style={laneStyle}>
      <p style={{ fontWeight: "bold" }}>{title}</p>
      <div ref={setNodeRef} style={laneContentStyle}>
        {items.map(({ title: cardTitle }, key) => (
          <KanbanCard title={cardTitle} key={key} index={key} parent={title} />
        ))}
      </div>
    </div>
  );
}

export default KanbanLane;
