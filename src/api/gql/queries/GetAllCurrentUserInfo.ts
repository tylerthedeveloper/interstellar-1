import gql from "graphql-tag";

export default gql`
    query GetAllCurrentUserInfo {
        currentUser {
            id
            website
            profilePicture
            displayName
            username
        }
    }
`;