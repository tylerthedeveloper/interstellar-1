import { createStyles, TextField, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import ProductList from "./ProductListByCategory";

/****  TYPES ******/
import {IPresentableCategory} from "../PresentableCategoryType";

interface IComponentProps extends WithStyles<typeof styles> {
    category: IPresentableCategory;
}

/****  COMPONENT ******/
class CategoryLanding extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, category } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        <Typography variant={"display2"} >
                            {category.name}
                        </Typography>
                        <Typography variant={"subheading"} className={classes.description}>
                            {category.description}
                        </Typography>
                    </div>
                    <form className={classes.search}>
                        <TextField
                            className={classes.searchInput}
                            id={"search"}
                            label={"Search"}
                            placeholder={"Search..."}
                        />
                    </form>
                </div>

                <div className={classes.content}>
                    <div className={classes.items}>
                        <ProductList categoryID={category.id}/>
                    </div>
                    <div className={classes.filters}>Filters to go here</div>
                </div>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    description: {
      marginTop: "10px",
    },
    container: {
        padding: "20px 250px 0",
    },
    header: {
        display: "flex",
    },
    content: {
        display: "flex",
        marginTop: "20px",
    },
    title: {
        flex: 1,
    },
    search: {
        "width": "25%",
        "transition": "sellers 0.5s ease",
        "&:focus-within": {
            width: "600px",
        },
    },
    searchInput: {
        width: "100%",
    },
    filters: {
        width: "25%",
        height: "500px",
        backgroundColor: "lightgrey",
        display: "inline-block",
    },
    items: {
        flex: 1,
        paddingRight: "30px",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(CategoryLanding);
