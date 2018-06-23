import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} from "graphql";
import UserType from "../types/user";
import UserService from "../../services/user.service";


const ChatThreadType = new GraphQLObjectType({
    name:  'OrderType',
    fields: () => ({
        orderID: { type: GraphQLID },
        user: { 
            type: UserType,
            resolve(parentValue, args, context) {
                return UserService.getUserById(parentValue.user)
            }
        },
        orderTimestamp: { type: GraphQLString },
        
        //transactionsGroups: [TransactionGroup]

    })
});

export default ChatThreadType;
