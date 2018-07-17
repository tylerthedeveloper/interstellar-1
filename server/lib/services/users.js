import stellar from 'stellar-sdk';

class Users {

    static verifySignature(publicKey, payload, signature){
        return stellar.Keypair.fromPublicKey(publicKey).verify(payload, Buffer.from(signature, 'base64'));
    }

}

export default Users;
