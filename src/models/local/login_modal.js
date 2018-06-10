import gql from 'graphql-tag';

import StellarService from '../../api/stellar';

/*************************************************
 * Defaults
 *************************************************/

export const StatusSymbols = Object.freeze({
    LOGGED_OUT: 0,
    INVALID_KEY_FORMAT:   1,
    NO_ACCOUNT:  2,
    NOT_ABLE_TO_VERIFY: 3,
    LOGGED_IN: 4
});

export const defaults = {
    loginModalOpen: false,
    loginStatus: {
        __typename: "LoginStatus",
        statusCode: StatusSymbols.LOGGED_OUT
    }
};

/*************************************************
 * Resolvers
 *************************************************/

export const resolvers  = {
    Mutation: {
        toggleLoginModal: (_, args, { cache }) => {
            const {loginModalOpen} = cache.readQuery({query: getLoginModalOpenStatus});
            cache.writeData({ data: {loginModalOpen: !loginModalOpen} });
            return null;
        },


        //TODO need to rewrite this to not be asynchronous because apparently apollo doesn't like that
        login: (_, args, { cache }) => {
            const { key } = args;

            return StellarService.verifyKey(key)
                .then((account) => {
                    return {
                        loginStatus: {
                            __typename: "LoginStatus",
                            statusCode: StatusSymbols.LOGGED_IN
                        }
                    };

                }).catch((err) => {
                    return {
                        loginStatus: {
                            __typename: "LoginStatus",
                            statusCode: err.code
                        }
                    };
                });
        },

        logout: (_, args, { cache }) => {

            cache.writeQuery({
                query: getLoginStatus,
                data: {
                    loginStatus: {
                        __typename: "LoginStatus",
                        statusCode: StatusSymbols.LOGGED_OUT
                    }
                }
            });
            return null;
        }
    },
};

/*************************************************
 * Queries
 *************************************************/

export const getLoginModalOpenStatus = gql`
  query {
    loginModalOpen @client
  }
`;

export const getLoginStatus = gql`
    query {
        loginStatus @client {
            statusCode
        }
    }
`;

/*************************************************
 * Mutators
 *************************************************/

export const toggleLoginModalStatus = gql`
  mutation {
    toggleLoginModal @client
  }
`;

export const login = gql`
    mutation Login($key: String){
        login(key: $key) @client
    }
`;

export const logout = gql`
    mutation Logout{
        logout @client
    }
`;


