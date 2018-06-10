const firedb = require("../../_firebase");

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
        console.log(category)
        return this.categorysCollection
            .add(category)
            .then((docSnapshot) => docSnapshot.id);
    }

    getAllCategories() {
        return this.categorysCollection.get().then(snapshot => snapshot.docs.map((docSnapshot) => docSnapshot.data()));
    }

    /**
     * @param  {string} categoryID
     */
    getProductsByCategory(category) {
        console.log(category)
        return this.categorysCollection
            .doc(category)
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

CategoryService = new CategoryService();
module.exports = CategoryService;