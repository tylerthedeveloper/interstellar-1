import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import ChatThreadType from "../types/chat-thread";
import ChatMessageType from "../types/chat-message";
import ChatService from "../../services/chat.service";

export default {
    chatThreads: {
        type: new GraphQLList(ChatThreadType),
        args: { userID: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { userID }, context) {
            const _userID = (context.session.currentUserID) ? context.session.currentUserID  : userID;
            console.log(_userID)
            return ChatService.getMyChats(_userID);
        }
    },
    chatThread: {
        type: ChatThreadType,
        args: {             
            chatThreadID: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parentValue, { chatThreadID }, context) {
            return ChatService.getChatThread(chatThreadID);
        }
    },
    chatMessages: {
        type: new GraphQLList(ChatMessageType),
        args: {             
            // userID: { type: new GraphQLNonNull(GraphQLID) },
            chatThreadID: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parentValue, { chatThreadID }, context) {
            return ChatService.getMessagesForChat(chatThreadID);
        }
    }
};
