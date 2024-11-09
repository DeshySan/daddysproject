import express from "express";
import {
  destroySession,
  getAllMembers,
  loginMember,
  postMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.get("/get-member", getAllMembers);
router.get("/destroy-session", destroySession);
router.post("/post-member", postMember);
router.post("/login-member", loginMember);
router.post("/logout", destroySession);
router.get("/sassy-session", (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      return res.status(200).send({
        userId: req.session.userId,
      });
    } else {
      return res.status(403).send({
        message: "Not too sure if the session exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Somethign went wrong" });
  }
});
export default router;
