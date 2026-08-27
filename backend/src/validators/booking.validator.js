import * as z from "zod";
import {
  objectIdSchema,
  dateSchema,
  bookingDateSchema,
  bookingIdSchema,
} from "./common.validator.js";

const bookingCreationSchema = z.object({
  date: bookingDateSchema,

  slotIndex: z.coerce
    .number({
      error: "Please select a slot.",
    })
    .int()
    .min(0, "Invalid Slot selected."),

  partySize: z.coerce
    .number({
      error: "Party size is required.",
    })
    .int()
    .min(1, "Party size must be at least 1.")
    .default(1),
});

const getBookingsQuerySchema = z.object({
  bookingId: bookingIdSchema.optional(),

  user: objectIdSchema.optional(),

  date: dateSchema.optional(),

  slotIndex: z.coerce.number().int().min(0).optional(),

  status: z.enum(["BOOKED", "CANCELLED", "COMPLETED"]).optional(),
});

const getMyBookingsQuerySchema = getBookingsQuerySchema.omit({ user: true });

export {
  bookingCreationSchema,
  getBookingsQuerySchema,
  getMyBookingsQuerySchema,
};
