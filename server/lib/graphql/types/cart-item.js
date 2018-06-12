import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";

import ProductService from "../../services/product.service";
import ProductType from "../types/product";
import UserType from "../types/user";


const CartItemType = new GraphQLObjectType({
    name: "CartItemType",
    fields: () => ({
        // cartItemID: { type: new GraphQLNonNull(GraphQLID) },
        cartItemID: { type: GraphQLID },
        timestamp: { type: GraphQLString },
        buyer: {
            type: UserType,
            // args: { buyerUserID: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, args) {
                return UserService.getUserById(parentValue.buyerUser);
            }
        },
        // todo: Optional, we can get from product
        // sellerUserID: {
        //     type: UserType,
        //     args: { sellerUserID: { type: new GraphQLNonNull(GraphQLID) } },
        //     resolve(parentValue, { sellerUserID }) {
        //         return UserService.getUserById(sellerUserID);
        //     }
        // },
        product: { 
            type: ProductType,
            resolve(parentValue, args) {
                return ProductService.getProductById(parentValue.product);
            }
        },
        quantityPurchased: { type: GraphQLInt },

        // group these 2 
        selectedAsset: { type: GraphQLString }, 
        assetPurchaseDetails: { type: GraphQLString }, // .. 
       
    //    isInCheckout: { type: GraphQLBoolean },
    //    isPaidFor: { type: GraphQLBoolean }
    })
});

export default CartItemType;
