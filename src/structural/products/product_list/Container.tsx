import * as React from "react";
import ProductListComponent from "./Component";
import { Query } from "react-apollo";
import gql from 'graphql-tag';

/***        Types       ***/
import {AllProductsByCategoryId} from "GQLTypes";
import {retainPresentableProducts} from "./PresentableProductType";

interface ComponentProps {
    categoryID: string
}


class ProductList extends React.PureComponent<ComponentProps> {
    render() {
        // $FlowFixMe
        const {categoryID} = this.props;

        return (
            <Query
                query={query}
                variables ={{categoryID}}
            >
                {({data, loading, error }) => {
                    if (loading || error) return <div />;

                    const {allProducts} = data as AllProductsByCategoryId.Query;
                    if(!allProducts)return <div />;

                    let {nodes: products} = allProducts;

                    return <ProductListComponent products={retainPresentableProducts(products)} />;
                }}
            </Query>
        );
    }
}

const query = gql`
    query AllProductsByCategoryID($categoryID: UUID!){
        allProducts(condition: {category: $categoryID}){
            nodes {
                id
                name
                usdCost
                description
            }
        }
    }
`;

export default ProductList;
