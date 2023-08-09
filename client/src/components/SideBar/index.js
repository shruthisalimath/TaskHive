import React from "react";
import { Link } from "react-router-dom";


const SideBar = ({projects}) => {
    console.log(projects)
    return (
        <aside className="sidebar-items">
            {/* <h2>Options</h2>
            <div className="sidebar-option">
                <Link className='link new-project' to='/projects'> Create Project</Link>
                <Link className='link new-project' to='/projects'> Delete Project </Link>
            </div> */}
            <h2>Projects</h2>
            <ul>
                {projects && projects.map((project) => (
                    <li key={project._id}>
                        <Link className="link" to={`/projects/${project._id}`}>
                            <span >{project.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default SideBar;