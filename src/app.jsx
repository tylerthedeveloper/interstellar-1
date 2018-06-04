import React from 'react';
import injectSheet from 'react-jss';
import {Switch, Route} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Navbar from './structural/navbar/Container';
import HomePage from './structural/pages/home/Component';
import Categories from './structural/pages/categories/Component';
import Products from './structural/pages/products/Component';
import LoginModal from './structural/login/login_modal/Container';

const styles = {
    container: {
        position: "absolute",
        height:"100%",
        width:"100%",
        margin: 0,
        padding: 0,
        top:0,
        left:0
    },
    content: {
        padding: "20px"
    }
};


class App extends React.Component{

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.container}>
                <Navbar/>
                <div className={classes.content}>
                    <Switch >
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/categories" component={Categories}/>
                        <Route path="/products" component={Products}/>
                    </Switch>
                </div>
                <LoginModal/>
            </div>

        )
    }
}

export default hot(module)(injectSheet(styles)(App));
