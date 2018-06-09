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

//set up the public directory


//establish the firebase connection TODO i'd probably move this to a separate folder
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://galactic-storage.firebaseio.com"
});
const firedb = admin.firestore();


/**************************************
 * Attach all of the Express Middleware
 **************************************/

const app = express();


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//graphql attachments
app.use("/gql", bodyParser.json(), graphqlExpress({ schema: schema }));
app.use("/iql", graphiqlExpress({ endpointURL: "/gql" }));


//TODO figure out what this is -- we really should be using a cors middleware
// //if we are allow cross domain access
// app.use(function(req, res, next) {
//     req.db = res.db = firedb;
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS"
//     );
//
//     //TODO this is clearly not correct as we are NOT returning JSON at this point
//     res.append("Content-Type", "application/json");
//     next();
// });


//set the static asset directory
const publicDir = path.resolve(__dirname, "../dist");
app.use(express.static(publicDir));
app.use(fallback(path.resolve(publicDir, "./index.html")));

export default app;
