import { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import ProductType from "../types/product";
import { getAllProducts, getProductById, getProductsByUserID } from "../../services/product.service";

export default {
    products: {
        type: new GraphQLList(ProductType),
        resolve (parentValue, args) {
            return getAllProducts();
        }
    },
    product: {
        type: ProductType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
            return getProductById(id);
        }
    },
    userProducts: {
        type: new GraphQLList(ProductType),
        resolve (parentValue, { id }) {
            return getProductsByUserID(id);
        }
    },

};
