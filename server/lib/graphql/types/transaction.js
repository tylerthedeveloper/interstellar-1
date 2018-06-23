const schema = `
    enum OrderType {
        Purchase, #= "Purchase",
        Sale #= 'Sale'
    }
    type TransactionPaymentDetails {
        senderPublicKey: String!
        receiverPublicKey: String!
        assetBalance: [AssetBalance]
        memo: String!
    }
    type TransactionGroup {
        transactionGroupID: String!
        sellerPublicKey: String!
        timestamp: String!
        transactionRecords: [TransactionRecord]
        transactionPaymentDetails: TransactionPaymentDetails
        isPaidFor: Boolean
    }
`;

import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
} from "graphql";
import UserType from "../types/user";
import ProductType from "./product";
import UserService from "../../services/user.service";

const TransactionRecordType = new GraphQLObjectType({
    name:  'TransactionRecordType',
    fields: () => ({
        transactionRecordID: { type: GraphQLID },
        buyer: { 
            type: UserType,
            resolve(parentValue, args, context) {
                return UserService.getUserById(parentValue.user)
            }
        },
        product: { 
            type: ProductType,
            resolve(parentValue, args, context) {
                return UserService.getUserById(parentValue.user)
            }
        },
        quantityPurchased: { type: GraphQLInt },
        transactionRecordTimestamp: { type: GraphQLString },
        
        // ???
        orderType: { type: GraphQLString },
        
        // ???
        memo: { type: GraphQLString },

        // ???
        assetPurchaseDetails: AssetBalance

    })
});

export default ChatThreadType;
