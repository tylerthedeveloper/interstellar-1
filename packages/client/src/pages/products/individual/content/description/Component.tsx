import { createStyles, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";


/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    productDescription: string;
}


/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {


    public render() {

        const { classes, productDescription } = this.props;

        return (
            <Typography variant={"body1"}>{productDescription}</Typography>
        );
    }
}

/****  STYLES ******/
const styles = (theme: Theme) => (createStyles({

}));

/****  EXPORT ******/
export default withStyles(styles)(Component);
