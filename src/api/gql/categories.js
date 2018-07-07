import gql from 'graphql-tag';


/*********************************
 * Queries
 *********************************/

export const getCategoryInfo =  gql`
    query {
        categories{
            id
            category
            description
            numberOfProducts
        }
    }
`;