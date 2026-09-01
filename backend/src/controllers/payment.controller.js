import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import razorpay from "../config/razorpay.config.js";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";

const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.validatedBody;

  const booking = await Booking.findById(bookingId).populate("facility");

  if (!booking) {
    throw new ApiError(404, "bookingId", "Booking not found.");
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "access", "You cannot pay for this booking.");
  }

  if (booking.status !== "PENDING") {
    throw new ApiError(400, "booking", "This booking is not awaiting payment.");
  }

  const amount = booking.partySize * booking.facility.slotPrice;
  const amountInPaise = amount * 100;

  let razorpayOrder;

  try {
    razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: booking._id.toString(),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Razorpay order creation failed:", error);
    }

    await Booking.findByIdAndDelete(booking._id);

    throw new ApiError(
      502,
      "razorpayOrder",
      "Failed to create Razorpay order.",
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
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.validatedBody;

  const booking = await Booking.findById(bookingId).populate("facility");

  if (!booking) {
    throw new ApiError(404, "bookingId", "Booking not found.");
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "access", "You cannot pay for this booking.");
  }

  if (booking.status !== "PENDING") {
    throw new ApiError(400, "booking", "This booking is not awaiting payment.");
  }

  const amount = booking.partySize * booking.facility.slotPrice;
  const amountInPaise = amount * 100;

  // Verify Razorpay order
  let razorpayOrder;

  try {
    razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Razorpay order fetching failed:", error);
    }

    throw new ApiError(404, "razorpayOrder", "Razorpay order not found.");
  }

  if (razorpayOrder.receipt !== bookingId) {
    throw new ApiError(
      400,
      "razorpayOrder",
      "Razorpay order does not belong to this booking.",
    );
  }

  if (razorpayOrder.amount !== amountInPaise) {
    throw new ApiError(
      400,
      "razorpayOrder",
      "Payment amount does not match booking amount.",
    );
  }

  // Verify Razorpay payment
  let razorpayPayment;

  try {
    razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Razorpay payment fetching failed:", error);
    }

    throw new ApiError(404, "razorpayPayment", "Razorpay payment not found.");
  }

  if (razorpayPayment.order_id !== razorpay_order_id) {
    throw new ApiError(
      400,
      "razorpayPayment",
      "Payment does not belong to this order.",
    );
  }

  if (razorpayPayment.amount !== amountInPaise) {
    throw new ApiError(
      400,
      "razorpayPayment",
      "Payment amount does not match booking amount.",
    );
  }

  // Verify payment signature
  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(payload)
    .digest("hex");

  const isSignatureValid = expectedSignature === razorpay_signature;

  const razorpayPaymentStatus = razorpayPayment.status;

  let bookingStatus, paymentStatus;

  if (isSignatureValid) {
    if (razorpayPaymentStatus === "failed") {
      bookingStatus = "REJECTED";
      paymentStatus = "FAILED";
    } else if (razorpayPaymentStatus === "captured") {
      bookingStatus = "BOOKED";
      paymentStatus = "CONFIRMED";
    } else {
      bookingStatus = "PENDING";
      paymentStatus = "VERIFICATION_PASSED";
    }
  } else {
    if (razorpayPaymentStatus === "failed") {
      bookingStatus = "REJECTED";
      paymentStatus = "FAILED";
    } else if (razorpayPaymentStatus === "captured") {
      bookingStatus = "REJECTED";
      paymentStatus = "VERIFICATION_FAILED";
    } else {
      bookingStatus = "PENDING";
      paymentStatus = "VERIFICATION_FAILED";
    }
  }

  const paymentData = {
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
    amount,
    user: req.user._id,
    status: paymentStatus,
  };

  // Record every payment
  const payment = await Payment.create(paymentData);

  const finalBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      status: bookingStatus,
      payment: payment._id,
    },
    { returnDocument: "after", runValidators: true },
  ).populate(["user", "facility"]);

  if (!isSignatureValid) {
    throw new ApiError(400, "payment", "Payment verification failed.");
  }

  const verifiedPayment = payment;
  const confirmedBooking = finalBooking;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { verifiedPayment, confirmedBooking },
        "Payment verified successfully.",
      ),
    );
});

const initializeRefund = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;

  let booking = await Booking.findById(bookingId).populate([
    "facility",
    "payment",
  ]);

  if (!booking) {
    throw new ApiError(404, "booking", "Booking not found.");
  }

  if (!booking.facility?.owner?.equals(req.user._id)) {
    throw new ApiError(
      403,
      "facilityId",
      "Refund denied. You are not the owner of this facility.",
    );
  }

  if (booking.payment?.status === "REFUNDING") {
    throw new ApiError(
      400,
      "booking",
      "A refund for this booking is already being processed.",
    );
  }

  if (booking.payment?.status === "REFUNDED") {
    throw new ApiError(
      400,
      "booking",
      "The refund for this booking has already been processed.",
    );
  }

  const razorpayPaymentId = booking.payment?.razorpayPaymentId;

  if (!razorpayPaymentId) {
    throw new ApiError(
      400,
      "razorpayPayment",
      "Razorpay payment ID not found.",
    );
  }

  let refund;

  try {
    refund = await razorpay.payments.refund(razorpayPaymentId);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Razorpay refund initialization failed:", error);
    }

    throw new ApiError(
      400,
      "razorpayPayment",
      "Failed to initialize Razorpay refund.",
    );
  }

  let refundStatus = refund.status;
  let paymentStatus, razorpayRefundId;

  if (refundStatus === "pending") {
    paymentStatus = "REFUNDING";
    razorpayRefundId = refund.id;
  } else if (refundStatus === "processed") {
    paymentStatus = "REFUNDED";
    razorpayRefundId = refund.id;
  } else if (refundStatus === "failed") {
    paymentStatus = "CONFIRMED";
    razorpayRefundId = null;
  }

  await Payment.findByIdAndUpdate(
    booking.payment._id,
    {
      $set: {
        status: paymentStatus,
        razorpayRefundId: razorpayRefundId,
      },
    },
    { runValidators: true },
  );

  booking = await booking.populate(["user", "facility", "payment"]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { refund, booking },
        "Razorpay refund initialized successfully.",
      ),
    );
});

export { createRazorpayOrder, verifyPayment, initializeRefund };
