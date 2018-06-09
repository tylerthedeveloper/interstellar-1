const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const productMutation = require('./product-mutation');
const userMutation = require('./user-mutation');

const fields = () => ({
  ...productMutation,
  ...userMutation
  // ...sum
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: fields
});

module.exports = RootMutation;
