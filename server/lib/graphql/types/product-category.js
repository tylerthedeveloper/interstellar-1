const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = graphql;

const CategoryService = require("../../services/category.service")
const ProductType = require("../types/product");

const ProductCategoryType = new GraphQLObjectType({
    name: "ProductCategoryType",
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLString) }, // todo issuer with null resolve coming back from a write
        id: { type: GraphQLString },
        category: { type: GraphQLString },
        descripton: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        numberOfProducts: { type: GraphQLInt },
        productsInCategory: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args) {
                return CategoryService.getProductsByCategory(parentValue.category);
            }
        }
        // topProducts: { type: GraphQLString },
        // topSellers: { type: GraphQLString },
    })
});

module.exports = ProductCategoryType;
