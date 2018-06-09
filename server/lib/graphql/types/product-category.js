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

const ProductCategoryType = new GraphQLObjectType({
    name: "ProductCategoryType",
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLString },
        category: { type: GraphQLString },
        descripton: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        numberOfProducts: { type: GraphQLInt },
        // topProducts: { type: GraphQLString },
        // topSellers: { type: GraphQLString },
    })
});

module.exports = ProductCategoryType;
