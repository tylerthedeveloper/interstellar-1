import {
    createStyles,
    Grid,
    IconButton,
    ListItem,
    TextField, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import * as React from "react";
import StarRatingComponent from "react-star-rating-component";

/****  TYPES ******/
import { IPresentableProduct } from "Types/local/PresentableProductType";
import { NavLink } from "react-router-dom";
interface IComponentProps extends WithStyles<typeof styles> {
   product: IPresentableProduct;
   ActionComponent: React.ComponentType<{product?: IPresentableProduct, quantity?: number}>;
}

/****  COMPONENT ******/
class ProductListItem extends React.PureComponent<IComponentProps> {

    public render() {
        const { classes, product, ActionComponent } = this.props;
        const rating = null;
        const {name, shortDescription} = product;

        return(
            <NavLink to={`/product/${product.id}`}>
                <ListItem divider={true} button={true} >
                    <Grid container={true}>
                        <Grid item={true} xs={2} className={classes.image}>
                            Image Here
                        </Grid>
                        <Grid item={true} xs={7} className={classes.descriptionBox}>
                            <div className={classes.headerBox}>
                                <Typography variant={"title"}>{name}</Typography>
                                <div className={classes.ratingContainer}>
                                    <StarRatingComponent
                                        name={name}
                                        editing={false}
                                        className={classes.stars}
                                        starCount={5}
                                        value={rating ? rating : 0}
                                    />
                                    <Typography variant={"caption"}>
                                        ({rating ? rating : "N/A"})
                                    </Typography>
                                </div>
                            </div>
                            <Typography variant={"body1"}>{shortDescription}</Typography>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <ActionComponent product={product}/>
                        </Grid>
                    </Grid>
                </ListItem>
            </NavLink>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    container: {
        display: "flex",
    },
    image: {
        display: "inline-block",
        height: "100px",
        background: "lightgrey",
    },
    descriptionBox: {
        paddingLeft: "20px",
    },
    cartCounter: {
        width: "100px",
        marginRight: "25px",
    },
    headerBox: {
        display: "inline-flex",
    },
    stars: {
        fontSize: "20px",
        marginRight: "7px",
    },
    ratingContainer: {
        display: "flex",
        alignItems: "center",
        marginLeft: "20px",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(ProductListItem);
