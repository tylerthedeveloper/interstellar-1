import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { Provider as MOBXProvider } from 'mobx-react';

import client from "./api/gql/client";
import StellarService from "./api/rest/stellar";
import StellarAccountStore from "./stores/stellar-account";
import UIStore from "./stores/ui";
import App from "./app";

const ui = new UIStore();
const account = new StellarAccountStore(client, new StellarService(), ui);

//app attachment
const render = (Component) => {
    ReactDOM.render(
        <MOBXProvider account={account} ui={ui}>
            <ApolloProvider client={client}>
                <Router>
                    <Component />
                </Router>
            </ApolloProvider>
        </MOBXProvider>,
        document.getElementById("root")
    );
};
render(App);
