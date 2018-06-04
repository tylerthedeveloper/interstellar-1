import React from 'react';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
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


class NavBar extends React.PureComponent{

    render() {
        const {classes, toggleLoginModal} = this.props;
        console.log('rendering navbar');
        return [
            <AppBar position="static" key={"app-bar"}>
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
                        <Button onClick={toggleLoginModal} variant={"raised"}>
                            Login
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>,
        ]
    };
}


export default injectSheet(styles)(NavBar);
