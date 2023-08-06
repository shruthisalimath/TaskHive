import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function DroppableZone(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'var(--background-dark)' : undefined,
    height: '100px',
    backgroundColor: isOver? 'white' : 'var(--background-light)',
    border: isOver ? '1px solid var(--secondary-color)' : '1px solid var(--background-dark)', 
    display: 'flex-column',
    background: 'var(--background-light)',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: '30%',
  };

  return (
      <div ref={setNodeRef} style={style}>
        {props.children}
      </div>
  );
}

