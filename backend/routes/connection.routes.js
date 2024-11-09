import express from "express";

import * as connectionController from "../controllers/connection.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router
  .route("/send-request")
  .post(authMiddleware, connectionController.sendRequest);
router
  .route("/accept-request")
  .post(authMiddleware, connectionController.acceptRequest);

router
  .route("/reject-request")
  .post(authMiddleware, connectionController.rejectRequest);

router.route("/get").get(authMiddleware, connectionController.fetchConnections);

router
  .route("/get-requests")
  .get(authMiddleware, connectionController.fetchConnectionsRequest);

export default router;
