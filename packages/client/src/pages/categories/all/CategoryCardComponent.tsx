import { Card, CardContent, createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { NavLink } from "react-router-dom";

/****  TYPES ******/
interface IComponentProps extends WithStyles<typeof styles> {
    title: string;
    description: string;
    to: string;
}

/****  COMPONENT ******/
class CategoryCard extends React.PureComponent<IComponentProps> {
    public render() {
        const { classes, title, description, to } = this.props;
        return (
            <NavLink to={to} className={classes.navlink}>
                <Card className={classes.card}>
                    <div className={classes.media}>
                        <div className={classes.mediaText}>
                            Need category images!
                        </div>
                    </div>
                    <CardContent>
                        <Typography
                            gutterBottom={true}
                            variant="headline"
                            component="h2"
                        >
                            {title}
                        </Typography>
                        <Typography component="p">{description}</Typography>
                    </CardContent>
                </Card>
            </NavLink>
        );
    }
}

/****  STYLES ******/
const styles = createStyles({
    card: {
        "&:hover": {
            boxShadow:
                `0px 1px 15px 0px rgba(0, 0, 0, 0.2),
                 0px 2px 8px 0px rgba(0, 0, 0, 0.14),
                 0px 3px 4px -8px rgba(0, 0, 0, 0.12)`,
        },
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
        background: "lightgrey",
        position: "relative",
    },

    mediaText: {
        position: "absolute",
        top: 20,
        left: 20,
        color: "white",
    },

    navlink: {
        textDecoration: "none",
        margin: 15,
        maxWidth: 500,
        display: "block",
    },
});

/****  EXPORT ******/
export default withStyles(styles)(CategoryCard);
