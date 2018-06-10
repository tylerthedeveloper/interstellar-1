const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } = graphql;
const UserType = require("../types/user");
const UserService = require("../../services/user.service")

module.exports = {
    addUser: {
        type: UserType,
        // todo: add more props
        args: { 
            userName: { type: GraphQLString },
            publicKey: { type: GraphQLString }
        },
        resolve(parentValue, args) {
            return UserService.createNewUser(args);
        }
    },
    deleteUser: {
        type: UserType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
            return UserService.deleteUser(id);
        }
    },
    updateUser: {
        type: UserType,
        // todo: add more props
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            userName: { type: GraphQLID },
            age: { type: GraphQLInt },
        },
        resolve(parentValue, args) {
            return UserService.updateUser(args);
        }
    }
};
