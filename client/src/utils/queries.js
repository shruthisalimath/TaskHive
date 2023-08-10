import { gql } from '@apollo/client';


export const QUERY_PROJECTS = gql`
    query projects {
        projects {
            _id
            name
            description
            startDate
            endDate
            tasks {
                _id
                name
                comment
                status
                dueDate
            }
        }
    }
`;


export const QUERY_SINGLE_PROJECT = gql`
  query singleProject($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      name
      tasks {
        _id
        name
        comment
        status
        dueDate
        projectId
      }
    }
  }
`;


export const QUERY_USERS = gql`
    query users {
        users {
            _id
            firstName
            lastName
            email
            projects {
                _id
                name
                description
                startDate
                endDate
                tasks {
                    _id
                    name
                    comment
                    status
                    dueDate
                   
                }
            }
        }
    }
`;


export const QUERY_TASKS = gql`
    query tasks {
        tasks {
            _id
            name
            comment
            status
            dueDate
            project {
                _id
                name
                description
                startDate
                endDate
            }
        }
    }


`;


export const QUERY_ME = gql `
query Me {
    me {
        _id
        firstName
        lastName
        email
        projects {
            _id
            name
            description
            startDate
            endDate
            tasks {
                _id
                name
                comment
                status
                dueDate
               
            }
        }
    }
}
`;