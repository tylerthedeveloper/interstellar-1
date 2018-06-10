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
import { addToCart as _addToCart, removeFromCart as _removeFromCart } from "../../services/cart.service";

export default {
    addToCart : { 
        type: CartItemType,
        args: { 
            userID: { type: new GraphQLNonNull(GraphQLID) },
            productID: { type: new GraphQLNonNull(GraphQLID) },
            // sellerID: { type: new GraphQLNonNull(GraphQLID) },
            
            // todo: add more props ...
            quantityPurchased: { type: GraphQLInt },
            selectedAsset: { type: GraphQLString },
        },
        resolve(parentValue, args, context) {
            // include context.session.currentUserID
            const userID = context.session.currentUserID;
            return _addToCart(userID, args);
        }
    },
    removeFromCart: {
        type: CartItemType,
        args: { 
            userID: { type: new GraphQLNonNull(GraphQLID) },
            cartItemID: { type: new GraphQLNonNull(GraphQLID) }
         },
        resolve(parentValue, { userID, cartItemID }, context) {
            // include context.session.currentUserID
            const _userID = context.session.currentUserID || userID;
            return _removeFromCart(_userID, cartItemID);
        }
    },
    // emptyCart: {

    // }
}