import React from "react";
import { Link } from "react-router-dom";
import { QUERY_PROJECTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const SideBar = () => {
    const { loading, data } = useQuery(QUERY_PROJECTS);
    const projects = data?.projects || [];

    return (
        <aside className="sidebar-items">
            <h2>Projects</h2>
            <ul>
                {loading ? (
                    <li>Loading...</li>
                ) : (
                    projects.map((project) => (
                        <li key={project._id}>
                            <Link className="link" to={`/projects/${project._id}`}>
                                <span>{project.name}</span>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </aside>
    );
}

export default SideBar;