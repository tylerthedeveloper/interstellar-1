import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import injectSheet from 'react-jss';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};



const CategoryCard = (props) => {
    const {classes, title, description} = props;
    return (
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
    )
};


export default injectSheet(styles)(CategoryCard);