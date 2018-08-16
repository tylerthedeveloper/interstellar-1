import gql from "graphql-tag";

export default gql`
    mutation CreateProductPic($productID: UUID!, $file: Upload!, $num: Int!) {
        createProductImage(input:{productImage: {
            productId: $productID,
            imageKey: $file,
            imageNum: $num
        }}){
            productImage{
                imageKey
                productId
                imageNum
            }
        }
    }
`;