import React from "react";
import { Link } from "react-router-dom";


const SideBar = ({projects}) => {
    console.log(projects)
    return (
        <aside className="aside">
          <h3>Dashboard Controls (this will be a side bar on the left)</h3>
            <ul>
                {projects && projects.map((project) => (
                    <li key={project._id}>
                        <Link to={`/projects/${project._id}`}>
                            <span>{project.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <hr></hr>
            <hr></hr>
        </aside>
    );
}

export default SideBar;