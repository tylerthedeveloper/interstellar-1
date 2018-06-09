const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = graphql;
const ProductType = require("./product");
const axios = require("axios");

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLID) },
        id: { type: GraphQLString },
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
                const parentID = parentValue.id;
                console.log(parentID);
                // todo: Change to user-products
                return axios
                    .get(
                        `http://localhost:${PORT}/api/products/user-products/${parentID}`
                    )
                    .then((res) => res.data);
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

    type Query {
        users: [User]
        users(id: String!): User
    }

    type Mutation {
        updateUser (
            # need to dump all attributes
            currName: String!
            newName: String
        ): User
    
        addUser (
            # {props}
            name: String!
        ): User
    
        deleteUser(fbid: String!): User
    }
    
    type Subscription {
        userUpdated: User
        userAdded: User
        userDeleted: User
    }
`;

module.exports = schema;
*/
module.exports = UserType;
