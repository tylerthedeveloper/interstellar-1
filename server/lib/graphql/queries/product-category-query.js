import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import ProductType from "../types/product";
import ProductCategoryType from "../types/product-category";
import { getAllCategories, getProductsByCategory } from "../../services/category.service";

export default {
    categories: {
        type: new GraphQLList(ProductCategoryType),
        resolve(parentValue, args) {
            return getAllCategories();
        }
    },
    productsInCategory: {
        type: new GraphQLList(ProductType),
        args: { categoryID: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { categoryID }) {
            return getProductsByCategory(category);
        }
    }
};
