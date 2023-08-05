import React from 'react';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { QUERY_PROJECTS } from '../utils/queries';


import ProjectList from '../components/ProjectList';
import Sidebar from '../components/SideBar';
import DraggableCard from '../components/DraggableCard';
import DroppableZone from '../components/DroppableZone';
import {DndContext} from '@dnd-kit/core';

const Home = () => {
    const { loading, data } = useQuery(QUERY_PROJECTS);
    const projects = data?.projects || [];

    const containers = ['A', 'B', 'C'];
    const [parent, setParent] = useState(null);

    const draggableMarkup = (
      <DraggableCard id="draggable">Drag me</DraggableCard>
    );
    function handleDragEnd(event) {
      const {over} = event;
  
      // If the item is dropped over a container, set it as the parent
      // otherwise reset the parent to `null`
      setParent(over ? over.id : null);
    }

    return (
      <main>
        <div className="col-12 col-md-10 my-3">
          {/* <Project projects={projects}/> */}
          <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            {containers.map((id) => (
              // We updated the Droppable component so it would accept an `id`
              // prop and pass it to `useDroppable`
              <DroppableZone key={id} id={id}>
                {parent === id ? draggableMarkup : 'Drop here'}
              </DroppableZone>
            ))}
    </DndContext>
          </div>
        <div className="col-4 my-3 d-flex">
          <Sidebar projects={projects}/>
          <div className="col-12 col-md-10 my-3">
            {loading ? (
              <div>Loading...</div>
            ) : ( 
              <ProjectList
                projects={projects}
              />
            )}
          </div>
        </div>
      </main>
    );  
};

export default Home;