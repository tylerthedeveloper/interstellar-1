import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { Provider as MOBXProvider } from "mobx-react";

import client from "./api/gql/client";
import StellarService from "./api/rest/stellar";
import StellarAccountStore from "Stores/stellar-account";
import UIStore from "Stores/ui";
import App from "./app";

const ui = new UIStore();
const account = new StellarAccountStore(client, new StellarService(), ui);

declare module "react-jss";

//app attachment
const render = (Component: React.ComponentType) => {
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
