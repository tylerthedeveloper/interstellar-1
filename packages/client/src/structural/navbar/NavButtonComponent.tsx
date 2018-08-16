import { Button, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import * as React from "react";
import { NavLink } from "react-router-dom";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    to: string;
}

/**** Component ******/
class NavButton extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, children, to } = this.props;
        const override = (props: ButtonProps) => <NavLink to={to} {...(props as any)}/>;
        return (
            <Button className={classes.button} component={override}>
                    {children}
            </Button>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    button: {
        color: "white",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(NavButton);
