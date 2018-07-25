import gql from "graphql-tag";

export default gql`
    query GetAllProductInfo($productID: UUID!) {
        productById(id: $productID) {
            id
            name
            usdCost
            shortDescription
            description
            userBySellerId{
                id
                displayName
                username
                profilePicture
            }
            productCategoryByCategory{
                id
                name
            }
        }
    }
`;