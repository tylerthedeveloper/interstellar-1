// import firebase from 'firebase';
// import * as firebase from 'firebase/app';
// import "@firebase/firestore";
import firedb  from "../../_firebase";

class ProductService {

    constructor() {
        this.categorysCollection = firedb.collection('categories');
        this.productsCollection = firedb.collection('products');
        // this.userProductsCollection = firedb.collection('users-products');
        // myProductRef;
        // this.productCategoriesCollection = afs.collection('products-categories');
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
        const categoryID = product.categoryID;
        // todo: index vs duplication users-products / cat products
        return this.categorysCollection
            .doc(categoryID)
            .collection("products")
            .doc(docID)
            .set(product)
            .then((documentSnapshot) => docID);
    }

    /**
     */
    getAllProducts() {
        return this.productsCollection
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                    docSnapshot.data()
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
            .then((documentSnapshot) => documentSnapshot.data());
    }


    /**
     * @param  {string} userID
    */
    getProductsByUserID(userID) {
        return this.productsCollection
            .where("productSellerID", "==", userID)
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                    docSnapshot.data()
                )
            );
        // return this.userProductsCollection
        //     .doc(userID)
        //     .collection('products')
        //     .get()
        //     .then(snapshot => 
        //         snapshot.docs.map((docSnapshot) => 
        //             docSnapshot.data()
        //         )
        //     );
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
