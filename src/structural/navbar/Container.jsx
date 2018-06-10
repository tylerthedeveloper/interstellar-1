// @flow

import React from "react";

import {
    getLoginStatus,
    toggleLoginModalStatus,
    logout,
    getLoginModalOpenStatus,
    login
} from "../../models/local/login_modal";
import NavBarComponent from "./Component";
import { Mutation, Query } from "react-apollo";

class NavBar extends React.PureComponent<{}> {
    render() {
        return (
            <Mutation mutation={toggleLoginModalStatus}>
                {(toggle) => (
                    <Query query={getLoginStatus}>
                        {({ data: { loggedIn } }) => (
                            <Mutation mutation={logout}>
                                {(logout) => (
                                    <NavBarComponent
                                        loggedIn={loggedIn}
                                        toggleLoginModal={toggle}
                                        logout={logout}
                                    />
                                )}
                            </Mutation>
                        )}
                    </Query>
                )}
            </Mutation>
        );
    }
}

export default NavBar;
