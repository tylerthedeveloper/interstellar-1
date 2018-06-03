import React from 'react';
import {Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import injectSheet from 'react-jss';


const styles = {
    button: {
        color: "white",
    }
};


const NavButton = (props) => {
    const {classes, children, to} = props;
    return (
        <Button
            className={classes.button}
            component={NavLink}
            to={to}
        >
            {children}
        </Button>
    )
};

export default injectSheet(styles)(NavButton);
