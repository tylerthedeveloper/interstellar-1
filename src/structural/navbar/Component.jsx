import React from 'react';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import injectSheet from 'react-jss';

import NavButton from './NavButtonComponent';
import LoginModal from '../login/login_modal/Component'

const styles = {
    logo: {
        color: "white",
        marginRight: "25px"
    },

    navSection: {
        flex: 1
    }
};


class NavBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loginModelOpen: false
        };

        this.openLoginModal = this.openLoginModal.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
    }


    openLoginModal(event) {
        this.setState({
            loginModelOpen: true
        })
    }

    closeLoginModal(event) {
        this.setState({
            loginModelOpen: false
        })
    }



    render(){
        const {classes} = this.props;
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
                        <Button onClick={this.openLoginModal} variant={"raised"}>
                            Login
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>,
            <LoginModal key={"login-modal"} open={this.state.loginModelOpen} onClose={this.closeLoginModal}/>
        ]

    }
}


export default injectSheet(styles)(NavBar);
