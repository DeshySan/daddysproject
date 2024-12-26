// paymentRoutes.js
import express from "express";

import { makePayment } from "./adyenClient.js";

const router = express.Router();

router.post("/make-payment", makePayment);

export default router;
