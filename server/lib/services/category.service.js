import firedb  from "../../_firebase";

class CategoryService {

    constructor() {
        this.categorysCollection = firedb.collection('categories');
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    createNewCategory(category) {
        const doc = this.categorysCollection.doc();
        const docID = doc.id;
        category.id = docID;
        return doc
            .set(category)
            .then((documentSnapshot) => docID);
    }

    getAllCategories() {
        return this.categorysCollection.get().then(snapshot => snapshot.docs.map((docSnapshot) => docSnapshot.data()));
    }

    /**
     * @param  {string} categoryID
     */
    getProductsByCategory(categoryID) {
        console.log(categoryID)
        return this.categorysCollection
            .doc(categoryID)
            .collection('products')
            .get()
            .then(snapshot => 
                snapshot.docs.map((docSnapshot) => 
                    docSnapshot.data()
                )
            );
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

export default new CategoryService();
