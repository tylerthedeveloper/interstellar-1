// import firebase from 'firebase';
// import * as firebase from 'firebase/app';
// import "@firebase/firestore";
const firedb = require("../../_firebase");

class ProductService {

    
    constructor() {
        this.productsCollection = firedb.collection('products');
        // this.productCategoriesCollection;
        // userProductsCollection;
        // myProductRef;
        // this.productCategoriesCollection = afs.collection('products-categories');
        // this.userProductsCollection = afs.collection('users-products');
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //

    /**
     */
    // convert to promise
    getAllProducts() {
        return this.productsCollection.get().then(snapshot => snapshot.docs.map((docSnapshot) => docSnapshot.data()));
    }

    /**
     * @returns string
     */
    getNewProductID() {
        const _newProductID = this.afs.createId();
        return _newProductID;
    }

    /**
     * @param  {string} productData
     * @returns Promise
     */
    addProduct(productData) {
        const _productData = JSON.parse(productData);
        const _docID = _productData.id;
        const _cat = _productData.productCategory;
        const batch = this.afs.firestore.batch();
        batch.set(this.productsCollection.doc(_docID).ref, _productData);
        batch.set(this.userProductsCollection.doc(this._userID).collection('products').doc(_docID).ref, _productData);
        batch.set(this.productCategoriesCollection.doc(_cat).collection('products').doc(_docID).ref, _productData);
        return batch.commit().then(() => _docID);
    }

    /**
     * @param  {string} key
     * @param  {{}} newProductData
     * @returns Promise
     */
    updateProduct(key, newProductData) {
        return this.productsCollection.doc(key).update(newProductData);
    }

    /**
     * @param  {Array<any>} pairArray
     * @returns Observable
     */
    updateProductQuantities(pairArray) {
        const batch = this.afs.firestore.batch();
        pairArray.map(pair => {
            const prodID = pair.productID;
            const sellerID = pair.sellerID;
            const newProdQuant = pair.newQuantity;
            const category = pair.category;
            const quantPairDict = {quantity: newProdQuant};
            console.log(newProdQuant);
            batch.update(this.productsCollection.doc(prodID).ref, quantPairDict);
            batch.update(this.userProductsCollection.doc(sellerID).collection('products').doc(prodID).ref, quantPairDict);
            batch.update(this.productCategoriesCollection.doc(category).collection('products').doc(prodID).ref, quantPairDict);
        });
        return batch.commit();
    }

    /**
     * @param  {string} productID
     * @param  {string} category
     * @returns Promise
     */
    deleteProduct(productID, category) {
        const batch = this.afs.firestore.batch();
        batch.delete(this.productsCollection.doc(productID).ref);
        batch.delete(this.userProductsCollection.doc(`${this._userID}/products/${productID}`).ref);
        batch.delete(this.productCategoriesCollection.doc(`${category}/products/${productID}`).ref);
        return batch.commit();
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: Q U E R Y   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //
    /**
     // TODO: TEST THESE and IMPLEMENT ALGOLIA!!!
     * @param  {string} productID
     * @returns Observable
     */
    getProductByProductId(productID) {
        return Observable.create((observer) => {
            this.afs.collection('products', ref => ref.where('id', '==', productID))
                .valueChanges()
                .subscribe(prod => {
                    observer.next(prod[0]);
                });
        });
    }

    getProductQuantity(productID) {
        return Observable.create((observer) => {
            // this.productsCollection
            this.afs.collection('products', ref => ref.where('id', '==', productID))
                .valueChanges()
                .subscribe(prod => {
                    // const _product = prod as Product;
                    console.log(prod);
                    observer.next(prod[0]);
                });
        });
    }

    /**
     * @param  {string} userID
     * @returns Observable
     */
    getProductsByUserID(userID) {
        return this.userProductsCollection.doc(userID).collection('products').valueChanges();
    }

    getProductsByUserName(name) {
        return;
    }

    /**
     * @param  {string} category
     * @returns Observable
     */
    getProductsByCategory(category) {
        return this.productCategoriesCollection.doc(category).collection('products').valueChanges();
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

ProductService = new ProductService();
// export default ProductService;
module.exports = ProductService;
