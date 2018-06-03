import React from 'react';
import {Grid, GridListTile} from '@material-ui/core';
import injectSheet from 'react-jss';


import CategoryCard from './CategoryCardComponent';


const styles = {
    tile: {
        padding:"10px"
    }
};


const CategoryLanding = (props) => {
    const {classes} = props;
    return (
        <div>
            <Grid container alignContent={"center"} alignItems={"center"}>
                {
                    [...Array(5).keys()].map((i) => {
                       return (
                           <Grid item xs={6} lg={3} key={i}>
                                <CategoryCard title={"test"} description={"This is my really cool test."} to={"/categories/" + i}/>
                           </Grid>
                       );
                    })
                }
            </Grid>
        </div>
    )
};

//
export default injectSheet(styles)(CategoryLanding);
