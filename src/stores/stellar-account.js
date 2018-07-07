import {observable, action, flow} from 'mobx';
import {login} from '../api/gql/auth';
import StellarService from '../api/rest/stellar';



class StellarAccountStore {


    @observable account = {};
    @observable secretKey = '';


    constructor(GQLClient, StellarService, UI){
        this.GQLClient = GQLClient;
        this.StellarService = StellarService;
        this.UI = UI;
    }


    @action.bound
    clearAccountInfo(){
        this.account = {};
        this.secretKey = '';
    }


    @action.bound
    setKeyFromInputEvent (event) {
        this.secretKey = event.target.value;
    };


    login = flow(function * (){

        this.UI.loginModalLoading = true;


        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * Verify key existence
         !!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

        //verify the key is of the right format and initialize the StellarService
        const initialized = this.StellarService.setKey(this.secretKey);
        if(!initialized){
            this.UI.setLoginModalErrorMessage("Not a valid key!");
            return;
        }


        //check to make sure that the key is actually live on the network
        try {
            this.account = yield this.StellarService.getAccount()
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
        const [payload, signature] = this.StellarService.generatePackageAndSignature();
        const publicKey = this.StellarService.keyPair.publicKey();

        yield this.GQLClient.mutate({
                    mutation: login,
                    variables: {
                        publicKey,
                        payload,
                        signature
                    },

                    //show that our user is logged in on the server
                    update: (cache, {data: {login: {id}}}) => {
                        cache.writeData({
                            data: {
                                currentUser: {
                                    __typename: "UserType",
                                    id
                                }
                            }
                        })
                    }
                });


        this.UI.closeLoginModal();
    });

}


export default StellarAccountStore;