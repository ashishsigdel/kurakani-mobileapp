import express from "express";

import * as connectionController from "../controllers/connection.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router
  .route("/send-request")
  .post(authMiddleware, connectionController.sendRequest);

export default router;
