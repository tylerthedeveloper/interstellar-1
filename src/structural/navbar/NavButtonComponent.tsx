import * as React from "react";
import { Button, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import injectSheet from "react-jss";

/****  TYPES ******/
interface ComponentProps extends WithStyles<typeof styles>{
    to: string
}

/**** Component ******/
class NavButton extends React.PureComponent<ComponentProps> {
    render() {
        const { classes, children, to } = this.props;

        return (
            <Button className={classes.button} component={()=><NavLink to={to}/>}>
                    {children}
            </Button>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    button: {
        color: "white"
    }
});

/****  EXPORT ******/
export default withStyles(styles)(NavButton);
