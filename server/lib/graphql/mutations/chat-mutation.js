import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";

import ChatThreadType from "../types/chat-thread";
import ChatMessageType from "../types/chat-message";
import ChatService from "../../services/chat.service";

export default {
    createChatThread: { 
        type: ChatThreadType,
        args: { 
            chatPerson1: { type: new GraphQLNonNull(GraphQLID) },
            chatPerson2: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parentValue, args, context) {
            return ChatService.createChatThread(args);
        }
    },
    // todo: not sure if i want to allow this
    // deleteChatThread: {
    //     type: ChatThreadType,
    //     args: {             
    //             chatThreadID: { type: new GraphQLNonNull(GraphQLID) },
    //     },
    //     resolve(parentValue, { chatThreadID }, context) {
    //         return ChatService.deleteChatThread(chatThreadID);
    //     }
    // },
    addMessageToThread: {
        type: ChatMessageType,
        args: {
            chatThread: { type: new GraphQLNonNull(GraphQLID) },
            sender: { type: new GraphQLNonNull(GraphQLID) },
            receiver: { type: new GraphQLNonNull(GraphQLID) },
            text: { type: new GraphQLNonNull(GraphQLString) },
            // todO: Date or timestring from here or server ??
            sentAt: { type: GraphQLString }, 
         },
        resolve(parentValue, args, context) {
            return ChatService.addMessageToThread(args);
        }
    }
    // markMessageAsRead: {}
}