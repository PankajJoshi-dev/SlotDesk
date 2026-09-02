import Payment from "../models/payment.model.js";
import razorpay from "../config/razorpay.config.js";

const updatePendingPayments = async () => {
  const payments = await Payment.find({
    status: "PENDING",
  });

  for (const payment of payments) {
    const razorpayPayment = await razorpay.payments.fetch(
      payment.razorpayPaymentId,
    );
    const razorpayPaymentStatus = razorpayPayment?.status;

    let paymentStatus;

    if (payment.verificationStatus) {
      if (razorpayPaymentStatus === "failed") {
        paymentStatus = "FAILED";
      } else if (razorpayPaymentStatus === "captured") {
        paymentStatus = "CONFIRMED";
      } else {
        paymentStatus = "PENDING";
      }
    } else {
      if (razorpayPaymentStatus === "failed") {
        paymentStatus = "FAILED";
      } else if (razorpayPaymentStatus === "captured") {
        paymentStatus = "CAPTURED";
      } else {
        paymentStatus = "PENDING";
      }
    }

    await Payment.findByIdAndUpdate(
      payment._id,
      { $set: { status: paymentStatus } },
      { runValidators: true },
    );
  }

  console.log("Payment status updated successfully.");
};

const updateRefundState = async () => {
  const payments = await Payment.find({
    status: "REFUNDING",
  });

  for (const payment of payments) {
    let razorpayRefundId = payment.razorpayRefundId;

    if (!razorpayRefundId) {
      continue;
    }

    const refund = await razorpay.refunds.fetch(payment.razorpayRefundId);

    const refundStatus = refund?.status;
    const verificationStatus = payment.verificationStatus;

    let paymentStatus;

    if (verificationStatus) {
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
    } else {
      if (refundStatus === "pending") {
        paymentStatus = "REFUNDING";
        razorpayRefundId = refund.id;
      } else if (refundStatus === "processed") {
        paymentStatus = "REFUNDED";
        razorpayRefundId = refund.id;
      } else if (refundStatus === "failed") {
        paymentStatus = "CAPTURED";
        razorpayRefundId = null;
      }
    }

    await Payment.findByIdAndUpdate(
      payment._id,
      {
        $set: {
          status: paymentStatus,
          razorpayRefundId: razorpayRefundId,
        },
      },
      { runValidators: true },
    );
  }

  console.log("Refund status updated successfully.");
};

const refundCapturedPayments = async () => {
  const payments = await Payment.find({ status: "CAPTURED" });

  for (const payment of payments) {
    const razorpayPaymentId = payment.razorpayPaymentId;

    if (!razorpayPaymentId) {
      continue;
    }

    let refund;

    try {
      refund = await razorpay.payments.refund(razorpayPaymentId);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Razorpay refund initialization failed:", error);
      }

      continue;
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
      paymentStatus = "CAPTURED";
      razorpayRefundId = null;
    }

    await Payment.findByIdAndUpdate(
      payment._id,
      {
        $set: {
          status: paymentStatus,
          razorpayRefundId: razorpayRefundId,
        },
      },
      { runValidators: true },
    );
  }

  console.log("Captured payments refunded successfully.");
};

export { updatePendingPayments, updateRefundState, refundCapturedPayments };
