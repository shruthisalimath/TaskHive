import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_PROJECTS } from '../utils/queries';
//import { QUERY_SINGLE_PROJECT } from '../utils/queries';

import ProjectList from '../components/ProjectList';
import Sidebar from '../components/SideBar';
//import Project from '../components/Project';

const Home = () => {
    const { loading, data } = useQuery(QUERY_PROJECTS);
    const projects = data?.projects || [];

    return (
      <main>
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
          <div className="col-12 col-md-10 my-3">
            {/* <Project projects={projects}/> */}
          </div>
        </div>
      </main>
    );  
};

export default Home;