// @flow
import React from "react";
import { Grid, Typography, Avatar, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import type { ComponentType } from "react";
import injectSheet from "react-jss";
import StarRatingComponent from "react-star-rating-component";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {
    name: string,
    rating: number,
    numberOfSales: number,
    id: string
};

/****  COMPONENT ******/
class Component extends React.PureComponent<ComponentProps & ClassProp> {
    render() {
        const { name, rating, classes, numberOfSales, id } = this.props;

        return (
            <Grid item xl={2} lg={4} md={6} xs={12}>
                <Button
                    className={classes.button}
                    fullWidth={true}
                    component={NavLink}
                    to={`/people/${id}`}
                >
                    <Typography
                        className={classes.title}
                        variant={"title"}
                        align={"center"}
                    >
                        {name}
                    </Typography>
                    <Avatar className={classes.avatar}>OP</Avatar>
                    <div className={classes.starsContainer}>
                        <StarRatingComponent
                            name={name}
                            className={classes.stars}
                            editing={false}
                            starCount={5}
                            value={rating}
                        />
                        <div className={classes.ratingNum}>({rating})</div>
                    </div>
                    <Typography
                        className={classes.title}
                        variant={"subheading"}
                        align={"center"}
                    >
                        {numberOfSales} sales
                    </Typography>
                </Button>
            </Grid>
        );
    }
}

/****  STYLES ******/
const styles = {
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
        display: ["block", "!important"]
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
};

/****  EXPORT ******/
export default (injectSheet(styles)(Component): ComponentType<ComponentProps>);
