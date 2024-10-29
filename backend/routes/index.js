import express from "express";

import authRoute from "./auth.routes.js";
import connectionRoute from "./connection.routes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/connection", connectionRoute);

export default router;
