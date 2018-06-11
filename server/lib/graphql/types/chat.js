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

const ChatThreadType = new GraphQLObjectType({
  name:  'ChatThreadType',
  fields: () => ({
        chatThreadID: { type: new GraphQLID },
        senderID: { 
            type: UserType,
            args: { userID: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { userID }, context) {
                return this.UserService.getUserByUserId(userID)
            }
        },
    // senderPublicKey: { type: GraphQLString },
        receiverID: { 
            type: UserType,
            args: { userID: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { userID }, context) {
                return this.UserService.getUserByUserId(userID)
            }
        },        
    // receiverPublicKey: { type: GraphQLString },
        // ChatMessages: 
        // resolve        
    })
});

const ChatMessageType = new GraphQLObjectType({
    name:  'ChatMessageType',
    fields: () => ({
        chatMessageID: { type: GraphQLID },
        chatThreadID: { type: GraphQLID },
        sentAt: { type: GraphQLString }, // Date or timestring
        senderID: { type: GraphQLString }, 
        receiverID: { type: GraphQLString }, 
        text: { type: GraphQLString }, 
      })
  });

  
export default { ChatThreadType, ChatMessageType }