import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import injectSheet from 'react-jss';

const styles = {
    card: {


        "&:hover": {
            boxShadow: "0px 1px 15px 0px rgba(0, 0, 0, 0.2), 0px 2px 8px 0px rgba(0, 0, 0, 0.14), 0px 3px 4px -8px rgba(0, 0, 0, 0.12)"
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    navlink: {
        textDecoration: "none",
        margin:15,
        maxWidth: 500,
        display:"block"

    }
};


const CategoryCard = (props) => {
    const {classes, title, description, to} = props;
    return (
        <NavLink to={to} className={classes.navlink}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {title}
                    </Typography>
                    <Typography component="p">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </NavLink>
    )
};


export default injectSheet(styles)(CategoryCard);