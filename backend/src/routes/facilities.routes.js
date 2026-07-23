import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createFacility,
  filterFacilities,
  getFacility,
  editFacility,
  deleteFacility,
} from "../controllers/facilities.controller.js";

import {
  createFacilitySchema,
  editFacilitySchema,
  filterFacilitiesSchema,
} from "../validators/facilities.validator.js";

import { objectIdParamsSchema } from "../validators/common.validator.js";

import { validate } from "../middlewares/validate.middleware.js";

const facilitiesRouter = Router();

facilitiesRouter
  .route("/")
  .post(verifyJWT, validate(createFacilitySchema), createFacility)
  .get(validate(filterFacilitiesSchema, "query"), filterFacilities);

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

export default facilitiesRouter;
