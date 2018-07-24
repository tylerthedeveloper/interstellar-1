import {
    createStyles,
    Grid,
    IconButton,
    ListItem,
    TextField, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import gql from "graphql-tag";
import * as numeral from "numeral";
import * as React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import getCurrentUser from "Query/GetCurrentUserId";

/****  TYPES ******/
import {
    GetCurrentCartQuantity,
    GetCurrentCartStatus,
    GetCurrentUser,
    UpdateCartQuantity,
} from "GQLTypes";
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

    public render() {

        const { classes, product: { id, name, usdCost }, ui } = this.props;

        /**
         * Application Order: 1
         *
         * Attaches the current user ID to the InnerComponent
         */
        interface IWithCurrentUserProps {userID: string; }
        const withCurrentUser = (InnerComponent: React.ComponentType<IWithCurrentUserProps>) => (
            <Query
                query={getCurrentUser}
            >
                {({ data, loading, error }) => {
                    if (loading || error) {
                        return <div/>;
                    }

                    const { currentUser } = data as GetCurrentUser.Query;
                    if (!currentUser || !currentUser.id) {
                        return <div/>;
                    }

                    const { id: userID } = currentUser;
                    return <InnerComponent userID={userID}/>;
                }}
            </Query>
        );

        /**
         * Application Order: 2
         *
         * Attaches deleteFromCart mutation to the inner component
         */
        interface IWithDeleteFromCart extends IWithCurrentUserProps {deleteFromCart: MutationFn; }
        const withDeleteFromCart = (InnerComponent: React.ComponentType<IWithDeleteFromCart>) => (props: IWithCurrentUserProps) => (
            <Mutation
                mutation={deleteFromCartMutation}
            >
                {(mutationFn) => {

                    // function for removing the item from the cart completely
                    const deleteFromCart = () => {
                        const variables = { itemID: id, userID: props.userID };
                        return mutationFn({
                            variables,
                            update: (cache) => {
                                try {
                                    const results = cache
                                        .readQuery({ query: replacementQuery }) as GetCurrentCartStatus.Query;

                                    results!.currentUser!.cart.nodes =
                                        results.currentUser!.cart.nodes.filter((node: any) => {
                                            return node.product.id !== id;
                                        });
                                    cache.writeQuery({ query: replacementQuery, data: results });
                                    ui.displayNotification(`${name} removed from cart!`);
                                } catch (e) {
                                    console.log("Invalid query!");
                                }
                            },
                        });
                    };

                    return <InnerComponent deleteFromCart={deleteFromCart} {...props}/>;
                }}
            </Mutation>
        );

        /**
         * Application Order: 3
         *
         * Attaches quantity (item quantity from cart) to the inner component
         */

        interface IWithQuantity extends IWithCurrentUserProps {quantity: number; }
        const withItemQuantity = (InnerComponent: React.ComponentType<IWithQuantity>) => (props: IWithCurrentUserProps) => (
            <Query
                query={currentQuantity}
                variables={{userID: props.userID, itemID: id}}
            >
                {({ data, loading, error }) => {
                    if (loading || error) {
                        return <div/>;
                    }

                    const { cartByItemIdAndUserId } = data as GetCurrentCartQuantity.Query;
                    if (!cartByItemIdAndUserId || !cartByItemIdAndUserId.quantity) {
                        return <div/>;
                    }

                    return <InnerComponent quantity={cartByItemIdAndUserId.quantity}{...props}/>;
                }}
            </Query >
        );

        /**
         * Application Order: 4
         *
         * Attaches updateQuantity mutation to the inner component
         */
        interface IWithUpdateQuantity extends IWithCurrentUserProps {updateQuantity: (quantity: number) => void; }
        const withUpdateQuantity = (InnerComponent: React.ComponentType<IWithUpdateQuantity>) => (props: IWithCurrentUserProps) => (
            <Mutation
                mutation={updateQuantityMutation}
                onCompleted={(data: UpdateCartQuantity.Mutation) => {
                    const newQuantity = data.updateCartByItemIdAndUserId!.cart!.quantity;
                    ui.displayNotification(`Updated cart to ${newQuantity} x ${name}!`);
                }}
            >
                {(mutationFn) => {

                    // function for removing the item from the cart completely
                    const updateQuantity = (quantity: number) => {
                        const variables = { itemID: id, userID: props.userID, quantity};
                        return mutationFn({
                            variables,
                            update(cache) {
                                const data = {cartByItemIdAndUserId: {
                                    __typename: "Cart",
                                    quantity,
                                }};
                                cache.writeQuery({
                                    query: currentQuantity,
                                    variables: {
                                        itemID: id,
                                        userID: props.userID,
                                    },
                                    data,
                                });
                            },
                        });
                    };

                    return <InnerComponent updateQuantity={updateQuantity} {...props}/>;
                }}
            </Mutation>
        );

        /**
         * Application Order: 3
         *
         * Applies the attached data to some structure
         */
        interface IInnerComponentProps extends IWithCurrentUserProps, IWithDeleteFromCart, IWithQuantity, IWithUpdateQuantity {}
        const DomComponent = (props: IInnerComponentProps) => {

            const { deleteFromCart, quantity, updateQuantity } = props;

            const updateQuantityHandler = (target: HTMLInputElement) => {
                const newQuantity = parseInt(target.value, 10);
                if (newQuantity && newQuantity !== quantity) {
                    updateQuantity(newQuantity);
                } else {
                    target.value = "" + quantity;
                }
            };

            // toggle for the quantity in the cart
            const quantitySelectorID = "atc-" + id;
            const quantitySelector = (
                <TextField
                    className={classes.cartCounter}
                    id={quantitySelectorID}
                    label="Edit Quantity"
                    type="number"
                    defaultValue={quantity}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    autoComplete={"off"}
                    onBlur={(event) => updateQuantityHandler(event.target)}
                />
            );

            return (
                <div className={classes.container}>
                    <div>
                        <Typography variant={"caption"}>
                            Price: {numeral(usdCost).format("$0,0.00")}
                        </Typography>
                        <form
                            onMouseDown={(event) => event.stopPropagation()}
                            onSubmit={(event) => {
                                event.preventDefault();
                                updateQuantityHandler(document.getElementById(quantitySelectorID) as HTMLInputElement);
                            }}
                        >
                            {quantitySelector}
                        </form>
                    </div>
                    <div>
                        <Typography variant={"body2"}>
                            Subtotal: {numeral(usdCost * quantity).format("$0,0.00")}
                        </Typography>
                        <IconButton
                            classes={{root: classes.deleteButton}}
                            className={"material-icons"}
                            onClick={(event) => {
                                event.stopPropagation();
                                deleteFromCart();
                            }}
                        >
                            delete
                        </IconButton>
                    </div>
                </div>
            );
        };

        return withCurrentUser(withDeleteFromCart(withItemQuantity(withUpdateQuantity(DomComponent))));
    }
}

/****  GraphQL ******/
const updateQuantityMutation = gql`
    mutation UpdateCartQuantity($itemID: UUID!, $userID: UUID!, $quantity: Int!){
        updateCartByItemIdAndUserId(input: {itemId: $itemID, userId: $userID, cartPatch: {quantity: $quantity}}){
            cart {
                quantity
            }
        }
    }
`;

const currentQuantity = gql`
    query GetCurrentCartQuantity($itemID: UUID!, $userID: UUID!){
        cartByItemIdAndUserId(itemId: $itemID, userId: $userID){
            quantity
        }
    }
`;

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

const deleteFromCartMutation = gql`
    mutation RemoveFromCart($userID: UUID!, $itemID: UUID!){
        deleteCartByItemIdAndUserId(input: {itemId: $itemID, userId: $userID}){
            clientMutationId
        }
    }
`;

/****  STYLES ******/
const styles = createStyles({
    deleteButton: {
        height: "75px",
        width: "75px",
        fontSize: "50px",
    },
    cartCounter: {
        width: "100px",
        marginRight: "25px",
    },
    container: {
        display: "flex",
        alignItems: "center",
    },
});

/****  EXPORT ******/
export default injectWithTypes("ui", withStyles(styles)(ProductListItemAddToCart));
