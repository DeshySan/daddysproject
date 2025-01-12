import express from "express";
import { postInvoice } from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/post-invoice", postInvoice);

export default router;
