const graphql = require('graphql');
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductType = require('../types/product');
const axios = require('axios');

module.exports = {
    categoriedProducts: {
        type: new GraphQLList(ProductType),
        args: { category: { type: new GraphQLNonNull(GraphQLString) } },
        resolve(parentValue, { category }) {
          return axios.get(`http://localhost:3000/categories/${category}/products`)
              .then(res => res.data);
          }
      },
      products: {
      type: new GraphQLList(ProductType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/products/`)
            .then(res => res.data);
        }
    },
    product: {
      type: ProductType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } }, // STRING OR ID
      resolve(parentValue, { id }) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
            .then(res => res.data);
      }
    }
}