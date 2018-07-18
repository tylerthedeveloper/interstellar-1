import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Profile from "./profile/Component";
import PeopleAll from "./sellers/Container";

/**** Component ******/
class CategoryComponent extends React.PureComponent<{}> {
    public render() {
        return (
            <Switch>
                <Route exact={true} path={"/people"} component={PeopleAll} />
                <Route path={"/people/:id/:section?"} component={Profile} />
            </Switch>
        );
    }
}

export default CategoryComponent;
