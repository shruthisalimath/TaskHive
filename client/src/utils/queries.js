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
                    assignedTo
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
            assignedTo {
                _id
                firstName
                lastName
                email
            }
        }
    }
`;