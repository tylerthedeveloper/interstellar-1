import gql from "graphql-tag";

/*********************************
* Queries
**********************************/

export const getCurrentUser =  gql`
    query getCurrentUser{
        currentUser{
            id
        }
    }
`;


/*********************************
 * Mutations
 *********************************/

export const logout = gql`
    mutation Logout{
        logout
    }
`;

