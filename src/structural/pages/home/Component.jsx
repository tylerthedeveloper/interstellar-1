// @flow
import React from "react";
import type { ComponentType } from "react";
import { Typography } from "@material-ui/core";
import injectSheet from "react-jss";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {};

/****  COMPONENT ******/
class Home extends React.PureComponent<ComponentProps & ClassProp> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Typography variant={"display3"}>Home Page</Typography>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = {
    container: {
        padding: "20px 250px 0"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(Home): ComponentType<ComponentProps>);
