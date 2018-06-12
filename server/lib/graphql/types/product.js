import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";
import ProductCategoryType from './product-category';
import UserType from './user';
import UserService from "../../services/user.service";

/*
    const ProductSellerDataType = new GraphQLObjectType({
        name: "ProductSellerDataType",
        fields: () => ({
            productSellerID: { type: GraphQLString },
            productSellerName: { type: GraphQLString },
            productSellerPublicKey: { type: GraphQLString }
        })
    });
*/

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

        productCategory: {
            type: ProductCategoryType,
            resolve(parentValue, args) {
                return CategoryService.getCategoryByID(parentValue.category);
            }
        },
        productSeller: {
            type: UserType,
            resolve(parentValue, args) {
                return UserService.getUserById(parentValue.productSellerID);
            }
        }
        
        // todo: long term
        // # productTags: [String] // in addition to category, extra options for search + filtering
        // # productReviews: [String]
        // # shippingInfo: ShippingInformation
        // # acceptedAssets: [AssetBalance]
    })
});

export default ProductType;
