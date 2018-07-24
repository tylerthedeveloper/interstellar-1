import gql from "graphql-tag";

export default gql`
    mutation UpdateProfilePic($userID: UUID!, $file: Upload!) {
        updateUserById(input:{id: $userID, userPatch: {profilePicture: $file}}){
            user {
                id
                profilePicture
            }
        }
    }
`;