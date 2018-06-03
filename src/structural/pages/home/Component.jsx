import React from 'react';
import {Typography} from '@material-ui/core';
import injectSheet from 'react-jss';

const styles = {

};


const CategoryLanding = (props) => {
    const {classes} = props;
    return (
        <div>
            <Typography variant="display1">
                This is the home page.
            </Typography>
        </div>
    )
};


export default injectSheet(styles)(CategoryLanding);
