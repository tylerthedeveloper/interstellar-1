import { Button, createStyles, Grid, Typography, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { NavLink } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import Avatar from "Structural/avatar/Component";

/****  TYPES ******/
import { ButtonProps } from "@material-ui/core/Button";
import {IPresentableSeller} from "./PresentableSellerType";

interface IComponentProps extends WithStyles<typeof styles> {
    seller: IPresentableSeller;
}

/****  COMPONENT ******/
class Component extends React.PureComponent<IComponentProps> {
    public render() {
        const { seller: {id, username, displayName, profilePicture}, classes } = this.props;
        return (
            <Grid item={true} xl={2} lg={4} md={6} xs={12}>
                <Button
                    className={classes.button}
                    fullWidth={true}
                    component={(props: ButtonProps) => <NavLink to={`/people/${id}`} {...props as any}/>}
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
                                variant={"subheading"}
                                align={"center"}
                            >
                                {`(${username})`}
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

                    <Avatar
                        className={classes.avatar}
                        displayName={displayName}
                        profilePicture={profilePicture}
                        imageSize={"sm"}
                    />
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
        height: "80px",
    },
    avatarContainer: {
        alignItems: "center",
    },
    title: {
        display: "block !important",
    },
    stars: {
        fontSize: "22px",
    },
    starsContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "10px",
    },
    ratingNum: {
        paddingLeft: "10px",
        display: "flex",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(Component);
