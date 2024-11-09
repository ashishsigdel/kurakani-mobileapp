import express from "express";

import authRoute from "./auth.routes.js";
import connectionRoute from "./connection.routes.js";
import userRoute from "./user.routes.js";
import messageRoute from "./message.routes.js";
import resetPasswordRoute from "./resetPassword.routes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/connection", connectionRoute);
router.use("/user", userRoute);
router.use("/message", messageRoute);
router.use("/reset-password", resetPasswordRoute);

export default router;
