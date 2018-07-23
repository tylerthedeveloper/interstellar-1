import {
    createStyles,
    Grid,
    IconButton,
    ListItem,
    TextField, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import gql from "graphql-tag";
import * as React from "react";
import { MouseEvent } from "react";
import { Mutation, Query } from "react-apollo";
import { getCurrentUser } from "../../../../api/gql/auth";

/****  TYPES ******/
import { GetCurrentCartStatus, GetCurrentUser } from "GQLTypes";
import { IPresentableProduct } from "Types/local/PresentableProductType";

import UIStore from "src/stores/ui";
import { injectWithTypes } from "TypeUtil";

interface IComponentProps extends WithStyles<typeof styles> {
   product: IPresentableProduct;
   quantity?: number;
   ui: UIStore;
}

/****  COMPONENT ******/
class ProductListItemAddToCart extends React.PureComponent<IComponentProps> {

    // stop the ripple effect when clicking on the add to cart form
    public static onclickForm(event: MouseEvent<HTMLFormElement>): void {
        event.stopPropagation();
    }

    public render() {
        const { classes, product: {id, name, usdCost}, ui, quantity: defaultQuantity} = this.props;

        return (

            <Query
                query={getCurrentUser}
            >

                {({data, loading, error }) => {
                    if (loading || error) {
                        return <div/>;
                    }

                    const { currentUser } = data as GetCurrentUser.Query;
                    if (!currentUser || !currentUser.id) {
                        return <div/>;
                    }

                    const { id: userID } = currentUser;

                    return (
                        <Mutation
                            mutation={mutation}
                        >
                            {(mutationFn) => {

                                const addToCart = (quantity: number) => {

                                    const variables = {itemID: id, quantity, userID};
                                    return mutationFn({
                                        variables,
                                        update: (cache) => {
                                            try {
                                                const results = cache
                                                    .readQuery({ query: replacementQuery }) as GetCurrentCartStatus.Query;

                                                const replaced = results!.currentUser!.cart.nodes.some((cartItem) => {
                                                    if (cartItem!.product!.id === id) {
                                                        cartItem!.quantity += quantity;
                                                        return true;
                                                    }
                                                    return false;
                                                });

                                                if (!replaced) {
                                                    results!.currentUser!.cart.nodes.push({
                                                        __typename: "Cart",
                                                        quantity,
                                                        product: {
                                                            __typename: "Product",
                                                            id,
                                                        },
                                                    });
                                                }
                                                cache.writeQuery({ query: replacementQuery, data: results });
                                                ui.displayNotification(`${quantity} x ${name} added to cart!`);
                                            } catch (e) {
                                                console.log("Invalid query!");
                                            }
                                        },
                                    });
                                };

                                const quantitySelectorID = "atc-" + id;

                                const quantitySelector = (
                                    <TextField
                                        className={classes.cartCounter}
                                        id={quantitySelectorID}
                                        label="Add to Cart"
                                        type="number"
                                        defaultValue={defaultQuantity ? defaultQuantity : 1}
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                    />
                                );

                                return(
                                    <div>
                                        <Typography variant={"subheading"}>
                                            Price: {usdCost}
                                        </Typography>
                                        <form onMouseDown={(event) => event.stopPropagation()}>
                                            {quantitySelector}
                                            <IconButton
                                                className={"material-icons"}
                                                onClick={() => {
                                                    addToCart(
                                                        parseInt(
                                                            (document.
                                                            getElementById(quantitySelectorID)as HTMLInputElement)
                                                                .value,
                                                            10),
                                                    );
                                                }}
                                            >
                                                shopping_cart
                                            </IconButton>
                                        </form>
                                    </div>
                                );
                            }}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

/****  GraphQL ******/
const replacementQuery = gql`
    query GetCurrentCartStatus{
        currentUser{
            id
            cart @connection(key: "cart"){
                nodes {
                    quantity
                    product {
                        id
                    }
                }
            }
        }
    }
`;

const mutation = gql`
    mutation AddItemToCart($userID: UUID!, $itemID: UUID!, $quantity: Int!){
        addToCart(input: {productId: $itemID, userId: $userID, quantity: $quantity}){
            clientMutationId
        }
    }
`;

/****  STYLES ******/
const styles = createStyles({
    cartCounter: {
        width: "100px",
        marginRight: "25px",
    },
});

/****  EXPORT ******/
export default injectWithTypes("ui", withStyles(styles)(ProductListItemAddToCart));
