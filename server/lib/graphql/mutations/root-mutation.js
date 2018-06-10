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
import userMutation from "./user-mutation";

const fields = () => ({
    ...productCategoryMutation,
    ...productMutation,
    ...userMutation
});

export default new GraphQLObjectType({
    name: "RootMutationType",
    fields: fields
});
