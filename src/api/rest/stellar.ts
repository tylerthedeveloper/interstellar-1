import * as stellar from 'stellar-sdk';

enum ErrorCodes {
    KEY_NOT_SET,
    NO_ACCOUNT
}

class StellarService {

    keyPair: stellar.Keypair;
    account: stellar.Account;
    server: stellar.Server;
    static ErrorCodes = ErrorCodes;

    constructor(){
        this.server = new stellar.Server('https://horizon-testnet.stellar.org');
        stellar.Network.useTestNetwork();
    }


    clearData = (): void => {
        delete this.keyPair;
        delete this.account;
    };


    /***
     * Sets the KeyPair; returns true iff it looks like a valid secretkey
     */
    setKey = (secretKey: string): Boolean => {
        console.log(secretKey);
        try {
            this.keyPair = stellar.Keypair.fromSecret(secretKey);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    };

    /***
     * Checks to see if the service has been set up with the proper keys
     */
    isInitialized = (): boolean => {
        return Boolean(this.keyPair && this.keyPair.canSign());
    };


    /***
     * Tries to load the account associated with the current KeyPair
     *
     */
    getAccount = ():Promise<stellar.Account> => {

        if(!this.isInitialized())
            return Promise.reject(StellarService.ErrorCodes.KEY_NOT_SET);


        if(this.account)
            return Promise.resolve(this.account);


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

    __generatePackageToSign = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    __generateSignature = (pkg:string) => {
        return this.keyPair.sign(new Buffer(pkg)).toString('base64');
    };

    generatePackageAndSignature = () => {
        if(!this.isInitialized()){
            return;
        }

        const pkg = this.__generatePackageToSign();
        const sig = this.__generateSignature(pkg);
        return [pkg, sig];

    };

}

export default StellarService;