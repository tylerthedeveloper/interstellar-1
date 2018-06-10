//establish the firebase connection TODO i'd probably move this to a separate folder
import firedb from "./_firebase.js";

/**************************************
 * Attach all of the Express Middleware
 **************************************/
import express from "express";
import path from "path";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import schema from "./lib/graphql/schema";
import bodyParser from "body-parser";
import fallback from "express-history-api-fallback";
import session from 'express-session';
import cors from 'cors';

const app = express();

//attaching session data
//TODO switch this out with an off-process TTL store like redis
app.use(session({
    secret: "Jack Langston is the undisputed best",
    resave: true,
    saveUninitialized: true,
    cookie : {
        maxAge: 1000 * 60
    }
}));


//parsing the body of requests //TODO need to figure out if this is necesary
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//graphql attachments
app.use("/gql", cors(), bodyParser.json(), graphqlExpress(req => ({
    schema: schema,
    context: {
        session: req.session
    }
})));
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


//TODO Remove
//TESTING
app.use("/", (req, res, next) => {
    console.log(req.sessionID);
    next();
});


//set the static asset directory
const publicDir = path.resolve(__dirname, "../dist");
app.use(express.static(publicDir));
app.use(fallback(path.resolve(publicDir, "./index.html")));



export default app;
