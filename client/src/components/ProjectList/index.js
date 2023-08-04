import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({projects}) => {
  console.log(projects);
  if (projects.length <= 0) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      <h1 className="text-primary">Home</h1>
      <div className="flex-row justify-space-between my-4">
        <h2>Your Projects</h2>
        {projects && projects.map((project) => (
          
            <div key={project._id} className="col-12 col-xl-6">
              <hr></hr>
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  Project Name: {project.name} <br />
                </h4>
                <h4 className="card-header bg-dark text-light p-2 m-0">Project Description: {project.description}</h4>
                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/projects/${project._id}`}
                >
                  View project.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
