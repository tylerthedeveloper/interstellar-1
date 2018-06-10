const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;
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
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
            return UserService.getUserByUserId(id);
        }
    },
    // todo: group or change name
    userPublicKey: {
        type: UserType,
        args: { publicKey: { type: new GraphQLNonNull(GraphQLString) } },
        resolve(parentValue, { publicKey }) {
            return UserService.getUserByUserPublicKey(publicKey);
        }
    },
    currentUser : {
        type: UserType,
        resolve(user, args, context) {
            if(!context.session.userID) return null;
            else return getUserByUserId(context.session.userID);
        }
    }
};
