// @flow

import React from "react";
import type { ComponentType } from "react";
import { Typography, TextField } from "@material-ui/core";
import injectSheet from "react-jss";

import ProductList from "../../../structural/products/product_list/Component";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

/****  COMPONENT ******/
class CategoryLanding extends React.PureComponent<ClassProp> {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <Typography variant={"display2"} className={classes.title}>
                        Odds & Ends
                    </Typography>
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
                        <ProductList />
                    </div>
                    <div className={classes.filters}>Filters to go here</div>
                </div>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = {
    container: {
        padding: "20px 250px 0"
    },
    header: {
        display: "flex"
    },
    content: {
        display: "flex",
        marginTop: "20px"
    },
    title: {
        flex: 1
    },
    search: {
        width: "25%",
        transition: "all 0.5s ease",
        "&:focus-within": {
            width: "600px"
        }
    },
    searchInput: {
        width: "100%"
    },
    filters: {
        width: "25%",
        height: "500px",
        backgroundColor: "lightgrey",
        display: "inline-block"
    },
    items: {
        flex: 1,
        paddingRight: "30px"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(CategoryLanding): ComponentType<{}>);
