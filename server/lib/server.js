"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import everything from express and assign it to the express variable
const express = require("express");
// Create a new express application instance
const app = express();

// TODO: ISSUE WITH IMPORT
// const jsonGraphqlExpress = require('json-graphql-server');
// const data = require('./graphql/mock-db/db.js').data;
// app.use('/graphql', jsonGraphqlExpress(data));

// Import graphQL for express
const expressGraphQL = require("express-graphql");
const schema = require("./graphql/schema");
app.use(
    "/graphql",
    expressGraphQL({
        graphiql: true,
        schema: schema
    })
);

// The port the express app will listen on
const port = process.env.PORT || 4000;
/** Imports */
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** Paths */
const rootPath = "./"; // Root path
// todo
const api = require("./routes/api.js"); // API file
const docsPath = "app/documentation"; // Docs Path
// /** Firebase */

app.use(function(req, res, next) {
    req.db = res.db = firedb;
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
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
/*
    // Headers
    /** Setters 
    app.use(express.static(path.join(rootPath, 'dist'))); // DIST output folder
    app.use('/documentation', express.static(path.join(rootPath, 'documentation'))); // Docs location
    app.set('admin', api.admin);
    */
// API location
app.use("/api", api.router);
// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
module.exports = app;
// new end comment 9
// https://stackoverflow.com/questions/42637794/how-to-pass-multiple-params-to-express-with-the-angularjs-service
// https://stackoverflow.com/questions/43575514/route-parameters-in-angular-2-and-express-api-get-single-post
// https://webapplog.com/intro-to-express-js-parameters-error-handling-and-other-middleware/
// https://stackoverflow.com/questions/37378050/how-to-get-and-set-data-to-firebase-with-node-js
// https://dev.to/briandgls/using-typescript-with-express--e0k
// https://firebase.google.com/docs/admin/setup#initialize_the_sdk
//# sourceMappingURL=server.js.map
