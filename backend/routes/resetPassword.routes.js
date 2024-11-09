import express from "express";

import * as resetPasswordController from "../controllers/resetPassword.controller.js";

const router = express.Router();

router.route("/send").post(resetPasswordController.sendOtp);
router.route("/verify").post(resetPasswordController.verifyOTP);
router.route("/change").post(resetPasswordController.resetPassword);

export default router;
