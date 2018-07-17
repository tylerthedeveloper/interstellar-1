import * as React from "react";
import { Switch, Route } from "react-router-dom";

import PeopleAll from "./sellers/Container";
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
