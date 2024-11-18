import express from "express";
import {
  getFamily,
  getFamilyProducts,
  postFamily,
  updateFamily,
} from "../controllers/familyController.js";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Store file with a unique name
  },
});

const upload = multer({ storage: storage });

router.post("/post-family", upload.single("image"), postFamily);
router.get("/get-family", getFamily);
router.put("/put-family/:id", updateFamily);
router.get("/get-family-products/:id", getFamilyProducts);
export default router;
