// import firebase from 'firebase';
// import * as firebase from 'firebase/app';
// import "@firebase/firestore";
import firedb  from "../../_firebase";

class ProductService {

    constructor() {
        this.productsCollection = firedb.collection('products');
        this.sellersCollection = firedb.collection('users');
        // // this.categorysCollection = firedb.collection('categories');
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    
    addProduct(product) {
        const doc = this.productsCollection.doc();
        const docID = doc.id;
        product.id = docID;
        console.log(product)
        // todo: index vs duplication users-products / cat products
        return this.productsCollection
            .doc(docID)
            .set(product)
            .then((documentSnapshot) => docID);
    }

    /**
     */
    getAllProducts() {
        return this.productsCollection
            .get()
            .then(querySnapshot => 
                querySnapshot.docs.map((documentSnapshot) => 
                    documentSnapshot.data()
                )
            );
    }

    /**
     * @param  {string} productID
     */
    getProductById(productID) {
        console.log(productID)
        return this.productsCollection
            .doc(productID)
            .get()
            .then((documentSnapshot) => 
                documentSnapshot.data()
            );
    }

    getProductsByCategory(categoryID) {
        console.log(categoryID)
        return this.productsCollection
            .where('category', '==', categoryID)
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
    getProductsByUserID(userID) {
        return this.productsCollection
            .where("productSellerID", "==", userID)
            .get()
            .then(querySnapshot => 
                querySnapshot.docs.map((documentSnapshot) => 
                    documentSnapshot.data()
                )
            );
    }

    getActiveSellers() {
        return this.productsCollection 
            .get()
            .then(querySnapshot => {
                const sellerIDs = new Set();
                // FIXME: REMOVE THIS NULL CHECK, EVERY PRODUCT SHOULD HAVE A SELLER, THIS IS FOR CURRENT DATA TESTING ONLY
                querySnapshot.docs.map((documentSnapshot) => {
                    if (documentSnapshot.data().productSeller && documentSnapshot.data().productSeller !== null) 
                        sellerIDs.add(this.sellersCollection.doc(documentSnapshot.data().productSeller))
                    } 
                )
                console.log(sellerIDs)
                return sellerIDs;
            })
            .then(sellerIDs => firedb.getAll(Array.from(sellerIDs)))
    }

    updateProduct(product) {
        return this.productsCollection
                .doc(product.id)
                .update(product, { merge: true})
                .then((documentSnapshot) => documentSnapshot);
    }

    deleteProduct(productID) {
        return this.productsCollection
                .doc(productID)
                .delete()
                .then((documentSnapshot) => productID);
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

// ProductService = new ProductService();
export default new ProductService();
