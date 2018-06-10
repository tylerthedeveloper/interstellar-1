import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import ProductType from "../types/product";
import { getMyCart } from "../../services/cart.service";

export default {
    cart: {
        type: new GraphQLList(ProductType),
        args: { userID: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { userID }, context) {
            return getMyCart(context.session.currentUserID || userID);
        }
    }
};
