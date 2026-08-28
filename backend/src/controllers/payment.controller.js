import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import razorpay from "../config/razorpay.config.js";

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

export { createRazorpayOrder };
