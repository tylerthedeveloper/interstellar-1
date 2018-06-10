const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductCategoryType = require("../types/product-category");
const CategoryService = require("../../services/category.service")

module.exports = {
    addProductCategory: {
        type: ProductCategoryType,
        args: {
            category: { type: GraphQLString },
            descripton: { type: GraphQLString },
            imageURL: { type: GraphQLString },
        },
        resolve(parentValue, args) {
            return CategoryService.createNewCategory(args).then(res => res);
        }
    }
};
