// @flow

import React from "react";
import type { ComponentType } from "react";
import { Grid, GridListTile } from "@material-ui/core";
import injectSheet from "react-jss";

import CategoryCard from "./CategoryCardComponent";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {};

/****  COMPONENT ******/
class CategoryLanding extends React.PureComponent<ComponentProps & ClassProp> {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container alignContent={"center"} alignItems={"center"}>
                    {[...Array(5).keys()].map((i) => {
                        return (
                            <Grid item xs={6} lg={3} key={i}>
                                <CategoryCard
                                    title={"test"}
                                    description={"This is my really cool test."}
                                    to={"/categories/" + i}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = {
    tile: {
        padding: "10px"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(CategoryLanding): ComponentType<
    ComponentProps
>);
