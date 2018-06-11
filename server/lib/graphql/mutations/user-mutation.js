import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";
import UserType from "../types/user";
import UserService from "../../services/user.service";

export default {
    addUser: {
        type: UserType,
        // todo: add more props
        args: { 
            userName: { type: GraphQLString },
            publicKey: { type: GraphQLString }
        },
        resolve(parentValue, args) {
            return UserService.createUser(args);
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
    },
    login: {
        type: UserType,
        args: {
          payload: {type: GraphQLNonNull(GraphQLString)},
          publicKey: {type: GraphQLNonNull(GraphQLString)},
          signature: {type: GraphQLNonNull(GraphQLString)}
        },
        resolve(parent, {payload, publicKey, signature}, {session}){


            //only let the user through if they have the correct signature
            if(!UserService.verifySignature(publicKey, payload, signature))
                return null;


            return UserService.getUserByPublicKey(publicKey)

                //catch if the user does not exist and automatically create their account
                .catch((err) => {

                    //account creation step
                    if(err === 'no user'){
                        return UserService.createNewUser({publicKey: publicKey})
                            .then((id) => {
                                return UserService.getUserById(data)
                            })
                    }

                    //log but pass through all the other errors
                    console.log(err);
                    return null;

                //log the current user's ID on the session
                }).then((user) => {
                    if(user) session.currentUserID = user.id;
                    return user;
                })
        }
    },

    logout: {
        type: UserType,
        resolve(parent, args, {session}){
            delete session.currentUserID;
            return null;
        }
    }
};
