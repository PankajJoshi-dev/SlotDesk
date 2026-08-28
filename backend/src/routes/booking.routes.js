import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  checkIn,
} from "../controllers/booking.controller.js";

import {
  bookingCreationSchema,
  getMyBookingsQuerySchema,
} from "../validators/booking.validator.js";

import { validate } from "../middlewares/validate.middleware.js";
import { objectIdParamsSchema } from "../validators/common.validator.js";

const bookingRouter = Router();

bookingRouter
  .route("/me")
  .get(verifyJWT, validate(getMyBookingsQuerySchema, "query"), getMyBookings);

bookingRouter
  .route("/:bookingId/check-in")
  .patch(
    verifyJWT,
    validate(objectIdParamsSchema("bookingId"), "params"),
    checkIn,
  );

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
  .patch(
    verifyJWT,
    validate(objectIdParamsSchema("bookingId"), "params"),
    cancelBooking,
  );

export default bookingRouter;
