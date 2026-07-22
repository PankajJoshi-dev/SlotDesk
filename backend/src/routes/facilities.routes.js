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
} from "../validators/facilities.validator.js";

import { validate } from "../middlewares/validate.middleware.js";

const facilitiesRouter = Router();

facilitiesRouter
  .route("/")
  .post(verifyJWT, validate(createFacilitySchema), createFacility)
  .get(filterFacilities);

facilitiesRouter
  .route("/:id")
  .get(getFacility)
  .patch(verifyJWT, validate(editFacilitySchema), editFacility)
  .delete(verifyJWT, deleteFacility);

export default facilitiesRouter;
