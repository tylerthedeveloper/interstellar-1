import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Profile from "./profile/Container";
import PeopleAll from "./sellers/Container";

/**** Component ******/
class CategoryComponent extends React.PureComponent<{}> {
    public render() {
        return (
            <Switch>
                <Route exact={true} path={"/people"} component={PeopleAll} />
                <Route
                    path={"/people/:id/"}
                    render={(props) => (
                        <Profile userID={props.match.params.id}/>
                    )}
                />
            </Switch>
        );
    }
}

export default CategoryComponent;
