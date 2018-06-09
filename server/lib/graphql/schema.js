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

const graphql = require('graphql');
const axios = require('axios');
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

// return axios.get(`http://localhost:3000/users/${args.id}`)
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: { 
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                // return users.find(user => user.id === args.id)
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});