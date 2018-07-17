import {observable, action, flow} from 'mobx';
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

import {Login} from 'GQLTypes';
import UIStore from 'Stores/ui';
import StellarService from '../api/rest/stellar';


class StellarAccountStore {


    @observable account = {};
    @observable secretKey = '';

    GQLClient: ApolloClient<any>;
    UI: UIStore;
    service: StellarService;

    constructor(GQLClient: ApolloClient<any>,
                service: StellarService,
                UI: UIStore){
        this.GQLClient = GQLClient;
        this.service = service;
        this.UI = UI;
    }


    @action.bound
    clearAccountInfo(){
        this.account = {};
        this.secretKey = '';
        this.service.clearData();
    }

    login = flow((function * (this:StellarAccountStore){
        // noinspection JSPotentiallyInvalidUsageOfClassThis

        this.UI.loginModalLoading = true;


        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * Verify key existence
         !!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

        //verify the key is of the right format and initialize the service
        const initialized = this.service.setKey(this.secretKey);
        if(!initialized){
            this.UI.setLoginModalErrorMessage("Not a valid key!");
            return;
        }


        //check to make sure that the key is actually live on the network
        try {
            this.account = yield this.service.getAccount()
        }catch(err) {
            if(err === StellarService.ErrorCodes.KEY_NOT_SET)
                this.UI.setLoginModalErrorMessage("Key not set!");
            else if(err === StellarService.ErrorCodes.NO_ACCOUNT)
                this.UI.setLoginModalErrorMessage("No public account belonging to that key found!");
            else
                this.UI.setLoginModalErrorMessage("Unknown error");
            return;
        }


        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * Log in with shop server
         !!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

        //get the signed payload for login verification with the silent shop server
        const [payload, signature] = this.service.generatePackageAndSignature() as Iterable<string>;

        const stellarPublicKey = this.service.keyPair.publicKey();


        yield this.GQLClient.mutate({
                    mutation: login,
                    variables: {
                        stellarPublicKey,
                        payload,
                        signature
                    },

                    //show that our user is logged in on the server
                    update: (cache, data) => {

                        const {login} = data.data as Login.Mutation;

                        if(!login) return;

                        cache.writeData({
                            data: {
                                currentUser: login
                            }
                        })

                    }
                });


        // noinspection JSPotentiallyInvalidUsageOfClassThis
        this.UI.closeLoginModal();
    }).bind(this));

}


/********************************************************************************
 * GraphQL Queries
 ********************************************************************************/

const login = gql`
    mutation login($stellarPublicKey: String!, $payload: String!, $signature: String!){
        login(stellarPublicKey: $stellarPublicKey, payload: $payload, signature: $signature){
            id
            username
        }
    }
`;



export default StellarAccountStore;