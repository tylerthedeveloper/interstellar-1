import gql from "graphql-tag";

export default gql`
    mutation UpdateProductPic($productID: UUID!, $file: Upload!, $num: Int!) {
        updateProductImageByProductIdAndImageNum(
            input:{
                productId: $productID,
                imageNum: $num,
                productImagePatch:{
                    imageKey: $file
                }
            }
        ){
            productImage{
                imageKey
            }
        }
    }
`;