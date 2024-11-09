import express from "express";
import {
  getAllMembers,
  loginMember,
  postMember,
} from "../controllers/memberController.js";

const router = express.Router();
router.get("/get-member", getAllMembers);

router.post("/post-member", postMember);
router.post("/login-member", loginMember);
export default router;
