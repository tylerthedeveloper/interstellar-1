// @flow

import React from "react";
import injectSheet from "react-jss";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import Navbar from "./structural/navbar/Container";
import HomePage from "./pages/home/Component";
import Categories from "./pages/categories/Component";
import Products from "./pages/products/Component";
import People from "./pages/people/Component";
import Cart from "./pages/cart/Component";
import LoginModal from "./structural/login/login_modal/Component";

/****  TYPES ******/
type ClassProp = {
    classes: { [$Keys<typeof styles>]: string }
};

type ComponentProps = {};

/****  COMPONENT ******/
class App extends React.Component<ComponentProps & ClassProp> {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Navbar />
                <div className={classes.content}>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/categories" component={Categories} />
                        <Route path="/people" component={People} />
                        <Route path="/cart" component={Cart} />
                    </Switch>
                </div>
                <LoginModal />
            </div>
        );
    }
}

/****  STYLES ******/
const styles = {
    container: {
        position: "absolute1",
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
        top: 0,
        left: 0
    },
    content: {
        padding: "20px"
    }
};

export default hot(module)(injectSheet(styles)(App));
