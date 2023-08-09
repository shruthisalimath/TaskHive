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
  mutation addProject($userId: ID!, $projectName: String!, $projectDescription: String!, $startDate: String, $endDate: String) {
    addProject(
      userId: $userId
      name: $projectName
      description: $projectDescription
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      name
      description
      startDate
      endDate
     
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
    $name: String!
    $description: String!
    $tasks: [ID]
    $users: [ID]
  ) {
    updateProject(
      projectId: $projectId
      name: $projectName
      description: $projectDescription
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

export const ADD_TASK = gql`
  mutation addTask(
    $name: String!,
    $comment: String,
    $status: String,
    $dueDate: String,
    $projectId: ID!,
  ) {
    addTask(
      name: $name,
      comment: $comment,
      status: $status,
      dueDate: $dueDate,
      projectId: $projectId,
    ) {
      _id
      name
      comment
      status
      dueDate
      projectId
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask(
    $taskId: ID!,
    $name: String,
    $comment: String,
    $status: String,
    $dueDate: String,
    $projectId: ID,
    $assignedTo: ID
  ) {
    updateTask(
      taskId: $taskId,
      name: $name,
      comment: $comment,
      status: $status,
      dueDate: $dueDate,
      projectId: $projectId,
      assignedTo: $assignedTo
    ) {
      _id
      name
      comment
      status
      dueDate
      project {
        _id
        name
      }
      assignedTo {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation removeTask($taskId: ID!) {
    removeTask(taskId: $taskId) {
      _id
      name
    }
  }
`;