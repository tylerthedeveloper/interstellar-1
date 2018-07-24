import { createStyles, Divider, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import StarRatingComponent from "react-star-rating-component";

/****  TYPES ******/
interface IProductHeaderInfoComponentProps extends WithStyles<typeof styles> {
    productName: string;
    shortDescription: string;
    rating: number;
}


/****  COMPONENT ******/
class ProductHeaderInfoComponent extends React.PureComponent<IProductHeaderInfoComponentProps> {


    public render() {

        const {
            classes,
            productName,
            shortDescription,
            rating
        } = this.props;

        return (
            <div className={classes.container}>
                <Typography variant={"title"}>{productName}</Typography>
                <div className={classes.ratingContainer}>
                    <StarRatingComponent
                        name={productName}
                        editing={false}
                        className={classes.stars}
                        starCount={5}
                        value={rating ? rating : 0}
                    />
                    <Typography variant={"caption"}>
                        ({rating ? rating : "N/A"})
                    </Typography>
                </div>
                <div className={classes.ratingContainer}>
                    <Typography>Sold by loading...</Typography>
                </div>
                <Divider className={classes.divider}/>
                <Typography>{shortDescription}</Typography>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    divider: {
        margin: "10px 0"
    },
    stars: {
        fontSize: "20px",
        marginRight: "10px"
    },
    ratingContainer: {
        display: "flex",
        alignItems: "center"
    }
}));

/****  EXPORT ******/
export default withStyles(styles)(ProductHeaderInfoComponent);
