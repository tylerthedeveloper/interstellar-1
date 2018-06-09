// https://github.com/tomyitav/graphql-server-seed
/*
    // const path = require('path');
    // const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
    const typesArray = fileLoader(path.join(__dirname, './types'), { recursive: true });
    const resolversArray = fileLoader(path.join(__dirname, '../resolvers'));
    const allTypes = mergeTypes(typesArray);
    // const allResolvers = mergeResolvers(resolversArray);
    const schema = makeExecutableSchema({
        typeDefs: allTypes,
        // resolvers: allResolvers
    });

    module.exports = schema;
*/

const graphql = require("graphql");
const axios = require("axios");
const { makeExecutableSchema, mergeSchemas } = require("graphql-tools");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const RootQuery = require("./queries/root-query.js");
const RootMutation = require("./mutations/root-mutation.js");
console.log(RootMutation);
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
