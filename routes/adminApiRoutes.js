import express from "express";
import { getAPIkeyController } from "../controllers/adminApiController.js";

const router = express.Router();

router.get("/api-key", getAPIkeyController);

export default router;
