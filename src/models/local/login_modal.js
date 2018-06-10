import gql from 'graphql-tag';

import StellarService from '../../api/stellar';
import {client} from '../../index';

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
    loggedIn: false
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


        login: (_, args, { cache }) : Promise<{error?: string}> => {
            const { key } = args;


            //check to make sure we have a valid key
            if(!StellarService.setKey(key)){
                return Promise.resolve({
                    error: "Does not appear to be a valid format for a secret key!"
                });
            }

            //try to retrieve the account details -- store them in the StellarService
            //but mark logged in in the apollo cache
            return StellarService.getAccount()
                .then((account) => {

                    const [payload, signature] = StellarService.generatePackageAndSignature();
                    const publicKey = StellarService.keyPair.publicKey();

                    return client.mutate({
                        mutation: loginServer,
                        variables: {
                            publicKey,
                            payload,
                            signature
                        },
                        update: (cache, {data: {login: {id}}}) => {
                            console.log(id);
                            cache.writeData({
                                data: {
                                    currentUser: {
                                        __typename: "UserType",
                                        id
                                    }
                                }
                            })
                        }
                    })

                }, (err) => {
                    return Promise.reject({
                        error: "No public account belonging to that key found!"
                    })
                }).then((user) => {

                    //close the modal and signal logged in
                    cache.writeData({
                        data: {
                            loginModalOpen:false,
                        }
                    });


                    return {};
                }).catch(err => {
                    return err;
                })

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

export const getCurrentUserID = gql`
    query {
        currentUser {
            id
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
        logout {
            id
        }
    }
`;

const loginServer = gql`
    mutation Login($publicKey: String!, $payload: String!, $signature: String!){
        login(publicKey: $publicKey, payload: $payload, signature: $signature){
            id,
            publicKey,
            userName,
            fullName,
            email,
            birthdate,
            age,
            address,
            isValidBuyer,
            isValidSeller,
            accountCreated
        }
    }
`;


