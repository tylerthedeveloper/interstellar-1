// STRING OR ID ... pull from Database or GQL?
const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require("../types/product");
const axios = require("axios");
const ProductService = require("../../services/products.service")
// const ProductService = new ProductService();

module.exports = {
    products: {
        type: new GraphQLList(ProductType),
        resolve(parentValue, args) {
            return ProductService.getAllProducts(); // .then((res) => res.data);
            // return axios
            //     .get(`http://localhost:3002/api/products`)
            //     .then((res) => res.data);
        }
    },
    product: {
        type: ProductType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
            return axios
                .get(`http://localhost:3002/api/products/${args.id}`)
                .then((res) => res.data);
        }
    }
};
