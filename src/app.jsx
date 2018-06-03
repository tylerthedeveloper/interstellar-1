import React from 'react';
import injectSheet from 'react-jss';
import {Switch, Route} from 'react-router-dom';


import Navbar from './structural/navbar/Component';
import HomePage from './structural/pages/home/Component';
import CategoryLanding from './structural/pages/category_landing/Component';

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
                        <Route path="/categories" component={CategoryLanding}/>
                    </Switch>
                </div>
            </div>

        )
    }
}

export default injectSheet(styles)(App);