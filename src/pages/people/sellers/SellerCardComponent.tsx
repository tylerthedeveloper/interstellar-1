import * as React from "react";
import { Grid, Typography, Avatar, Button, withStyles, WithStyles, createStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";

/****  TYPES ******/
import {Seller} from 'GQLTypes';
interface SellerWithID extends Seller{
    id: string
}

interface ComponentProps extends WithStyles<typeof styles> {
    seller: SellerWithID
}
export function isSellerWithID(seller: Seller | null): seller is SellerWithID {
    return Boolean(seller && seller.id);
}


/****  COMPONENT ******/
class Component extends React.PureComponent<ComponentProps> {
    render() {
        const { seller: {id, username, displayName}, classes } = this.props;
        return (
            <Grid item xl={2} lg={4} md={6} xs={12}>
                <Button
                    className={classes.button}
                    fullWidth={true}
                    component={() => <NavLink to={`/people/${id}`}/>}
                >
                    {displayName ?
                        <div>
                            <Typography
                                className={classes.title}
                                variant={"title"}
                                align={"center"}
                            >
                                {displayName}
                            </Typography>
                            <Typography
                                className={classes.title}
                                variant={"title"}
                                align={"center"}
                            >
                                {username}
                            </Typography>
                        </div>
                        :
                        <Typography
                            className={classes.title}
                            variant={"title"}
                            align={"center"}
                        >
                            {username}
                        </Typography>
                    }

                    <Avatar className={classes.avatar}>OP</Avatar>
                    <div className={classes.starsContainer}>
                        <StarRatingComponent
                            name={id}
                            className={classes.stars}
                            editing={false}
                            starCount={5}
                            value={0}
                        />
                        <div className={classes.ratingNum}>({"N/A"})</div>
                    </div>
                    <Typography
                        className={classes.title}
                        variant={"subheading"}
                        align={"center"}
                    >
                        {50} sales
                    </Typography>
                </Button>
            </Grid>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    button: {
        display: "block"
    },
    avatar: {
        margin: "10px auto",
        contentAlign: "center",
        width: "80px",
        height: "80px"
    },
    avatarContainer: {
        alignItems: "center"
    },
    title: {
        display: "block !important"
    },
    stars: {
        fontSize: "22px"
    },
    starsContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "10px"
    },
    ratingNum: {
        paddingLeft: "10px",
        display: "flex"
    }
});

/****  EXPORT ******/
export default withStyles(styles)(Component);
