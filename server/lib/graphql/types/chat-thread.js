import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";
import UserType from "../types/user";
import UserService from "../../services/user.service";
import ChatService from "../../services/chat.service";
import ChatMessageType from "./chat-message";

const ChatThreadType = new GraphQLObjectType({
    name:  'ChatThreadType',
    fields: () => ({
            chatThreadID: { type: new GraphQLNonNull(GraphQLID) },
            senderID: { 
                type: UserType,
                resolve(parentValue, args, context) {
                    return UserService.getUserById(parentValue.senderID)
                }
            },
            receiverID: { 
                type: UserType,
                resolve(parentValue, args) {
                    return UserService.getUserById(parentValue.receiverID)
                }
            },
            chatMessages: {
                type: new GraphQLList(ChatMessageType),
                resolve(parentValue, args) {
                    console.log(parentValue.chatThreadID)
                    return ChatService.getMessagesForChat("some user id", parentValue.chatThreadID)
                }
            }
        })
    });

export default ChatThreadType;
