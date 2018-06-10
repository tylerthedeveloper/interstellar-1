const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require("../types/product");
const ProductService = require("../../services/product.service")

module.exports = {
    products: {
        type: new GraphQLList(ProductType),
        resolve (parentValue, args) {
            return ProductService.getAllProducts();
        }
    },
    product: {
        type: ProductType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
            return ProductService.getProductById(id);
        }
    },
    userProducts: {
        type: new GraphQLList(ProductType),
        resolve (parentValue, { id }) {
            return ProductService.getProductsByUserID(id);
        }
    },

};
