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
import ChatService from "../../services/chat.service";
import UserType from "../types/user";

const ChatMessageType = new GraphQLObjectType({
    name:  'ChatMessageType',
    fields: () => ({
        chatMessageID: { type: GraphQLID },
        chatThreadID: { 
            type: ChatThreadType,
            resolve(parentValue, args, context) {
                return ChatService.getChatThread(parentValue.chatThreadID)
            }
        },
        sentAt: { type: GraphQLString }, // Date or timestring
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
        text: { type: GraphQLString },
    })
})
export default ChatMessageType;
