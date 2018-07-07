// @flow

import React from "react";
import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Icon } from "@material-ui/core";
import injectSheet from "react-jss";

import NavButton from "./NavButtonComponent";
import { inject, observer } from "mobx-react/index";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {
    toggleLoginModal: () => void,
    logout: () => void,
    loggedIn: boolean
};

/****  COMPONENT ******/
@inject("ui")
@inject("account")
@observer
class NavBar extends React.Component<any> {
    render() {
        const { classes, ui, account, loggedIn, logout } = this.props;
        return [
            <AppBar position="static" key={"app-bar"}>
                <Toolbar>
                    <Typography variant="display1" className={classes.logo}>
                        Interstellar_Logo
                    </Typography>
                    <div className={classes.navSection}>
                        <NavButton to="/">Home</NavButton>
                        <NavButton to="/categories">Products</NavButton>
                        <NavButton to="/people">Sellers</NavButton>
                    </div>
                    <div>
                        {loggedIn ? (
                            <Button onClick={logout} variant={"raised"}>
                                Logout
                            </Button>
                        ) : (
                            <Button
                                onClick={ui.openLoginModal}
                                variant={"raised"}
                            >
                                Login / Sign Up
                            </Button>
                        )}

                        <Button
                            className={classes.cartButton}
                            variant={"raised"}
                            component={NavLink}
                            to={"/cart"}
                        >
                            <Icon className={"material-icons"}>
                                shopping_cart
                            </Icon>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        ];
    }
}

/****  STYLES ******/
const styles = {
    logo: {
        color: "white",
        marginRight: "25px"
    },

    navSection: {
        flex: 1
    },

    cartButton: {
        marginLeft: "20px"
    }
};

/****  EXPORT ******/
export default (injectSheet(styles)(NavBar): ComponentType<any>);
