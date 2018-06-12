import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";

import ProductType from "./product";
import ProductService from "../../services/product.service";

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLID) },
        id: { type: GraphQLID },
        publicKey: { type: GraphQLString },
        userName: { type: GraphQLString },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        birthdate: { type: GraphQLString },
        age: { type: GraphQLInt },
        address: { type: GraphQLString }, // ... ???
        isValidBuyer: { type: GraphQLBoolean },
        isValidSeller: { type: GraphQLBoolean },
        accountCreated: { type: GraphQLString },
        address: { type: GraphQLString },
        numberOfItemsSold: { type: GraphQLInt },
        myProducts: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args) {
                return ProductService.getProductsByUserID(parentValue.id);
            }
        }
    })
});
// acceptedAssets: [AssetBalance]

/*
const schema = `
    type User {
        id: String
        userName: String
        fullName: String
        email: String
        birthdate: String
        age: Int
        address: String
        # stellar
        publicKey: String
        # todo: ...
        isValidBuyer: Boolean
        isValidSeller: Boolean
        # todo: ...
        accountCreated: String
        numberOfItemsSold: Int
        acceptedAssets: [AssetBalance]
    }
`;
*/
export default UserType;
