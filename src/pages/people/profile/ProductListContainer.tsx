import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import AddToCartComponent from "Structural/products/product_list/actions/AddToCartAction";
import ProductListComponent from "Structural/products/product_list/Component";

/***        Types       ***/
import { AddItemToCart, AllSellerProducts } from "GQLTypes";
import {IPresentableProductTypeGuards} from "Types/local/PresentableProductType";

interface IComponentProps {
    sellerID: string;
}

class ProductList extends React.PureComponent<IComponentProps> {
    public render() {

        const {sellerID} = this.props;

        return (
            <Query
                query={query}
                variables={{sellerID}}
            >

                {({data, loading, error }) => {
                    console.log(error);
                    if (loading || error) { return <div />; }

                    const {userById} = data as AllSellerProducts.Query;
                    if (!userById || !userById.productsBySellerId) {return <div />; }

                    const {nodes: products} = userById.productsBySellerId;

                    return <ProductListComponent
                        products={IPresentableProductTypeGuards.retainOnly(products)}
                        ActionComponent={AddToCartComponent}
                    />;
                }}

            </Query>
    );
    }
}

const query = gql`
    query AllSellerProducts($sellerID: UUID!){
        userById(id: $sellerID){
            id
            productsBySellerId{
                nodes {
                    id
                    name
                    usdCost
                    description
                }
            }
        }
    }
`;

export default ProductList;
