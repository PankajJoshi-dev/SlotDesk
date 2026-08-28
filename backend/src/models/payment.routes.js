import express from "express";
import { createRazorpayOrder } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", createRazorpayOrder);

export default paymentRouter;
