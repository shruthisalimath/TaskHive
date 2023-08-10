import React from 'react';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_PROJECTS } from '../utils/queries';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import KanbanCard from '../components/KanbanCard';
import TaskBoard from '../components/TaskBoard';

import {DndContext} from '@dnd-kit/core';

import ProjectList from '../components/ProjectList';
import Nav from '../components/Nav';
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
      <Nav />
      <div className='homeContent'>
      <div className="sidebar">
        <Sidebar />
      </div>
      <TaskBoard />
      </div>
      </div>

  );
};

export default Project;
