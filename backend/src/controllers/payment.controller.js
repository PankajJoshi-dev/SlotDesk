import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import razorpay from "../config/razorpay.config.js";
import crypto from "crypto";

const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const razorpayOrder = await razorpay.orders.create(options);

  if (!razorpayOrder) {
    throw new ApiError(
      500,
      "razorpayOrder",
      "Failed to create Razorpay Order.",
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        razorpayOrder,
        "Razorpay Order created successfully.",
      ),
    );
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(payload)
    .digest("hex");

  const isSignatureValid = expectedSignature === razorpay_signature;

  if (!isSignatureValid) {
    throw new ApiError(
      400,
      "payment",
      "Payment verification failed. Invalid cryptographic signature.",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Payment verified successfully."));
});

export { createRazorpayOrder, verifyPayment };
