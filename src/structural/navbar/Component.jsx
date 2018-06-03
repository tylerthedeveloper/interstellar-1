import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import injectSheet from 'react-jss';

import NavButton from './NavButtonComponent';

const styles = {
    logo: {
        color: "white",
        marginRight: "25px"
    },

    navSection: {
        flex: 1
    }
};



const NavBar = (props) => {
    const {classes} = props;
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="display1" className={classes.logo}>
                    Interstellar_Logo
                </Typography>
                <div className={classes.navSection}>

                    <NavButton to="/">
                        Home
                    </NavButton>
                    <NavButton to="/categories">
                        Categories
                    </NavButton>
                    <NavButton to="/products">
                        Products
                    </NavButton>
                    <NavButton to="/people">
                        People
                    </NavButton>

                </div>
                 <div className={classes.userSection}>
                     <NavButton to="/login">
                         Login
                     </NavButton>
                 </div>
            </Toolbar>
        </AppBar>
    )
};


export default injectSheet(styles)(NavBar);
