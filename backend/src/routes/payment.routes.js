import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createRazorpayOrderSchema,
  verifyPaymentSchema,
} from "../validators/payment.validator.js";

const paymentRouter = express.Router();

paymentRouter
  .route("/create-order")
  .post(verifyJWT, validate(createRazorpayOrderSchema), createRazorpayOrder);
paymentRouter
  .route("/verify-payment")
  .post(verifyJWT, validate(verifyPaymentSchema), verifyPayment);

export default paymentRouter;
