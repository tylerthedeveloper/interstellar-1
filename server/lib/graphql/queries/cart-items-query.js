import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import CartItemType from "../types/cart-item";
import CartService from "../../services/cart.service";

export default {
    cart: {
        type: new GraphQLList(CartItemType),
        resolve(parentValue, args, context) {
            if (context.session.currentUserID) return CartService.getMyCart(context.session.currentUserID);
            else if (context.session.cart) return context.session.cart;
            else return;
        }
    }
};
