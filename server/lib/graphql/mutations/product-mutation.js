const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require("../types/product");
const axios = require("axios");

module.exports = {
    addProduct: {
        type: ProductType,
        // todo: add more props
        args: {
            productName: { type: GraphQLID },
            userID: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parentValue, { productName, userID }) {
            const product = Object.assign({ productName, userID });
            return axios
                .post(`http://localhost:3002/products`, product)
                .then((res) => res.data);
        }
    },
    deleteProduct: {
        type: ProductType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
            return axios
                .delete(`http://localhost:3002/products/${id}`)
                .then((res) => res.data);
        }
    },
    updateProduct: {
        type: ProductType,
        // todo: add more props
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            productName: { type: GraphQLID }
        },
        resolve(parentValue, args) {
            return axios
                .patch(`http://localhost:3002/products/${args.id}`, args)
                .then((res) => res.data);
        }
    }
};
