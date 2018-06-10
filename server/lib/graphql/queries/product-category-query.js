const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require("../types/product");
const ProductCategoryType = require("../types/product-category");
const CategoryService = require("../../services/category.service")

module.exports = {
    categories: {
        type: new GraphQLList(ProductCategoryType),
        resolve(parentValue, args) {
            return CategoryService.getAllCategories();
        }
    },
    productsInCategory: {
        type: new GraphQLList(ProductType),
        args: { category: { type: new GraphQLNonNull(GraphQLString) } },
        resolve(parentValue, { category }) {
            return CategoryService.getProductsByCategory(category);
        }
    }
};
