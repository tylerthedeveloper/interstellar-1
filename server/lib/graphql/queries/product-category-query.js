import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import ProductType from "../types/product";
import ProductCategoryType from "../types/product-category";
import CategoryService from "../../services/category.service";

export default {
    categories: {
        type: new GraphQLList(ProductCategoryType),
        resolve(parentValue, args) {
            return CategoryService.getAllCategories();
        }
    },
    category: {
        type: ProductCategoryType,
        args: { categoryID: { type: new GraphQLNonNull(GraphQLID) } },        
        resolve(parentValue, { categoryID }) {
            return CategoryService.getCategoryByID(categoryID);
        }
    },
    productsInCategory: {
        type: new GraphQLList(ProductType),
        args: { categoryID: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { categoryID }) {
            return CategoryService.getProductsByCategory(category);
        }
    }
};
