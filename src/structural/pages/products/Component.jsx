import React from 'react';
import {Typography} from '@material-ui/core';
import injectSheet from 'react-jss';

const styles = {
    container: {
      padding: "20px 250px 0"
    }
};


const ProductLanding = (props) => {
    const {classes} = props;
    return (
        <div className={classes.container}>
            <Typography variant={"display3"}>
                Coming soon!
            </Typography>
        </div>
    )
};

export default injectSheet(styles)(ProductLanding);
