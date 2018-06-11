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
            // todo populated from context
            senderID: { type: new GraphQLNonNull(GraphQLID) },
            receiverID: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parentValue, { senderID, receiverID }, context) {
            return ChatService.createChatThread(context.session.currentUserID || senderID, receiverID);
        }
    },
    deleteChatThread: {
        type: ChatThreadType,
            // todo populated from context        
        args: {             
                senderID: { type: new GraphQLNonNull(GraphQLID) },
                chatThreadID: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parentValue, { senderID, chatThreadID }, context) {
            return ChatService.deleteChatThread(context.session.currentUserID || senderID, chatThreadID);
        }
    },
    addMessageToThread: {
        type: ChatMessageType,
        args: {
            chatThreadID: { type: new GraphQLNonNull(GraphQLID) },
            chatMessageID: { type: new GraphQLNonNull(GraphQLID) },
            senderID: { type: new GraphQLNonNull(GraphQLID) },
            receiverID: { type: new GraphQLNonNull(GraphQLID) },
            receiverID: { type: new GraphQLNonNull(GraphQLString) },
            // todO: Date or timestring from here or server ??
            sentAt: { type: GraphQLString }, 
         },
        resolve(parentValue, args, context) {
            return ChatService.addMessageToThread(context.session.currentUserID, args);
        }
    }
    // markMessageAsRead: {}
}