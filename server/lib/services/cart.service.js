const firedb = require("../../_firebase");

class CartService {

    constructor() {
        this.cartItemsCollection = firedb.collection('user-cart');
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    // todo: pass context ID separately
    addToCart(userID, cartItem) {
        const doc = this.cartItemsCollection.doc(cartItem.userID).collection("cartItems").doc();
        const docID = doc.id;
        cartItem.id = docID;
        return doc
            .set(cartItem)
            .then((documentSnapshot) => docID);
    }

    getMyCart(userID) {
        console.log(userID)
        return this.cartItemsCollection
            .doc(userID)
            .collection("cartItems")
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                    docSnapshot.data()
                )
            );
    }

    updateCartItem(cartItem) {
        return this.cartItemsCollection
                .doc(cartItem.id)
                .update(cartItem, { merge: true})
                .then((documentSnapshot) => documentSnapshot);
    }

    removeFromCart(userID, cartItemID) {
        return this.cartItemsCollection
            .doc(userID)
            .collection("cartItems")
            .doc(cartItemID)
            .delete()
            .then((documentSnapshot) => 
                documentSnapshot
            );

    }
    
    // todo: batching 
    emptyCart(userID) {
            // return this,this.cartItemsCollection
            //     .doc(cartItemID)
            //     .delete()
            //     .then((documentSnapshot) => userID);
    }
    
    // ────────────────────────────────────────────────────────────────────────────────
}

module.exports = new CartService();
