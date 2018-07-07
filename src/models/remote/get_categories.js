import gql from 'graphql-tag';


export default gql`
    query {
        categories{
            id
            category
            description
            numberOfProducts
        }
    }
`;