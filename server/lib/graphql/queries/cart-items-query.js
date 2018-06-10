const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const ProductType = require("../types/product");
const CartService = require("../../services/cart.service")

module.exports = {
    cart: {
        type: new GraphQLList(ProductType),
        args: { userID: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { userID }, context) {
            return CartService.getMyCart(context.session.currentUserID || userID);
        }
    }
};
