import gql from "graphql-tag";

export default gql`
    query GetBasicProductInfo($productID: UUID!) {
        productById(id: $productID) {
            id
            name
            usdCost
            shortDescription
        }
    }
`;