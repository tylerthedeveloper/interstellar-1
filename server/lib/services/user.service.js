import firedb  from "../../_firebase";
import stellar from 'stellar-sdk';

class UserService {

    constructor() {
        this.usersCollection = firedb.collection('users');
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    
    /**
     */
    getAllUsers() {
        return this.usersCollection
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                    docSnapshot.data()
                )
            );
    }

    /**
     * @param  {string} userID
     */
    getUserById(userID) {
        return this.usersCollection
            .doc(userID)
            .get()
            .then((documentSnapshot) => 
                documentSnapshot.data()
            );
    }

    createUser(user) {
        const doc = this.usersCollection.doc();
        const docID = doc.id;
        user.id = docID;
        // todo: check if better return from post
        return doc
                .set(user)
                .then((documentSnapshot) => docID);
    }

    updateUser(user) {
        return this.usersCollection
                .doc(user.id)
                .update(user, { merge: true})
                .then((documentSnapshot) => console.log(documentSnapshot));
    }

    /**
     * @param  {string} userID
     */
    // todo: test for first or take
    // todo: test for not found user
    getUserByPublicKey(publicKey) {
        return this.usersCollection
            .where("publicKey", "==", publicKey)
            .get()
            .then((QuerySnapshot) => {
                if(QuerySnapshot.docs[0])
                    return QuerySnapshot.docs[0].data();
                else
                    throw 'no user';
            });
    }

    verifySignature(publicKey, payload, signature){
        return stellar.Keypair.fromPublicKey(publicKey).verify(payload, Buffer.from(signature, 'base64'));
    }

    deleteUser(userID) {
        return this.usersCollection
                .doc(userID)
                .delete()
                .then((documentSnapshot) => userID);
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

export default new UserService();
