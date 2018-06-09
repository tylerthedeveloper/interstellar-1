const graphql = require('graphql');
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require('../types/product');
const axios = require('axios');

module.exports = {
      addProduct: {
        type: ProductType,
        // todo: add more props
        args: { productName: { type: GraphQLString } },
        resolve(parentValue, { productName }) {
            const product = Object.assign({productName: productName});
            return axios.post(`http://localhost:3000/products`, product)
                .then(res => res.data);
        }
      }
}