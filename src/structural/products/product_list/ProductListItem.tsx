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
import { NavLink, Route } from "react-router-dom";
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

        let imageKey: string;
        if( product.productImagesByProductId &&
            product.productImagesByProductId.nodes &&
            product.productImagesByProductId.nodes.length > 0){
            imageKey = product.productImagesByProductId.nodes[0].imageKey;
        }

        return(
            <Route render={(routeProps) => (
                <ListItem divider={true} button={true} onClick={() => routeProps.history.push(`/product/${product.id}`)}>
                    <Grid container={true}>
                        <Grid item={true} xs={2} className={classes.imageContainer}>
                            {imageKey ?
                                <picture >
                                    <source
                                        srcSet={`https://silentshop.s3.amazonaws.com/${imageKey}-med.webp`}
                                        type="image/webp"
                                    />
                                    <img
                                        className={classes.image}
                                        src={`https://silentshop.s3.amazonaws.com/${imageKey}-med.jpeg`}
                                    />
                                </picture> : null}
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
            )}/>

        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    container: {
        display: "flex",
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: "100px"
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
