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

import query from "./queries/root-query.js";
import mutation from "./mutations/root-mutation.js";

export default new GraphQLSchema({
    query,
    mutation
});
