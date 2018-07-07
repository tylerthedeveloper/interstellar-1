//graphql initialization
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import {onError} from 'apollo-link-error';

const cache = new InMemoryCache();
const client = new ApolloClient({

    //TODO need to move this to separate file
    link: ApolloLink.from([
        onError(
            ({ operation, response, graphQLErrors, networkError, forward }) => {
                if (graphQLErrors) {
                    console.log(graphQLErrors);
                    graphQLErrors.map(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    );
                }
                if (networkError) {
                    console.log(response);
                    console.log(operation);
                    console.log(networkError);
                    operation.setContext({
                        errorPolicy: "none"
                    });
                    return null;
                }
            }
        ),

        new HttpLink({
            uri: "http://localhost:3002/gql",
            credentials: "include"
        })
    ]),
    cache: cache
});

export default client;