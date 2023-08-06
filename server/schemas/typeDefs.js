const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    projects: [Project]!
    
}

type Project {
        _id: ID!
        name: String
        description: String
        startDate: String
        endDate: String
        tasks: [Task]!
    }

    type Task {
        _id: ID!
        name: String
        comment: String
        status: String
        dueDate: String
        projectName: Project
    }

    
    type Query {
        users: [User]
        user(userId: ID!): User
        projects: [Project]
        project(projectId: ID!): Project
        tasks: [Task]
        task(taskId: ID!): Task
        
    }

    type Mutation {
        
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): User
        updateUser(userId: ID!, firstName: String, lastName: String, email: String, password: String): User
        deleteUser(userId: ID!): ID

        addProject(userId: ID!, name: String!, description: String, startDate: String, endDate: String): Project
        updateProject(projectId: ID!, name: String, description: String, startDate: String, endDate: String): Project
        deleteProject(projectId: ID!): ID
        
        addTask( projectId: ID!, name: String!, comment: String, status: String, dueDate: String, projectName: ID ): Task
        updateTask(taskId: ID!, name: String, comment: String, status: String, dueDate: String, projectName: ID): Task
        deleteTask(taskId: ID!): ID
    }
    `;

    module.exports = typeDefs;