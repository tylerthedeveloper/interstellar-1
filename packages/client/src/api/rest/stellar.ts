import * as stellar from "stellar-sdk";

enum ErrorCodes {
    KEY_NOT_SET,
    NO_ACCOUNT,
}

class StellarService {
    public static ErrorCodes = ErrorCodes;

    public keyPair: stellar.Keypair;
    public account: stellar.Account;
    public server: stellar.Server;

    constructor() {
        this.server = new stellar.Server("https://horizon-testnet.stellar.org");
        stellar.Network.useTestNetwork();
    }

    public clearData = (): void => {
        delete this.keyPair;
        delete this.account;
    }

    /***
     * Sets the KeyPair; returns true iff it looks like a valid secretkey
     */
    public setKey = (secretKey: string): boolean => {
        try {
            this.keyPair = stellar.Keypair.fromSecret(secretKey);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    /***
     * Checks to see if the service has been set up with the proper keys
     */
    public isInitialized = (): boolean => {
        return Boolean(this.keyPair && this.keyPair.canSign());
    }

    /***
     * Tries to load the account associated with the current KeyPair
     *
     */
    public getAccount = (): Promise<stellar.Account> => {

        if (!this.isInitialized()) {
            return Promise.reject(StellarService.ErrorCodes.KEY_NOT_SET);
        }

        if (this.account) {
            return Promise.resolve(this.account);
        }

        return this.server.loadAccount(this.keyPair.publicKey())
            .then((account) => {
              this.account = account;
              return account;
            }).catch((err) => {
                return Promise.reject(StellarService.ErrorCodes.NO_ACCOUNT);
            });
    }

    /**
     * Creates a package to sign and send to the gateway for authentication
     */

    private generatePackageToSign = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private generateSignature = (pkg: string) => {
        return this.keyPair.sign(new Buffer(pkg)).toString("base64");
    }

    public generatePackageAndSignature = () => {
        if (!this.isInitialized()) {
            return;
        }

        const pkg = this.generatePackageToSign();
        const sig = this.generateSignature(pkg);
        return [pkg, sig];

    }

}

export default StellarService;
