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
        return this.categorysCollection
            .get()
            .then(querySnapshot => 
                querySnapshot.docs.map((documentSnapshot) => 
                    documentSnapshot.data()
            )
        );
    }

    getCategoryByID(categoryID) {
        return this.categorysCollection
            .doc(categoryID)
            .get()
            .then((documentSnapshot) => 
                documentSnapshot.data()
            );
    }


    // ────────────────────────────────────────────────────────────────────────────────
}

export default new CategoryService();
