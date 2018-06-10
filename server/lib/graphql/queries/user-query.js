const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require("../types/user");
const UserService = require("../../services/user.service")

module.exports = {
    users: {
        type: new GraphQLList(UserType),
        resolve() {
            return UserService.getAllUsers();
        }
    },
    user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }) {
            return UserService.getUserByUserId(id);
        }
    }
};
