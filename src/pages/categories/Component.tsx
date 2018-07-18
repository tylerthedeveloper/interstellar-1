import * as React from "react";
import { Route, Switch } from "react-router-dom";

import CategoryAll from "./all/Container";
import CategoryLanding from "./landing/Container";

/**** Component ******/
class CategoryComponent extends React.PureComponent<{}> {
    public render() {
        return (
            <Switch>
                <Route exact={true} path={"/categories"} component={CategoryAll} />
                <Route path={"/categories/:id"} component={CategoryLanding} />
            </Switch>
        );
    }
}

export default CategoryComponent;
