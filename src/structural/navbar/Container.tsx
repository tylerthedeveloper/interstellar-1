import { InMemoryCache } from "apollo-cache-inmemory";
import * as React from "react";
import { Mutation, Query } from "react-apollo";
import {injectWithTypes} from "TypeUtil";

import AccountStore from "Stores/stellar-account";
import { getCurrentUser, logout } from "../../api/gql/auth";
import NavBarComponent from "./Component";

/****  TYPES ******/
interface IComponentProps {
    account: AccountStore;
}

class NavBar extends React.PureComponent<IComponentProps> {
    public render() {
        const { account } = this.props;
        const afterLogin = (cache: InMemoryCache) => {
            cache.writeData({
                data: {
                    currentUser: null,
                },
            });
        };

        console.log("Navbar updating!");

        return (
            <Query query={getCurrentUser}>
                {({ data, loading }) => {
                    if (loading) {
                        return <div/>;
                    }
                    return (
                        <Mutation
                            mutation={logout}
                            update={afterLogin}
                            onCompleted={account.clearAccountInfo}
                        >
                            {(logoutFn) => (
                                <NavBarComponent
                                    currentUserID={data.currentUser ? data.currentUser.id : null}
                                    logout={logoutFn}
                                />
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default injectWithTypes("account", NavBar);
