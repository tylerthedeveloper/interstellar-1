import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
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
        phone: { type: GraphQLInt },
        email: { type: GraphQLString },
        birthdate: { type: GraphQLString },
        age: { type: GraphQLInt },
        
        // ... ???
        address: { type: GraphQLString }, 
        
        isValidBuyer: { type: GraphQLBoolean },
        isValidSeller: { type: GraphQLBoolean },
        accountCreated: { type: GraphQLString },
        numberOfItemsSold: { type: GraphQLInt },

        // acceptedAssets: [AssetBalance]

        myProducts: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args) {
                return ProductService.getProductsByUserID(parentValue.id);
            }
        }
    })
});

export default UserType;
