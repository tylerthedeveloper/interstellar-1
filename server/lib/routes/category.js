"use strict";
/** Firesbase */
require("firebase");
const categoryRouter = require("express").Router();
categoryRouter.get("/", (req, res) => {
    req.db
        .collection("categories")
        .get()
        .then((collectionSnapshot) => {
            const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            res.status(res.statusCode).send(docs);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

categoryRouter.post("/", (req, res) => {
    console.log("post category");
    const nextID = req.db.collection("categories").doc().id;
    const productCategory = req.body;
    productCategory.id = nextID;
    console.log("nextID " + nextID)    
    req.db
        .collection("categories")
        .add(productCategory)
        .then(documentSnapshot => {
            console.log(documentSnapshot.data())
            console.log(documentSnapshot)
            console.log("documentSnapshot.data()")
            res.status(res.statusCode).send(documentSnapshot.data());
        })
        .catch((err) => {
            res.status(res.statusCode).send(err);
        });
});

categoryRouter.get("/:category", (req, res) => {
    console.log("get categoried products");
    const category = req.params["category"];
    req.db
        .collection("products-categories")
        .doc(category)
        .collection("products")
        .get()
        .then((collectionSnapshot) => {
            console.log("get categoried products on server");
            const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            res.status(res.statusCode).send(docs);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

module.exports = categoryRouter;
