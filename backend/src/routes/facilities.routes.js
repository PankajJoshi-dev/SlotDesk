import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createFacility,
  filterFacilities,
  getFacility,
  editFacility,
  deleteFacility,
  getFacilitySlots,
  getAvailableTypes,
  getAvailableLocations,
} from "../controllers/facilities.controller.js";

import { getFacilityBookings } from "../controllers/booking.controller.js";

import {
  createFacilitySchema,
  editFacilitySchema,
  filterFacilitiesSchema,
  getFacilitySlotsSchema,
} from "../validators/facilities.validator.js";
import { getFacilityBookingsQuerySchema } from "../validators/booking.validator.js";
import { objectIdParamsSchema } from "../validators/common.validator.js";

import { validate } from "../middlewares/validate.middleware.js";

const facilitiesRouter = Router();

facilitiesRouter
  .route("/")
  .post(verifyJWT, validate(createFacilitySchema), createFacility)
  .get(validate(filterFacilitiesSchema, "query"), filterFacilities);

facilitiesRouter.route("/availableTypes").get(getAvailableTypes);

facilitiesRouter.route("/availableLocations").get(getAvailableLocations);

facilitiesRouter
  .route("/:facilityId")
  .get(validate(objectIdParamsSchema("facilityId"), "params"), getFacility)
  .patch(
    verifyJWT,
    validate(objectIdParamsSchema("facilityId"), "params"),
    validate(editFacilitySchema),
    editFacility,
  )
  .delete(
    verifyJWT,
    validate(objectIdParamsSchema("facilityId"), "params"),
    deleteFacility,
  );

facilitiesRouter
  .route("/:facilityId/bookings")
  .get(
    verifyJWT,
    validate(objectIdParamsSchema("facilityId"), "params"),
    validate(getFacilityBookingsQuerySchema, "query"),
    getFacilityBookings,
  );

facilitiesRouter
  .route("/:facilityId/slots")
  .get(
    verifyJWT,
    validate(objectIdParamsSchema("facilityId"), "params"),
    validate(getFacilitySlotsSchema, "query"),
    getFacilitySlots,
  );

export default facilitiesRouter;
