import  {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} from "graphql";
import UserType from "../types/user";
import UserService from "../../services/user.service";
import ChatService from "../../services/chat.service";
import ChatMessageType from "./chat-message";

const ChatThreadType = new GraphQLObjectType({
    name:  'ChatThreadType',
    fields: () => ({
        // chatThreadID: { type: new GraphQLNonNull(GraphQLID) },
        chatThreadID: { type: GraphQLID },
        chatPerson1: { 
            type: UserType,
            resolve(parentValue, args, context) {
                return UserService.getUserById(parentValue.chatPerson1)
            }
        },
        chatPerson2: { 
            type: UserType,
            resolve(parentValue, args) {
                return UserService.getUserById(parentValue.chatPerson2)
            }
        },
        chatMessages: {
            type: new GraphQLList(ChatMessageType),
            resolve(parentValue, args) {
                console.log(parentValue.chatThread)
                return ChatService.getMessagesForChat("some user id", parentValue.chatThreadID)
            }
        }
    })
});

export default ChatThreadType;
