import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";
import ProductCategoryType from "../types/product-category";
import { createNewCategory } from "../../services/category.service";

export default {
    addProductCategory: {
        type: ProductCategoryType,
        args: {
            category: { type: GraphQLString },
            descripton: { type: GraphQLString },
            imageURL: { type: GraphQLString },
        },
        resolve(parentValue, args) {
            return createNewCategory(args).then(res => res);
        }
    }
};
