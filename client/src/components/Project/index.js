import React from 'react';

const Project = () => {
    //const { name, tasks } = project;

    return (
        <div className="col-12 col-xl-6">
            <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                    Project: NAME <br />
                </h4>
                <h4 className="card-header bg-dark text-light p-2 m-0">task: TASK LIST</h4>
            </div>
        </div>
    );
};

export default Project;

// a single project is passed into this component from the ProjectList component
// test project id = 64cc5b703b048340f8be464b

// the project is destructured into its id, name property, tasks property

// the _id is used to create a link to the single project page
// the name is displayed as the title of the project

// the tasks property is an array of tasks associated with the project
    //there are 3 task arrays: toDo, inProgress, and completed
    //each task array is mapped over and the task name is displayed

// the description is displayed as the description of the project

// the deleteProject function is called when the delete button is clicked

// There are 3 columns: toDo, inProgress, and completed
// each column has a header with the name of the column
// each column has a button to add a task to the column
// each column has at least one card, if there are no tasks, the first card will display "No tasks yet" or just an add task button

// each card has a header with the name of the task and an edit button
// The card is a form that allows the user to edit the task name, if the user wants to edit more than just the name, the edit button will take the user to a new page or open a modal.

// each card has drag and drop functionality that allows the user to move the card to another column
// each card has a delete button that calls the deleteTask function when clicked