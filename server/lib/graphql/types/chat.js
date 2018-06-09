const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = graphql;

/*
const UserType = new GraphQLObjectType({
  name:  'ChatThread',
  fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        birthdate: { type: GraphQLString },
        age: { type: GraphQLInt }, 
    })
});

export class ChatMessage {

    messageid: string;
    sentAt: Date;
    isRead: boolean;
    sender: string;
    reciever: string;
    // sender: ChatUser;
    // reciever: ChatUser;
    text: string;
    // thread: ChatThread;
    chatThreadID: string;

    export class ChatThread {

        chatThreadID: string;
    
        senderFbID: string;
        senderPublicKeyFbID: string;
    
        receiverFbID: string;
        receiverPublicKeyFbID: string;
*/
module.exports = UserType;
