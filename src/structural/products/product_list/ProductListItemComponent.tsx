import {
    createStyles,
    Grid,
    IconButton,
    ListItem,
    TextField, Typography, WithStyles, withStyles,
} from "@material-ui/core";
import * as React from "react";
import { MouseEvent } from "react";
import StarRatingComponent from "react-star-rating-component";

/****  TYPES ******/
import { IPresentableProduct } from "./PresentableProductType";
interface IComponentProps extends WithStyles<typeof styles> {
   product: IPresentableProduct;
}

/****  COMPONENT ******/
class ProductListItem extends React.PureComponent<IComponentProps> {

    // stop the ripple effect when clicking on the add to cart form
    public static onclickForm(event: MouseEvent<HTMLFormElement>): void {
        event.stopPropagation();
    }

    public render() {
        const { classes, product: {name, usdCost, description} } = this.props;
        const rating = null;
        return (
            <ListItem divider={true} button={true}>
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
                        <Typography variant={"body1"}>{description}</Typography>
                    </Grid>
                    <Grid item={true} xs={3}>
                        <Typography variant={"subheading"}>
                            Price: {usdCost}
                            <form onMouseDown={ProductListItem.onclickForm}>
                                <TextField
                                    className={classes.cartCounter}
                                    id={"atc-" + name}
                                    label="Add to Cart"
                                    type="number"
                                    defaultValue={1}
                                    InputLabelProps={{ shrink: true }}
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
