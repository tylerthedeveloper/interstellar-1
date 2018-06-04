import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient }  from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

import App from "./app";
import {resolvers, defaults} from './models/login_modal';

//graphql initialization
const cache = new InMemoryCache();
const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),

        withClientState({
            cache: cache,
            resolvers: resolvers,
            defaults: defaults
        }),

        new HttpLink({
            uri: 'http://localhost/graphql',
            credentials: 'same-origin'
        })
    ]),
    cache: cache
});


//app attachment
const render = Component => {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Router>
                <Component />
            </Router>
        </ApolloProvider>,
        document.getElementById('root')
    )

};
render(App);