import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

//import ProjectsList from '../components/ProjectsList';
//import SideBar from '../components/SideBar';

import { QUERY_SINGLE_PROJECT } from '../utils/queries';

const Project = () => {
  // Use `useParams()` to retrieve value of the route parameter `:projectId`
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    // pass URL parameter
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header">
        {project.name} is the name of this project.
      </h2>

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
      </div>
    </div>
  );
};

export default Project;
