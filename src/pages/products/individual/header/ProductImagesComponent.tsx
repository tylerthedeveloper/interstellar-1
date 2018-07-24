import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";


/****  TYPES ******/
interface IProductImagesComponentProps extends WithStyles<typeof styles> {}


/****  COMPONENT ******/
class ProductImagesComponent extends React.PureComponent<IProductImagesComponentProps> {


    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.image}>
                Need image here
            </div>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({
    image: {
        width: "100%",
        height: "100%",
        background: "grey",
        minHeight: "250px",
        minWidth: "250px"
    }
}));

/****  EXPORT ******/
export default withStyles(styles)(ProductImagesComponent);
