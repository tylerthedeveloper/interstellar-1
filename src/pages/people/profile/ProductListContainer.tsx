import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import ProductListComponent from "Structural/products/product_list/Component";

/***        Types       ***/
import {AllSellerProducts } from "GQLTypes";
import {IPresentableProductTypeGuards} from "Structural/products/product_list/PresentableProductType";

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
                    if (loading || error) { return <div />; }

                    const {userById} = data as AllSellerProducts.Query;
                    if (!userById || !userById.productsBySellerId) {return <div />; }

                    const {nodes: products} = userById.productsBySellerId;

                    return <ProductListComponent products={IPresentableProductTypeGuards.retainOnly(products)} />;
                }}

            </Query>
    );
    }
}

const query = gql`
    query AllSellerProducts($sellerID: UUID!){
        userById(id: $sellerID){
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
