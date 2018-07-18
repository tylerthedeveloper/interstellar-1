import { createStyles, Grid, TextField, Typography, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";

import PersonCard from "./SellerCardComponent";

/****  TYPES ******/
import {IPresentableSeller} from "./PresentableSellerType";

interface IComponentProps extends WithStyles<typeof styles> {
    sellers: IPresentableSeller[];
}

/****  COMPONENT ******/
class CategoryLanding extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, sellers } = this.props;
        console.log(sellers);
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
                        container={true}
                        className={classes.items}
                        component={"div"}
                        spacing={16}
                    >
                        {sellers.map((seller) => {
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
        height: "50px",
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
        padding: "0 20px",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(CategoryLanding);
