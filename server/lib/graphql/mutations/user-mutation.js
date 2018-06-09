const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const UserType = require("../types/user");
const axios = require("axios");

module.exports = {
    addUser: {
        type: UserType,
        // todo: add more props
        args: { userName: { type: GraphQLString } },
        resolve(parentValue, { userName }) {
            const user = Object.assign({ userName: userName });
            return axios.post(`http://localhost:3000/users`, user)
                .then((res) => res.data);
        }
    },
    deleteUser: {
        type: UserType,
        args: {  id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
            return axios.delete(`http://localhost:3000/users/${id}`)
                .then((res) => res.data);
        }
    },
    updateUser: {
        type: UserType,
        // todo: add more props
        args: {  
            id: { type: new GraphQLNonNull(GraphQLID) },
            userName: { type: GraphQLID },  
        },
        resolve(parentValue, args) {
            return axios.patch(`http://localhost:3000/users/${args.id}`, args)
                .then((res) => res.data);
        }
    }
};