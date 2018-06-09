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

const ProductSellerDataType = new GraphQLObjectType({
    name: "ProductSellerDataType",
    fields: () => ({
        productSellerID: { type: GraphQLString },
        productSellerName: { type: GraphQLString },
        productSellerPublicKey: { type: GraphQLString }
    })
});

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLID) },
        id: { type: GraphQLID },
        productName: { type: GraphQLString },
        productShortDescription: { type: GraphQLString },
        productLongDescription: { type: GraphQLString },
        fixedUSDAmount: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        // productPrices: [AssetBalanceInput]
        productAssetOptions: { type: new GraphQLList(GraphQLString) }, // valid???
        productThumbnailLink: { type: GraphQLString },
        productImages: { type: new GraphQLList(GraphQLString) },
        productCategory: { type: GraphQLString },
        productSellerData: { type: ProductSellerDataType },
        productListedAt: { type: GraphQLString },

        // change???
        // userID: { type: new GraphQLNonNull(GraphQLID) }
        userID: { type: GraphQLID }
        // # some day
        // # productRating: Int
        // # productReviews: [String]
        // # shippingInfo: ShippingInformation
        // acceptedAssets: [AssetBalance]
    })
});

module.exports = ProductType;

/*
const schema = `
    input ProductSellerDataInput {
        productSellerID: String
        productSellerName: String
        productSellerPublicKey: String
    }

    
    
    input ProductInput {
        # id: String
        productName: String
        productShortDescription: String
        productLongDescription: String
        fixedUSDAmount: Int
        quantity: Int
        productPrices: [AssetBalanceInput]
        productAssetOptions: [String]
        productThumbnailLink: String
        productImages: [String]
        productCategory: String
        productSellerData: ProductSellerDataInput
        productListedAt: Int
        # some day
        # productRating: Int
        # productReviews: [String]
        # shippingInfo: ShippingInformation
    }
    
    type Product {
        id: String
        productName: String
        productShortDescription: String
        productLongDescription: String
        fixedUSDAmount: Int
        quantity: Int
        productPrices: [AssetBalance]
        productAssetOptions: [String]
        productThumbnailLink: String
        productImages: [String]
        productCategory: String
        productSellerData: ProductSellerData
        productListedAt: Int
        # some day
        # productRating: Int
        # productReviews: [String]
        # shippingInfo: ShippingInformation
    }

    type Query {
        products: [Product]
        product(id: String!): Product
    }

    type Mutation {
        updateProduct (
            # need to dump all attributes
            someAttr: String
        ): Product
    
        addProduct (
            input: ProductInput
        ): Product
    
        deleteProduct(fbid: String!): Product
    }
    
    type Subscription {
        productUpdated: Product
        productAdded: Product
        productDeleted: Product
    }
`;

module.exports = schema;
*/
