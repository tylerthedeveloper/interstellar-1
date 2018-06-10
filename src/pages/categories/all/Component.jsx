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

type Category = {
    id: string,
    category: string,
    description: string,
    imageURL: string,
    numberOfProducts: number,
}

type ComponentProps = {
    categories: [Category]
};

/****  COMPONENT ******/
class CategoryLanding extends React.PureComponent<ComponentProps & ClassProp> {
    render() {
        const { classes, categories } = this.props;
        return (
            <div>
                <Grid container alignContent={"center"} alignItems={"center"}>
                    {categories.map((category) => {
                        return (
                            <Grid item xs={6} lg={3} key={category.id}>
                                <CategoryCard
                                    title={category.category}
                                    description={category.description}
                                    to={"/categories/" + category.id}
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
