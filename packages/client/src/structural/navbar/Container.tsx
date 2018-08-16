import { InMemoryCache } from "apollo-cache-inmemory";
import * as React from "react";
import { Mutation, Query } from "react-apollo";
import {injectWithTypes} from "TypeUtil";

import AccountStore from "Stores/stellar-account";
import logout from "Mutation/Logout";
import NavBarComponent from "./Component";
import gql from "graphql-tag";

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
                                    currentUser={data.currentUser ? data.currentUser : {}}
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

export const getCurrentUser =  gql`
    query getCurrentUser{
        currentUser{
            id
            profilePicture
            displayName
            username
        }
    }
`;

export default injectWithTypes("account", NavBar);
