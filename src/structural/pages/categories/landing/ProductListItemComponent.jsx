// @flow

import React from "react";
import type { ComponentType } from "react";
import {
    Typography,
    ListItem,
    Grid,
    TextField,
    IconButton
} from "@material-ui/core";
import StarRatingComponent from "react-star-rating-component";
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
        const { classes, name, price, description, rating } = this.props;
        return (
            <ListItem divider button>
                <Grid container>
                    <Grid item xs={2} className={classes.image}>
                        Image Here
                    </Grid>
                    <Grid item xs={7} className={classes.descriptionBox}>
                        <div className={classes.headerBox}>
                            <Typography variant={"title"}>{name}</Typography>
                            <div className={classes.ratingContainer}>
                                <StarRatingComponent
                                    name={name}
                                    editing={false}
                                    className={classes.stars}
                                    starCount={5}
                                    value={rating}
                                />
                                <Typography variant={"caption"}>({rating})</Typography>

                            </div>
                        </div>
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
    },
    headerBox: {
        display: "inline-flex"
    },
    stars : {
        fontSize: "20px",
        marginRight:"7px"
    },
    ratingContainer: {
        display: "flex",
        alignItems: "center",
        marginLeft: "20px"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(ProductListItem): ComponentType<
    ComponentProps
>);
