// @flow
import React from "react";
import type { ComponentType } from "react";
import injectSheet from "react-jss";
import { products } from "./data";
import { Typography, TextField, List } from "@material-ui/core";

import ProductListItem from "./ProductListItemComponent";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {};

/****  COMPONENT ******/
class Component extends React.PureComponent<ComponentProps & ClassProp> {
    render() {
        const { classes } = this.props;

        return (
            <List component={"div"} className={classes.listContainer}>
                {products.map((props) => {
                    return <ProductListItem key={props.name} {...props} />;
                })}
            </List>
        );
    }
}

/****  STYLES ******/
const styles = {
    listContainer: {
        width: "100%"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(Component): ComponentType<ComponentProps>);
