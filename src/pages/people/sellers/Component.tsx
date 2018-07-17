import * as React from "react";
import { Typography, TextField, Grid, WithStyles, createStyles, withStyles } from "@material-ui/core";

import PersonCard, {isSellerWithID} from "./SellerCardComponent";

/****  TYPES ******/
import {Seller} from "GQLTypes";


interface ComponentProps extends WithStyles<typeof styles> {
    sellers: [Seller]
}

/****  COMPONENT ******/
class CategoryLanding extends React.PureComponent<ComponentProps> {
    render() {
        const { classes, sellers } = this.props;

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
                            autoComplete={"off"}
                        />
                    </form>
                </div>

                <div className={classes.content}>
                    <Grid
                        container
                        className={classes.items}
                        component={"div"}
                        spacing={16}
                    >
                        {sellers.map((seller) => {
                            if(!isSellerWithID(seller)) return;

                            return <PersonCard
                                seller={seller}
                                key={seller.id}
                            />;
                        })}
                    </Grid>
                    <div className={classes.filters}>Filters to go here</div>
                </div>
            </div>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
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
        transition: "sellers 0.5s ease",
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
});

/****  EXPORT ******/
export default withStyles(styles)(CategoryLanding);
