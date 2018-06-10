const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require("../types/product");
const ProductService = require("../../services/product.service").default

module.exports = {
    addProduct: {
        type: ProductType,
        // todo: add more props
        args: {
            productName: { type: new GraphQLNonNull(GraphQLString) },
            userID: { type: new GraphQLNonNull(GraphQLString) },
            categoryID: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parentValue, args) {
            return ProductService.addProduct(args);
        }
    },
    deleteProduct: {
        type: ProductType,
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        resolve(parentValue, { id }) {
            return ProductService.deleteProduct(id);
        }
    },
    updateProduct: {
        type: ProductType,
        // todo: add more props
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            productName: { type: GraphQLString },
            productShortDescription: { type: GraphQLString },
        },
        resolve(parentValue, args) {
            return ProductService.updateProduct(args);
        }
    }
};
