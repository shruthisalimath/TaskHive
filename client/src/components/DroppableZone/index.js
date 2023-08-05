import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function DroppableZone(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'magenta' : undefined,
    height: '100px',
    backgroundColor: isOver? 'white' : 'gray',
  };

  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

