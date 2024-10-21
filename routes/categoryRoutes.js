import express from "express";
import {
  getCategory,
  postCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/get-category", getCategory);
router.post("/post-category", postCategory);
router.put("/update-category/:id", updateCategory);
export default router;
