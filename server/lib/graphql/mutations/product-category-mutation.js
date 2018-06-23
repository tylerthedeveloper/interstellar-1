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
import CategoryService from "../../services/category.service";

export default {
    addProductCategory: {
        type: ProductCategoryType,
        args: {
            category: { type: GraphQLString },
            description: { type: GraphQLString },
            imageURL: { type: GraphQLString },
        },
        resolve(parentValue, args) {
            return CategoryService.createNewCategory(args).then(res => res);
        }
    }
};
