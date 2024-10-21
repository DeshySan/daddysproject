import express from "express";
import {
  deleteCategory,
  getCategory,
  postCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/get-category", getCategory);
router.post("/post-category", postCategory);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);
export default router;
