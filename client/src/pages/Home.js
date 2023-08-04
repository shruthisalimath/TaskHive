import React from 'react';
import { useQuery } from '@apollo/client';

import ProjectList from '../components/ProjectList';

import { QUERY_PROJECTS } from '../utils/queries';


const Home = () => {
    const { loading, data } = useQuery(QUERY_PROJECTS);
    const projects = data?.projects || [];
    return (
      <div className="col-12 col-md-10 my-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ProjectList
            projects={projects}
          />
        )}
      </div>
    );  
};

export default Home;