// @flow

import React from "react";
import type { ComponentType, Node } from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import injectSheet from "react-jss";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {
    to: string,
    children?: Node
};

/**** Component ******/
class NavButton extends React.PureComponent<ComponentProps & ClassProp> {
    render() {
        const { classes, children, to } = this.props;
        return (
            <Button className={classes.button} component={NavLink} to={to}>
                {children}
            </Button>
        );
    }
}

/****  STYLES ******/
const styles = {
    button: {
        color: "white"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(NavButton): ComponentType<ComponentProps>);
