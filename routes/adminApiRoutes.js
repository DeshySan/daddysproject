import express from "express";
import {
  deleteCategorybyBatch,
  deleteProductsbyBatch,
  getAPIkeyController,
  getCategoryFromBO,
  getProductsFromBO,
} from "../controllers/adminApiController.js";

const router = express.Router();

router.get("/api-key", getAPIkeyController);
router.get("/get-products", getProductsFromBO);
router.get("/get-category", getCategoryFromBO);
router.delete("/delete-cat", deleteCategorybyBatch);
router.delete("/delete-batch-products", deleteProductsbyBatch);
export default router;
