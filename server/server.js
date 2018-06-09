import express from "express";
import bodyParser from "body-parser";
import fallback from "express-history-api-fallback";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import path from "path";
import schema from "./lib/graphql/schema";

import firebase from "firebase";
import admin from "firebase-admin";
import api from "./lib/routes/api.js";
import serviceAccount from "./_firebase.js";

const publicDir = path.resolve(__dirname, "../dist");
console.log(publicDir);
const app = express();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://galactic-storage.firebaseio.com"
});
const firedb = admin.firestore();

app.use(bodyParser.json());
app.use("/gql", bodyParser.json(), graphqlExpress({ schema: schema }));
app.use("/iql", graphiqlExpress({ endpointURL: "/gql" }));
app.use(function(req, res, next) {
    req.db = res.db = firedb;
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.append("Content-Type", "application/json");
    next();
});
app.use("/api", api.router);

app.get("/", function(req, res) {
    console.log(path.resolve(publicDir, "./index.html"));
    res.sendFile(path.resolve(publicDir, "./index.html"));
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(express.static(publicDir));
app.use(fallback(path.resolve(publicDir, "./index.html")));

export default app;
