import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";
import { getProductsByCategory } from "../../services/category.service";
import ProductType from "../types/product";

const ProductCategoryType = new GraphQLObjectType({
    name: "ProductCategoryType",
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLString) }, // todo issuer with null resolve coming back from a write
        id: { type: GraphQLID },
        category: { type: GraphQLString },
        descripton: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        numberOfProducts: { type: GraphQLInt },
        productsInCategory: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args) {
                return getProductsByCategory(parentValue.category);
            }
        }
        // todo: long term:
        // topProducts: { type: GraphQLString },
        // topSellers: { type: GraphQLString },
    })
});

export default ProductCategoryType;
