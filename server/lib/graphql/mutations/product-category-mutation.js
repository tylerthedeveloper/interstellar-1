const graphql = require("graphql");
const { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ProductCategoryType = require("../types/product-category");
const axios = require("axios");

module.exports = {
    addProductCategory: {
        type: ProductCategoryType,
        args: {
            category: { type: GraphQLString },
            descripton: { type: GraphQLString },
            imageURL: { type: GraphQLString },
        },
        resolve(parentValue, args) {
            return axios
                .post(`http://localhost:3002/api/categories`, args)
                .then((res) => res.data);
        }
    }
};
