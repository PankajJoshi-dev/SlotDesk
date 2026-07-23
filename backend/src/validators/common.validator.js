import * as z from "zod";

const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId.");

const objectIdParamsSchema = (paramName) =>
  z.object({
    [paramName]: objectIdSchema,
  });

const dateSchema = z.coerce
  .date({ error: "Date is required." })
  .transform((date) => {
    date.setUTCHours(0, 0, 0, 0); // Normalize to UTC midnight for consistent
    return date;
  });

const bookingDateSchema = dateSchema.refine(
  (date) => date >= new Date(new Date().setUTCHours(0, 0, 0, 0)),
  {
    message: "Booking date must be today or a future date.",
  },
);

export { objectIdSchema, objectIdParamsSchema, dateSchema, bookingDateSchema };
