const firedb = require("../../_firebase");

class UserService {

    constructor() {
        this.usersCollection = firedb.collection('users');
        // this.userCategoriesCollection;
        // userUsersCollection;
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    getAllUsers() {
        return this.usersCollection.get().then(snapshot => snapshot.docs.map((docSnapshot) => docSnapshot.data()));
    }

    /**
     * @param  {string} userID
     */
    getUserByUserId(userID) {
        console.log(userID)
        return this.usersCollection
            .doc(userID)
            .get()
            .then((documentSnapshot) => documentSnapshot.data());
    }

    // /**
    //  * @returns string
    //  */
    // getNewUserID() {
    //     const _newUserID = this.afs.createId();
    //     return _newUserID;
    // }

    // /**
    //  * @param  {string} userData
    //  * @returns Promise
    //  */
    // addUser(userData) {
    //     const _userData = JSON.parse(userData);
    //     const _docID = _userData.id;
    //     const _cat = _userData.userCategory;
    //     const batch = this.afs.firestore.batch();
    //     batch.set(this.usersCollection.doc(_docID).ref, _userData);
    //     batch.set(this.userUsersCollection.doc(this._userID).collection('users').doc(_docID).ref, _userData);
    //     batch.set(this.userCategoriesCollection.doc(_cat).collection('users').doc(_docID).ref, _userData);
    //     return batch.commit().then(() => _docID);
    // }

    // /**
    //  * @param  {string} key
    //  * @param  {{}} newUserData
    //  * @returns Promise
    //  */
    // updateUser(key, newUserData) {
    //     return this.usersCollection.doc(key).update(newUserData);
    // }

    // ────────────────────────────────────────────────────────────────────────────────
}

UserService = new UserService();
module.exports = UserService;
