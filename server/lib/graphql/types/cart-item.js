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

        // resolves these
        buyerUserID: {
            type: UserType,
            args: { buyerUserID: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { buyerUserID }) {
                return UserService.getUserById(buyerUserID);
            }
        },
        sellerUserID: {
            type: UserType,
            args: { sellerUserID: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { sellerUserID }) {
                return UserService.getUserById(sellerUserID);
            }
        },

        productID: { 
            type: ProductType,
            resolve(parentValue, args) {
                return ProductService.getProductById(productID);
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
