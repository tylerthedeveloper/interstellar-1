import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import AddToCartActionComponent from "Structural/products/product_list/actions/AddToCartAction";
import ProductListComponent from "Structural/products/product_list/Component";

/***        Types       ***/
import {AllProductsByCategoryId} from "GQLTypes";
import {IPresentableProductTypeGuards} from "Types/local/PresentableProductType";

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

                    return <ProductListComponent
                        products={IPresentableProductTypeGuards.retainOnly(products)}
                        ActionComponent={AddToCartActionComponent}
                    />;
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
