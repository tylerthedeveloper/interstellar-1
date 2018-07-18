import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import ProductListComponent from "./Component";

/***        Types       ***/
import {AllProductsByCategoryId} from "GQLTypes";
import {IPresentableProductTypeGuards} from "./PresentableProductType";

interface IComponentProps {
    categoryID: string;
}

class ProductList extends React.PureComponent<IComponentProps> {
    public render() {
        // $FlowFixMe
        const {categoryID} = this.props;

        return (
            <Query
                query={query}
                variables={{categoryID}}
            >

                {({data, loading, error }) => {
                    if (loading || error) { return <div />; }

                    const {allProducts} = data as AllProductsByCategoryId.Query;
                    if (!allProducts) {return <div />; }

                    const {nodes: products} = allProducts;

                    return <ProductListComponent products={IPresentableProductTypeGuards.retainOnly(products)} />;
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
