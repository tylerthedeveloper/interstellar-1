import * as React from "react";
import { createStyles, Grid, GridListTile, withStyles, WithStyles } from "@material-ui/core";

import CategoryCard from "./CategoryCardComponent";

/****  TYPES ******/
import {PresentableCategory} from "../PresentableCategoryType";

interface ComponentProps extends WithStyles<typeof styles> {
    categories: PresentableCategory[]
}

/****  COMPONENT ******/
class CategoryLanding extends React.PureComponent<ComponentProps> {
    render() {
        const { classes, categories } = this.props;
        return (
            <div>
                <Grid container alignContent={"center"} alignItems={"center"}>
                    {categories.map((category) => {
                        return (
                            <Grid item xs={6} lg={3} key={category.id}>
                                <CategoryCard
                                    title={category.name}
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
const styles = createStyles({
    tile: {
        padding: "10px"
    }
});

/****  EXPORT ******/
export default withStyles(styles)(CategoryLanding);
