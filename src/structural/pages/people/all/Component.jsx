// @flow

import React from "react";
import type { ComponentType } from "react";
import { Typography, TextField, Grid } from "@material-ui/core";
import injectSheet from "react-jss";

import { people } from "./data";
import PersonCard from "./PersonCardComponent";

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
                        Sellers
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
                    <Grid container className={classes.items} component={"div"} spacing={16}>
                        {people.map((props) => {
                            return <PersonCard {...props} key={props.name} />;
                        })}
                    </Grid>
                    <div className={classes.filters}>Filters to go here</div>
                </div>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = {
    box: {
        background: "black",
        width: "50px",
        height: "50px"
    },
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
        padding: "0 20px"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(CategoryLanding): ComponentType<{}>);
