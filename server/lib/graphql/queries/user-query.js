import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import UserType from "../types/user";
import UserService from "../../services/user.service";

export default {
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
            return UserService.getUserById(id);
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
            if (!context.session.currentUserID) return null;
            else return UserService.getUserById(context.session.currentUserID);
        }
    }
};
