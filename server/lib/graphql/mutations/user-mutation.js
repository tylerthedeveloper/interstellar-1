const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const UserType = require("../types/user");
const UserService = require("../../services/user.service")
// const axios = require("axios");

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
            return axios
                .delete(`http://localhost:3002/users/${id}`)
                .then((res) => res.data);
        }
    },
    updateUser: {
        type: UserType,
        // todo: add more props
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            userName: { type: GraphQLID }
        },
        resolve(parentValue, args) {
            return axios
                .patch(`http://localhost:3002/users/${args.id}`, args)
                .then((res) => res.data);
        }
    }
};
