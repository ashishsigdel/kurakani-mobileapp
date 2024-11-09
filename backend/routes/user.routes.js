import express from "express";

import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router
  .route("/update")
  .put(authMiddleware, upload.single("profilePic"), userController.update);

router
  .route("/find-friends")
  .get(authMiddleware, userController.getRandomUsers);

router.route("/get/:userId").get(authMiddleware, userController.getProfile);

export default router;
