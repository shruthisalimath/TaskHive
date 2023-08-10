import React from 'react';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { QUERY_PROJECTS } from '../utils/queries';

import ProjectList from '../components/ProjectList';
import Sidebar from '../components/SideBar';
import Nav from '../components/Nav';
import Footer from "../components/Footer";

const Home = () => {
    const { loading, data } = useQuery(QUERY_PROJECTS);
    const projects = data?.projects || [];

    return (
      <main>
        <Nav/>
        <div className='homeContent'>
          <div className="sidebar">
            <Sidebar projects={projects}/>
          </div>
          <div className="project-area my-3">
            { loading ? 
              (
                <div>Loading...</div>
              ) : ( 
                <ProjectList projects={projects}/>
              )
            }
          </div>
        </div>
        <div className="footerContent">
          <Footer/>
        </div>
      </main>
    );  
};

export default Home;