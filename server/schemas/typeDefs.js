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
    `;

    module.exports = typeDefs;