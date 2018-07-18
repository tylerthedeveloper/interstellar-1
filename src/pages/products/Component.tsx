import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {

}

/****  COMPONENT ******/
class ProductLanding extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Typography variant={"display3"}>Coming soon!</Typography>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    container: {
        padding: "20px 250px 0",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(ProductLanding);
