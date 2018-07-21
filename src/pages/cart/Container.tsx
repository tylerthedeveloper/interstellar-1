import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import CartComponent from "./Component";

/***        Types       ***/
import {GetUserCart} from "GQLTypes";
import { ICartItem, ICartItemTypeGuards } from "Types/local/CartItemType";
import {IPresentableProductTypeGuards} from "Types/local/PresentableProductType";

interface IComponentProps {}

class ProductList extends React.PureComponent<IComponentProps> {
    public render() {

        return (
            <Query
                query={query}
            >

                {({data, loading, error }) => {
                    if (loading || error) {
                        console.log(error);
                        return <div />;
                    }
                    console.log("Loading cart!");

                    const {currentUser} = data as GetUserCart.Query;
                    if (!currentUser) {
                        console.log("Not logged in!");
                        return <div />;
                    }

                    const {cart} = currentUser;
                    if (!cart || !cart.nodes) {
                        console.log("Error fetching cart!");
                        return <div/>;
                    }

                    const {nodes} = cart;
                    const items: ICartItem[] = [];
                    for (const itemID in nodes) {
                        if (!nodes[itemID]) { continue; }
                        const item = nodes[itemID];
                        if (!item || !ICartItemTypeGuards.is(item)) {
                            console.log("Error fetching cart!");
                            return <div/>;
                        } else {
                            items.push(item);
                        }
                    }

                    return <CartComponent items={items} />;

                }}
            </Query>
        );
    }
}

const query = gql`
    query GetUserCart{
        currentUser{
            id
            cart @connection(key: "cart"){
                nodes {
                    quantity
                    product {
                        id
                        name
                        usdCost
                    }
                }
            }
        }
    }
`;

export default ProductList;
