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

import query from "./queries/root-query.js";
import mutation from "./mutations/root-mutation.js";
import { GraphQLSchema } from "graphql";

export default new GraphQLSchema({
    query,
    mutation
});
