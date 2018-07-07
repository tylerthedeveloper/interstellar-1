import gql from "graphql-tag";

/*********************************
* Queries
**********************************/

export const getCurrentUser =  gql`
    query {
        currentUser{
            id
            publicKey
            userName
            fullName
        }
    }
`;


/*********************************
 * Mutations
 *********************************/

export const logout = gql`
    mutation Logout{
        logout {
            id
        }
    }
`;

export const login = gql`
    mutation Login($publicKey: String!, $payload: String!, $signature: String!){
        login(publicKey: $publicKey, payload: $payload, signature: $signature){
            id,
            publicKey,
            userName,
            fullName,
            email,
            birthdate,
            age,
            address,
            isValidBuyer,
            isValidSeller,
            accountCreated
        }
    }
`;