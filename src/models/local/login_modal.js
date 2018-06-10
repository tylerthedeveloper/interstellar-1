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

            return new Promise((resolve) => {


                //check to make sure we have a valid key
                if(!StellarService.setKey(key)){
                    resolve({
                        error: "Does not appear to be a valid format for a secret key!"
                    });
                    return;
                }

                //try to retrieve the account details -- store them in the StellarService
                //but mark logged in in the apollo cache
                return StellarService.getAccount()
                    .then((account) => {

                        console.log('closing modal');

                        //close the modal and signal logged in
                        cache.writeData({
                            data: {
                                loginModalOpen:false,
                                loggedIn: true
                            }
                        });

                        resolve({});

                    }, (err) => {
                        resolve({
                            error: "No public account belonging to that key found!"
                        })
                    })
            });
        },

        logout: (_, args, { cache }) => {

            //clear out the data from the service
            StellarService.clearData();

            //signal that user is no longer logged in
            cache.writeData({
                data: {
                    loggedIn: false
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
        loggedIn @client
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


