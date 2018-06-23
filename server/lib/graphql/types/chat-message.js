import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} from "graphql";
import ChatThreadType from "../types/chat-thread";
import ChatService from "../../services/chat.service";
import UserType from "../types/user";

const ChatMessageType = new GraphQLObjectType({
    name:  'ChatMessageType',
    fields: () => ({
        chatMessageID: { type: GraphQLID },
        chatThread: { 
            type: ChatThreadType,
            resolve(parentValue, args, context) {
                return ChatService.getChatThread(parentValue.chatThread)
            }
        },
        sentAt: { type: GraphQLString }, // Date or timestring
        sender: { 
            type: UserType,
            resolve(parentValue, args, context) {
                return UserService.getUserById(parentValue.sender)
            }
        },
        receiver: { 
            type: UserType,
            resolve(parentValue, args) {
                return UserService.getUserById(parentValue.receiver)
            }
        },
        text: { type: GraphQLString },
    })
})
export default ChatMessageType;
