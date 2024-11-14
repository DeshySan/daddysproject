import express from "express";
import {
  getFamily,
  postFamily,
  updateFamily,
} from "../controllers/familyController.js";

const router = express.Router();

router.post("/post-family", postFamily);
router.get("/get-family", getFamily);
router.put("/put-family/:id", updateFamily);
export default router;
