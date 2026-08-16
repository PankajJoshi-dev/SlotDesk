import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getMyBookings,
  getSingleBooking,
  cancelBooking,
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
  )
  .patch(
    verifyJWT,
    validate(objectIdParamsSchema("bookingId"), "params"),
    cancelBooking,
  );

export default bookingRouter;
