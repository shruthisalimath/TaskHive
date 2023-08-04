import React from 'react';

const ProjectList = ({projects}) => {
  console.log(projects);
  if (projects.length <= 0) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">Home</h3>
      <div className="flex-row justify-space-between my-4">
        {projects && projects.map((project) => (
            <div key={project._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {project.name} <br />
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
