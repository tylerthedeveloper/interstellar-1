import {
    GraphQLSchema as Schema,
    GraphQLObjectType,
    GraphQLFloat as Float,
    GraphQLString as String,
    GraphQLID as ID,
    GraphQLNonNull as NonNull,
    GraphQLList as List
} from "graphql";
import _ from "lodash";

const products = {
    "1": {
        id: "1",
        name: "product1",
        description: "This is product 1",
        price: 1.01,
        categoryID: "12"
    },
    "2": {
        id: "2",
        name: "product2",
        description: "This is product 2",
        price: 2.01,
        categoryID: "12"
    },
    "3": {
        id: "3",
        name: "product3",
        description: "This is product 3",
        price: 121.01,
        categoryID: "11"
    }
};

const categories = {
    "11": {
        id: "11",
        name: "Sports"
    },
    "12": {
        id: "12",
        name: "Books"
    }
};

const Product = new GraphQLObjectType({
    name: "ProductType",
    fields: () => ({
        id: { type: NonNull(ID) },
        name: { type: NonNull(String) },
        description: { type: String },
        price: { type: Float },
        category: {
            type: Category,
            resolve({ categoryID }) {
                return categories[categoryID];
            }
        }
    })
});

const Category = new GraphQLObjectType({
    name: "CategoryType",
    fields: () => ({
        id: { type: NonNull(ID) },
        name: { type: NonNull(String) },
        products: {
            type: List(Product),
            resolve({ id }) {
                return _.filter(products, { categoryID: id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        product: {
            type: Product,
            args: {
                id: { type: NonNull(ID) }
            },
            resolve(parent, { id }) {
                console.log("Actual resolve");
                return products[id];
            }
        },

        category: {
            type: Category,
            args: {
                id: { type: NonNull(ID) }
            },
            resolve(parent, { id }) {
                console.log("Actual resolve");
                return categories[id];
            }
        }
    })
});

const schema = new Schema({
    query: RootQuery
});

export default schema;
