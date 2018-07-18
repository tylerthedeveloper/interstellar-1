import { Provider as MOBXProvider } from "mobx-react";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import StellarAccountStore from "Stores/stellar-account";
import UIStore from "Stores/ui";
import client from "./api/gql/client";
import StellarService from "./api/rest/stellar";
import App from "./app";

const ui = new UIStore();
const account = new StellarAccountStore(client, new StellarService(), ui);

import { registerObserver } from "react-perf-devtool";
registerObserver();

// app attachment
const render = (Component: React.ComponentType) => {
    ReactDOM.render(
        <MOBXProvider account={account} ui={ui}>
            <ApolloProvider client={client}>
                <Router>
                    <Component/>
                </Router>
            </ApolloProvider>
        </MOBXProvider>,
        document.getElementById("root"),
    );
};
render(App);
