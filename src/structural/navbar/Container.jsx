// @flow

import React from "react";
import { Mutation } from "react-apollo";

import { toggleLoginModalStatus } from "../../models/login_modal";
import NavBarComponent from "./Component";

class NavBar extends React.PureComponent<{}> {
    render() {
        return (
            <Mutation mutation={toggleLoginModalStatus}>
                {(toggle) => <NavBarComponent toggleLoginModal={toggle} />}
            </Mutation>
        );
    }
}

export default NavBar;
