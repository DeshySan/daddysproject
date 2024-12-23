import express from "express";
import {
  deleteCategorybyBatch,
  deleteProductsbyBatch,
  deleteVouchers,
  getAPIkeyController,
  getCategoryFromBO,
  getProductsFromBO,
  getVoucher,
  getVouchers,
  postVoucher,
} from "../controllers/adminApiController.js";

const router = express.Router();

router.get("/api-key", getAPIkeyController);
router.get("/get-products", getProductsFromBO);
router.get("/get-category", getCategoryFromBO);
router.delete("/delete-cat", deleteCategorybyBatch);
router.delete("/delete-batch-products", deleteProductsbyBatch);
router.post("/post-vouchers", postVoucher);
router.get("/get-voucher", getVoucher);
router.get("/get-vouchers", getVouchers);
router.delete("/delete-vouchers/:id", deleteVouchers);
export default router;
