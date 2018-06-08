// @flow

import React from "react";
import { Switch, Route } from "react-router-dom";

import PeopleAll from "./all/Component";

/**** Component ******/
class CategoryComponent extends React.PureComponent<{}> {
    render() {
        return (
            <Switch>
                <Route exact path={"/people"} component={PeopleAll} />
            </Switch>
        );
    }
}

export default CategoryComponent;
