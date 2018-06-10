import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from "graphql";

import { getProductById } from "../../services/product.service";
import ProductType from "../types/product";

const CartItemType = new GraphQLObjectType({
    name: "CartItemType",
    fields: () => ({
        // cartItemID: { type: new GraphQLNonNull(GraphQLID) },
        cartItemID: { type: GraphQLID },
        timestamp: { type: GraphQLString },
        buyerUserID: { type: GraphQLString },
        buyerPublicKey: { type: GraphQLString },
        sellerUserID: { type: GraphQLString },
        sellerPublicKey: { type: GraphQLString },

        productID: { 
            type: ProductType,
            resolve(parentValue, args) {
                return getProductById(productID);
            }
        },
        quantityPurchased: { type: GraphQLInt },

        // group these 2 
        selectedAsset: { type: GraphQLString }, 
        assetPurchaseDetails: { type: GraphQLString }, // .. 
        
        /*
        productName: { type: GraphQLString },
        assetPricePerItem: { type: GraphQLString }, // ...
        productShortDescription: { type: GraphQLString },
        productThumbnailLink: { type: GraphQLString },
        productCategory: { type: GraphQLString },
        oldQuantity: { type: GraphQLInt },
        fixedUSDAmount: { type: GraphQLInt },
        */
    //    isInCheckout: { type: GraphQLBoolean },
    //    isPaidFor: { type: GraphQLBoolean }
    })
});

export default CartItemType;
