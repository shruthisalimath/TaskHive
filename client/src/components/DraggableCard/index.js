import React from 'react';
import {useDraggable} from '@dnd-kit/core';


export default function DraggableCard(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = 
    transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      cursor: 'grabbing'
    } : 
    {
      backgroundColor: 'var(--secondary-color)',
      cursor: 'grab',
    };
  
  return (
    <div ref={setNodeRef} className="task-card" style={style} {...listeners} {...attributes}>
      {props.children}
      <h1>Draggable Card</h1>
    </div>
  );
}