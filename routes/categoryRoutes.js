import express from "express";
import {
  deleteCategory,
  getCategory,
  getSingleCategory,
  postCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/get-category", getCategory);
router.post("/post-category", postCategory);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);
router.get("/get-single/:id", getSingleCategory);
export default router;
