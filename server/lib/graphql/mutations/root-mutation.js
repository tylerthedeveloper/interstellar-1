const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} = graphql;
const productCategoryMutation = require("./product-category-mutation");
const productMutation = require("./product-mutation");
const userMutation = require("./user-mutation");

const fields = () => ({
    ...productCategoryMutation,
    ...productMutation,
    ...userMutation
});

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    fields: fields
});

module.exports = RootMutation;
