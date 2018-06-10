import stellar from 'stellar-sdk';

import {StatusSymbols} from "../models/local/login_modal";

class StellarService {

    constructor(){
        this.server = new stellar.Server('https://horizon-testnet.stellar.org');
        stellar.Network.useTestNetwork();
    }

    verifyKey = (key) => {
        let publicKey;
        try {
            publicKey = stellar.Keypair.fromSecret(key).publicKey();
        }catch(err){
            return Promise.reject({
                code: StatusSymbols.INVALID_KEY_FORMAT,
                message: "Invalid secret key"
            });
        }

        return this.server.loadAccount(publicKey)
            .catch(err => {
                return Promise.reject({
                    code: StatusSymbols.NO_ACCOUNT,
                    message: err
                });
            });
    }

}

export default new StellarService();