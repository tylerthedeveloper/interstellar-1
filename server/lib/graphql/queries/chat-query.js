import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import { ChatThreadType, ChatMessageType } from "../types/chat";
import CartService from "../../services/cart.service";

export default {
    chats: {
        type: new GraphQLList(ChatThreadType),
        args: { userID: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { userID }, context) {
            return CartService.getMyCart(context.session.currentUserID || userID);
        }
    },
    chatMessages: {
        type: new GraphQLList(ProductType),
        args: { userID: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { userID }, context) {
            return CartService.getMyCart(context.session.currentUserID || userID);
        }
    }
};
