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
        id: { type: new GraphQLNonNull(GraphQLID) },
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
        products: {
            type: new GraphQLList(ProductType) ,
            resolve(parentValue, args) {
                console.log(parentValue.id)
                const parentID = parentValue.id;
                return axios.get(`http://localhost:3000/products?userID=${parentID}`)
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
