const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const productQuery = require("./product-query");
const userQuery = require("./user-query");
const queryList = [productQuery, userQuery];

const sum = queryList.reduce((acc, cur) => {
    return acc.concat(cur);
}, []);

//queryList.map(query =>
// const fields = Object.keys(userQuery).map(key => {
//   const _key = key;
//   return Object.assign(userQuery[key])
// });
// console.log(fields);
// fields.forEach(field => Object.defineProperty(obj, field))
// const fields = Object.keys(productQuery).map(key => Object.assign(productQuery[key]));
// console.log(obj);

const fields = () => ({
    ...productQuery,
    ...userQuery
    // ...sum
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: fields
});

// RootQuery.fields = Object.assign(fields)

module.exports = RootQuery;
