const graphql = require('graphql');
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const UserType = require('../types/user');
const axios = require('axios');

module.exports = {
      addUser: {
        type: UserType,
        // todo: add more props
        args: { userName: { type: GraphQLString } },
        resolve(parentValue, { userName }) {
            const user = Object.assign({userName: userName});
            return axios.post(`http://localhost:3000/users`, user)
                .then(res => res.data);
        }
      }
}