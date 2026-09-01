import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    razorpayPaymentId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpaySignature: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: [
        "VERIFICATION_PASSED",
        "VERIFICATION_FAILED",
        "CONFIRMED",
        "FAILED",
        "REFUNDING",
        "REFUNDED",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
