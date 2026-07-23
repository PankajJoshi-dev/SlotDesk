import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  getSingleBooking,
} from "../controllers/booking.controller.js";

import {
  bookingCreationSchema,
  getBookingsQuerySchema,
  getMyBookingsQuerySchema,
} from "../validators/booking.validator.js";

import { validate } from "../middlewares/validate.middleware.js";
import { object } from "zod";
import { objectIdParamsSchema } from "../validators/common.validator.js";

const bookingRouter = Router();

bookingRouter
  .route("/")
  .get(verifyJWT, validate(getBookingsQuerySchema, "query"), getAllBookings);

bookingRouter
  .route("/me")
  .get(verifyJWT, validate(getMyBookingsQuerySchema, "query"), getMyBookings);

bookingRouter
  .route("/:facilityId")
  .post(
    verifyJWT,
    validate(objectIdParamsSchema("facilityId"), "params"),
    validate(bookingCreationSchema),
    createBooking,
  );

bookingRouter
  .route("/:bookingId")
  .get(
    verifyJWT,
    validate(objectIdParamsSchema("bookingId"), "params"),
    getSingleBooking,
  );

export default bookingRouter;
