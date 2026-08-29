import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const paymentRouter = express.Router();

paymentRouter.route("/create-order").post(verifyJWT, createRazorpayOrder);
paymentRouter.route("/verify-payment").post(verifyJWT, verifyPayment);

export default paymentRouter;
