const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Project {
        _id: ID!
        name: String!
        description: String
        startDate: String
        endDate: String
        tasks: [Task]
        users: [User]
    }

    type Task {
        _id: ID!
        name: String!
        comment: String
        status: String
        dueDate: String
        project: Project
        assignedTo: User
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        projects: [Project]
        tasks: [Task]
    }

    type Query {
        projects: [Project]
        project(projectId: ID!): Project
        tasks: [Task]
        task(taskId: ID!): Task
        users: [User]
        user(userId: ID!): User
    }

    type Mutation {
        addProject(name: String!, description: String, startDate: String, endDate: String): Project
        updateProject(projectId: ID!, name: String, description: String, startDate: String, endDate: String): Project
        deleteProject(projectId: ID!): Project
        addTask(name: String!, comment: String, status: String, dueDate: String, project: ID!, assignedTo: ID!): Task
        updateTask(taskId: ID!, name: String, comment: String, status: String, dueDate: String, project: ID, assignedTo: ID): Task
        deleteTask(taskId: ID!): Task
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): User
        updateUser(userId: ID!, firstName: String, lastName: String, email: String, password: String): User
        deleteUser(userId: ID!): User
    }
    `;

    module.exports = typeDefs;