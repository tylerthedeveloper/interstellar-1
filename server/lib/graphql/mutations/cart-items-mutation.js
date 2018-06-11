import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";

import CartItemType from "../types/cart-item";
import CartService from "../../services/cart.service";

export default {
    addToCart : { 
        type: CartItemType,
        args: { 
            productID: { type: new GraphQLNonNull(GraphQLID) },
            // todo: add more props ...
            quantityPurchased: { type: GraphQLInt },
            selectedAsset: { type: GraphQLString },
        },
        resolve(parentValue, args, context) {
            return CartService.addToCart(context.session.currentUserID, args);
        }
    },
    removeFromCart: {
        type: CartItemType,
        args: { cartItemID: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { cartItemID }, context) {
            return CartService.removeFromCart(context.session.currentUserID, cartItemID);
        }
    },
    // emptyCart: {
        // CartService.
    // }
}