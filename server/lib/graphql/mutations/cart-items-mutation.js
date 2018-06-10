const graphql = require("graphql");
const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } = graphql;
const CartItemType = require("../types/cart-item");
const CartService = require("../../services/cart.service")

module.exports = {
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
            return CartService.addToCart(userID, args);
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
            return CartService.removeFromCart(_userID, cartItemID);
        }
    },
    // emptyCart: {

    // }
}