// @flow

import React from "react";
import type { ComponentType } from "react";
import {
    Typography,
    ListItem,
    Grid,
    TextField,
    IconButton,
    Icon
} from "@material-ui/core";
import injectSheet from "react-jss";

import type { product } from "./data";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = product;

/****  COMPONENT ******/
class ProductListItem extends React.PureComponent<ComponentProps & ClassProp> {
    //stop the ripple effect when clicking on the add to cart form
    static onclickForm(event: SyntheticEvent<HTMLButtonElement>): void {
        event.stopPropagation();
    }

    render() {
        const { classes, name, price, description } = this.props;
        return (
            <ListItem divider button>
                <Grid container>
                    <Grid item xs={2} className={classes.image}>
                        Image Here
                    </Grid>
                    <Grid item xs={7} className={classes.descriptionBox}>
                        <Typography variant={"title"}>{name}</Typography>
                        <Typography variant={"body1"}>{description}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant={"subheading"}>
                            Price: {price}
                            <form onMouseDown={ProductListItem.onclickForm}>
                                <TextField
                                    className={classes.cartCounter}
                                    id={"atc-" + name}
                                    label="Add to Cart"
                                    type="number"
                                    defaultValue={1}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    margin="normal"
                                />
                                <IconButton className={"material-icons"}>
                                    shopping_cart
                                </IconButton>
                            </form>
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
        );
    }
}

/****  STYLES ******/
const styles = {
    container: {
        display: "flex"
    },
    image: {
        display: "inline-block",
        height: "100px",
        background: "lightgrey"
    },
    descriptionBox: {
        paddingLeft: "20px"
    },
    cartCounter: {
        width: "100px",
        marginRight: "25px"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(ProductListItem): ComponentType<
    ComponentProps
>);
