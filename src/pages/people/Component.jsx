// @flow

import React from "react";
import { Switch, Route } from "react-router-dom";

import PeopleAll from "./all/Component";
import Profile from "./profile/Component";

/**** Component ******/
class CategoryComponent extends React.PureComponent<{}> {
    render() {
        return (
            <Switch>
                <Route exact path={"/people"} component={PeopleAll} />
                <Route path={"/people/:id/:section?"} component={Profile} />
            </Switch>
        );
    }
}

export default CategoryComponent;
