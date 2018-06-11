import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import ProductType from "../types/product";
import CartService from "../../services/cart.service";

export default {
    cart: {
        type: new GraphQLList(ProductType),
        resolve(parentValue, args, context) {
            console.log("contxt ")
            return CartService.getMyCart(context.session.currentUserID);
        }
    }
};
