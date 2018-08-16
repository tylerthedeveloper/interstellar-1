import gql from "graphql-tag";

export default gql`
    query GetUserInfo($userID: UUID!) {
        userById(id: $userID) {
            id
            website
            profilePicture
            displayName
            username
        }
    }
`;