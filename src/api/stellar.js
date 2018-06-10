import stellar from 'stellar-sdk';

class StellarService {

    keyPair: stellar.Keypair;
    account: Object;

    static ErrorCodes = {
        KEY_NOT_SET: 0,
        NO_ACCOUNT: 1
    };

    constructor(){
        this.server = new stellar.Server('https://horizon-testnet.stellar.org');
        stellar.Network.useTestNetwork();
    }


    clearData = (): void => {
        this.keyPair = null;
        this.account = null;
    };


    /***
     * Sets the KeyPair; returns true iff it looks like a valid secretkey
     */
    setKey = (secretKey: String): Boolean => {
        try {
            this.keyPair = stellar.Keypair.fromSecret(secretKey);
            return true;
        }catch(err){
            return false;
        }
    };

    /***
     * Checks to see if the service has been set up with the proper keys
     */
    isInitialized = (): Boolean => {
        return this.keyPair && this.keyPair.canSign();
    };


    /***
     * Tries to load the account associated with the current KeyPair
     *
     */
    getAccount = ():Promise => {

        if(!this.isInitialized()){
            return Promise.reject(StellarService.ErrorCodes.KEY_NOT_SET);
        }

        if(this.account){
            return Promise.resolve(this.account);
        }


        return this.server.loadAccount(this.keyPair.publicKey())
            .then(account => {
              this.account = account;
              return account;
            }).catch(err => {
                return Promise.reject(StellarService.ErrorCodes.NO_ACCOUNT);
            });
    };

    /**
     * Creates a package to sign and send to the server for authentication
     */

    generatePackageToSign = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

}

export default new StellarService();