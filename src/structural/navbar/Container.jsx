// @flow

import React from "react";
import { Mutation, Query } from "react-apollo";
import { inject } from "mobx-react";

import { getCurrentUser, logout } from "../../api/gql/auth";
import NavBarComponent from "./Component";

@inject("account")
class NavBar extends React.PureComponent<any> {
    render() {
        const { account } = this.props;

        return (
            <Query query={getCurrentUser}>
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
                            onCompleted={account.clearAccountInfo}
                        >
                            {(logout) => (
                                <NavBarComponent
                                    loggedIn={Boolean(data.currentUser)}
                                    logout={logout}
                                />
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default NavBar;
