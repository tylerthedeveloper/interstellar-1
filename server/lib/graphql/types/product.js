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
        productListedAt: { type: GraphQLString },
        productRating: { type: GraphQLInt },

        // todo: clarify type (string, category)
        productCategoryID: { type: GraphQLString },
        // change? this was grouped for organizational purposes
        // productSellerData: { type: ProductSellerDataType }, 
        productSellerID: { type: GraphQLString }

        // todo: long term
        // # productTags: [String] // in addition to category, extra options for search + filtering
        // # productReviews: [String]
        // # shippingInfo: ShippingInformation
        // # acceptedAssets: [AssetBalance]
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
