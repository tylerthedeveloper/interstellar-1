import gql from "graphql-tag";

export default gql`
    query GetCurrentUserId {
        currentUser {
            id
        }
    }
`;