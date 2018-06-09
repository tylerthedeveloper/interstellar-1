const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require("../types/product");
const ProductCategoryType = require("../types/product-category");
const axios = require("axios");

module.exports = {
    categories: {
        type: new GraphQLList(ProductCategoryType),
        resolve(parentValue, args) {
            return axios
                .get(`http://localhost:3002/api/categories`)
                .then((res) => res.data);
        }
    },
    productsInCategory: {
        type: new GraphQLList(ProductType),
        args: { category: { type: new GraphQLNonNull(GraphQLString) } },
        resolve(parentValue, { category }) {
            return axios
                .get(`http://localhost:3002/api/categories/${category}/products`)
                .then((res) => res.data);
        }
    },
    // categories: [ProductCategoryType]
    // productsInCategory(categoryID) : [Product]
};
