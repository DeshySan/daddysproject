import {
  deleteProduct,
  getProduct,
  getSingleProduct,
  postProduct,
  updateProduct,
} from "../controllers/productController.js";
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();
//Will move the below function for Middleware multer into a different file later

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Store file with a unique name
  },
});

const upload = multer({ storage: storage });

router.post("/post-product", upload.single("image"), postProduct);
router.get("/get-product", getProduct);
router.get("/get-product/:id", getSingleProduct);
router.get("/get-product/:id", getSingleProduct);
router.delete("/delete-product/:id", deleteProduct);
router.put("/update-product/:id", upload.single("image"), updateProduct);
export default router;
