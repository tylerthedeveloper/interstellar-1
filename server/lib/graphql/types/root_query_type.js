const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require('./user');
const LyricType = require('./lyric_type');
// const Lyric = mongoose.model('lyric');
// const Song = mongoose.model('song');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    products: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/products/${args.id}`)
            .then(res => res.data);
        }
    },
    product: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } }, // STRING OR ID
      resolve(parentValue, { id }) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
            .then(res => res.data);
      }
    },
    users: {
        type: new GraphQLList(UserType),
        resolve(parentValue, args) {
          return axios.get(`http://localhost:3000/users/${args.id}`)
              .then(res => res.data);
          }
      },
      user: {
        type: UserType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } }, // STRING OR ID
        resolve(parentValue, { id }) {
          return axios.get(`http://localhost:3000/users/${args.id}`)
              .then(res => res.data);
        }
      },
  })
});

module.exports = RootQuery;
