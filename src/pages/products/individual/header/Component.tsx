import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import Actions from './HeaderActionComponent';
import Info from './ProductHeaderInfoComponent';
import Images from './product_images/Component';

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    productID: string;
    productName: string;
    usdCost: number;
    shortDescription?: string | null;
    rating: number;
    images: {productId?: string; imageKey?: string, imageNum: number}[];
}


/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {


    public render() {

        const {
            classes,
            productName,
            usdCost,
            shortDescription,
            rating,
            images,
            productID
        } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.imagesContainer}>
                    <Images productID={productID} images={images}/>
                </div>
                <div className={classes.infoContainer}>
                    <Info
                        productName={productName}
                        shortDescription={shortDescription}
                        rating={rating}
                    />
                </div>
                <div className={classes.actionsContainer}>
                    <Actions
                        usdCost={usdCost}
                    />
                </div>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    imagesContainer: {
        minWidth: "300px",
        maxWidth: "25%",
        "flexShrink": 1
    },
    infoContainer: {
        "flexGrow": 1,
        margin: "0 20px"
    },
    actionsContainer: {
        width: "200px"
    }
}));

/****  EXPORT ******/
export default withStyles(styles)(Component);
