import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/paymentController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  "/checkout",
  //protect,
  checkout
  );

router.post(
  "/paymentverification",
  //protect,
  paymentVerification
  );

export default router;
