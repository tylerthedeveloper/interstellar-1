import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";

import ProductType from "../types/product";
import ProductService from "../../services/product.service";

export default {
    addProduct: {
        type: ProductType,
        // todo: add more props
        args: {
            productName: { type: new GraphQLNonNull(GraphQLString) },
            productSeller: { type: new GraphQLNonNull(GraphQLString) },
            productCategory: { type: new GraphQLNonNull(GraphQLString) }
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
