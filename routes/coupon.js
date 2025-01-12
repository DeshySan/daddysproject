import express from "express";
import {
  getCoupon,
  postCoupon,
  updateCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

router.post("/post-coupon", postCoupon);
router.get("/get-coupon", getCoupon);
router.put("/update-coupon/:id", updateCoupon);
export default router;
