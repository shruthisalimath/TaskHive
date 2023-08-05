import React from 'react';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_PROJECTS } from '../utils/queries';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';

import {DndContext} from '@dnd-kit/core';

import ProjectList from '../components/ProjectList';
import Sidebar from '../components/SideBar';
import DraggableCard from '../components/DraggableCard';
import DroppableZone from '../components/DroppableZone';


const Project = () => {

// variables and functions------------------

  // routing variables
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });
  //pulls in project data based on url
  const project = data?.project || {};

  // Containers for the drop zones
  const containers = ['To Do', 'In Progress', 'Done'];
  const [parent, setParent] = useState(null);

  const draggableMarkup = (
    <DraggableCard id="draggable"><span></span></DraggableCard>
  );

  // If the item is dropped over a container, set it as the parent otherwise reset the parent to `null`
  function handleDragEnd(event) {
    const {over} = event;
    setParent(over ? over.id : null);
  }

//JSX----------------------------------

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header">
        {project.name} is the name of this project.
      </h2>

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <h2>Tasks</h2>
        <div className="task-area">
          {/* <Project projects={projects}/> */}
          <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            {containers.map((id) => (
              // We updated the Droppable component so it would accept an `id`
              // prop and pass it to `useDroppable`
              <DroppableZone key={id} id={id}>
                {parent === id ? 
                  draggableMarkup : id}
              </DroppableZone>
            ))}
    </DndContext>
          </div>
      </div>

    </div>
  );
};

export default Project;
