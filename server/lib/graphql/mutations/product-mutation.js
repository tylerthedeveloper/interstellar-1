const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require("../types/product");
const ProductService = require("../../services/product.service")

module.exports = {
    addProduct: {
        type: ProductType,
        // todo: add more props
        args: {
            productName: { type: GraphQLID },
            userID: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parentValue, { productName, userID }) {
            return ProductService.addNewProduct(args);
        }
    },
    deleteProduct: {
        type: ProductType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
            return ProductService.deleteProduct(id);
        }
    },
    updateProduct: {
        type: ProductType,
        // todo: add more props
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            productName: { type: GraphQLID },
            productShortDescription: { type: GraphQLID },
        },
        resolve(parentValue, args) {
            return ProductService.updateProduct(args);
        }
    }
};
