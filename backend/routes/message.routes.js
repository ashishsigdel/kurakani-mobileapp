import express from "express";

import * as messageController from "../controllers/message.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router
  .route("/send/:conversationId/:receiverId")
  .post(authMiddleware, upload.single("media"), messageController.sendMessage);

router
  .route("/get/:conversationId")
  .get(authMiddleware, messageController.fetchAllMessages);

router
  .route("/get-friend/:conversationId")
  .get(authMiddleware, messageController.getUserByConversationId);

export default router;
