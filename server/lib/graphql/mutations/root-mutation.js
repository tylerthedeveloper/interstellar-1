const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} = graphql;
const cartItemsMutation = require("./cart-items-mutation");
const productCategoryMutation = require("./product-category-mutation");
const productMutation = require("./product-mutation");
import userMutation from "./user-mutation";

const fields = () => ({
    ...cartItemsMutation,
    ...productCategoryMutation,
    ...productMutation,
    ...userMutation
});

export default new GraphQLObjectType({
    name: "RootMutationType",
    fields: fields
});
