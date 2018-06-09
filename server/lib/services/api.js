"use strict";
// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
/** express */
const express = require("express");
const router = express.Router();
const userUtils = require("./utils.js");
/** Express */
const expressImport = require("express");
const expressEngine = expressImport();
/** Cors */
const cors = require("cors");
expressEngine.use(cors({ origin: true }));
/** Import Routes */
const cartRoute = require("./cart.js");
const categoryRoute = require("./category.js");
const chatRoute = require("./chat.js");
const usersRoute = require("./users.js");
const productsRoute = require("./products.js");
/** Assign Routes */
router.use("/categories", categoryRoute);
router.use("/cart", cartRoute);
router.use("/chat", chatRoute);
router.use("/products", productsRoute);
router.use("/users", usersRoute);
/** Exports */
const exporter = {
    router: router,
    expressEngine: expressEngine
};
module.exports = exporter;
//# sourceMappingURL=api.js.map
