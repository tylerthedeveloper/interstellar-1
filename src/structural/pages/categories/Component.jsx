// @flow

import React from "react";
import { Switch, Route } from "react-router-dom";

import CategoryAll from "./all/Component";
import CategoryLanding from "./landing/Component";

/**** Component ******/
class CategoryComponent extends React.PureComponent<{}> {
    render() {
        return (
            <Switch>
                <Route exact path={"/categories"} component={CategoryAll} />
                <Route path={"/categories/:id"} component={CategoryLanding} />
            </Switch>
        );
    }
}

export default CategoryComponent;
