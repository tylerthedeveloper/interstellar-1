const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require("../types/user");
const axios = require("axios");

module.exports = {
    users: {
        type: new GraphQLList(UserType),
        resolve() {
            //   return axios.get(`https://firestore.googleapis.com/v1beta1/projects/galactic-storage/databases/(default)/documents/users/`)
            return axios
            // .get(`http://localhost:3000/users/`)
            .get(`http://localhost:4000/api/users`)
                .then((res) => res.data);
        }
    },
    user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }) {
            return axios
                .get(`http://localhost:4000/api/users/${id}`)
                .then((res) => res.data);
        }
    }
};
