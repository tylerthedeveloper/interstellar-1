import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";
import cartItemsMutation from "./cart-items-mutation";
import productCategoryMutation from "./product-category-mutation";
import productMutation from "./product-mutation";
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
