// @flow

import React from "react";

import {
    getLoginStatus,
    toggleLoginModalStatus,
    logout,
    getCurrentUserID
} from "../../models/local/login_modal";
import NavBarComponent from "./Component";
import { Mutation, Query } from "react-apollo";

class NavBar extends React.PureComponent<{}> {
    render() {
        return (
            <Mutation mutation={toggleLoginModalStatus}>
                {(toggle) => (
                    <Query query={getCurrentUserID}>
                        {({ data, loading }) => {
                            if (loading) return <div />;

                            return (
                                <Mutation
                                    mutation={logout}
                                    update={(cache) => {
                                        cache.writeData({
                                            data: {
                                                currentUser: null
                                            }
                                        });
                                    }}
                                >
                                    {(logout) => (
                                        <NavBarComponent
                                            loggedIn={Boolean(data.currentUser)}
                                            toggleLoginModal={toggle}
                                            logout={logout}
                                        />
                                    )}
                                </Mutation>
                            );
                        }}
                    </Query>
                )}
            </Mutation>
        );
    }
}

export default NavBar;
