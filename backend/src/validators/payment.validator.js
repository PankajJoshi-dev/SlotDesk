import * as z from "zod";
import { objectIdSchema } from "./common.validator.js";

const createRazorpayOrderSchema = z.object({
  bookingId: objectIdSchema,
});

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string({ error: "Razorpay order is required." }),
  razorpay_payment_id: z.string({ error: "Razorpay payment ID is required." }),
  razorpay_signature: z.string({ error: "Razorpay signature is required." }),
  bookingId: objectIdSchema,
});

export { createRazorpayOrderSchema, verifyPaymentSchema };
