import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($projectName: String!, $projectDescription: String!, $tasks: [ID], $users: [ID]) {
    addProject(
      projectName: $projectName
      projectDescription: $projectDescription
      tasks: $tasks
      users: $users
    ) {
      _id
      name 
      description 
      startDate
      endDate
      tasks {
        _id
        name
      }
      users {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
      name
      description
      startDate
      endDate
      tasks {
        _id
        name
      }
      users {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $projectId: ID!
    $projectName: String!
    $projectDescription: String!
    $tasks: [ID]
    $users: [ID]
  ) {
    updateProject(
      projectId: $projectId
      projectName: $projectName
      projectDescription: $projectDescription
      tasks: $tasks
      users: $users
    ) {
      _id
      name
      description
      startDate
      endDate
      tasks {
        _id
        name
      }
      users {
        _id
        firstName
        lastName
      }
    }
  }
`;
