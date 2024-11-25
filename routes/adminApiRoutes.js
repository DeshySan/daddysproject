import express from "express";
import {
  getAPIkeyController,
  getProductsFromBO,
} from "../controllers/adminApiController.js";

const router = express.Router();

router.get("/api-key", getAPIkeyController);
router.get("/get-products", getProductsFromBO);

export default router;
