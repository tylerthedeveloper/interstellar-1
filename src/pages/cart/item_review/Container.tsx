import gql from "graphql-tag";
import * as React from "react";
import EditCartComponent from "Structural/products/product_list/actions/EditCartAction";
import ProductList from "Structural/products/product_list/Component";

/***        Types       ***/
import { ICartItem } from "Types/local/CartItemType";

interface IComponentProps {
    items: ICartItem[];
}

class ItemReview extends React.PureComponent<IComponentProps> {
    public render() {
        const {items} = this.props;
        return (
            <ProductList
                products={items.map((item) => item.product)}
                ActionComponent={EditCartComponent}
            />
        );
    }
}

export default ItemReview;
