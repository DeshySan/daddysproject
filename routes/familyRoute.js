import express from "express";
import {
  getFamily,
  getFamilyProducts,
  postFamily,
  updateFamily,
} from "../controllers/familyController.js";

const router = express.Router();

router.post("/post-family", postFamily);
router.get("/get-family", getFamily);
router.put("/put-family/:id", updateFamily);
router.get("/get-family-products/:id", getFamilyProducts);
export default router;
