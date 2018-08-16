import { createStyles, Grid, GridListTile, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";

import CategoryCard from "./CategoryCardComponent";

/****  TYPES ******/
import {IPresentableCategory} from "../PresentableCategoryType";

interface IComponentProps extends WithStyles<typeof styles> {
    categories: IPresentableCategory[];
}

/****  COMPONENT ******/
class CategoryLanding extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, categories } = this.props;
        return (
            <div>
                <Grid container={true} alignContent={"center"} alignItems={"center"}>
                    {categories.map((category) => {
                        return (
                            <Grid item={true} xs={6} lg={3} key={category.id}>
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
        padding: "10px",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(CategoryLanding);
