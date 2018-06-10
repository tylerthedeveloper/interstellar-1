"use strict";
// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
/** express */
import { Router } from "express";
const router = Router();
import userUtils from "./utils.js";
/** Express */
import expressImport from "express";
const expressEngine = expressImport();
/** Cors */
import cors from "cors";
expressEngine.use(cors({ origin: true }));
/** Import Routes */
import cartRoute from "./cart.js";
import categoryRoute from "./category.js";
import chatRoute from "./chat.js";
import usersRoute from "./users.js";
import productsRoute from "./products.js";
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
export default exporter;
//# sourceMappingURL=api.js.map
