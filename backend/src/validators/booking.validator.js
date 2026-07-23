import * as z from "zod";
import {
  objectIdSchema,
  dateSchema,
  bookingDateSchema,
} from "./common.validator.js";

const bookingCreationSchema = z.object({
  date: bookingDateSchema,

  slotIndex: z.coerce
    .number({
      error: "Slot index is required.",
    })
    .int()
    .min(0, "Slot index cannot be negative."),

  partySize: z.coerce
    .number({
      error: "Party size is required.",
    })
    .int()
    .min(1, "Party size must be at least 1.")
    .default(1),
});

const getBookingsQuerySchema = z.object({
  user: objectIdSchema.optional(),

  facility: objectIdSchema.optional(),

  date: dateSchema.optional(),

  slotIndex: z.coerce.number().int().min(0).optional(),

  status: z.enum(["BOOKED", "CANCELLED", "COMPLETED", "NO_SHOW"]).optional(),
});

const getFacilityBookingsQuerySchema = getBookingsQuerySchema.omit({
  facility: true,
});
const getMyBookingsQuerySchema = getBookingsQuerySchema.omit({ user: true });

export {
  bookingCreationSchema,
  getBookingsQuerySchema,
  getFacilityBookingsQuerySchema,
  getMyBookingsQuerySchema,
};
