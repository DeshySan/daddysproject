import express from "express";
import { postMember } from "../controllers/memberController.js";

const router = express.Router();
// router.get("/get-member", getMembe);

router.post("/post-member", postMember);
export default router;
