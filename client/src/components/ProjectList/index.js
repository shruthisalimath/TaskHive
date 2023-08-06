import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({projects}) => {
  console.log(projects);
  if (projects.length <= 0) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        <h2>Your Projects</h2>
        <div className="flex-row">
          {projects && projects.map((project) => (
            
              <div key={project._id} className="">
                <div className="card">
                  <Link
                    className="dark-link"
                    to={`/projects/${project._id}`}
                  >
                    {project.name}
                  </Link>
                  <h4 className="">Project Description: {project.description}</h4>
                  
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default ProjectList;
