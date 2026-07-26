import { Router } from "express";
import { getAllUsers, getDashboard } from "../controllers/admin.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { objectIdParamsSchema } from "../validators/common.validator.js";
import { getAllUsersSchema } from "../validators/admin.validator.js";

const adminRouter = Router();

adminRouter.route("/dashboard").get(verifyJWT, getDashboard);
adminRouter
  .route("/users")
  .get(verifyJWT, validate(getAllUsersSchema, "query"), getAllUsers);

export default adminRouter;
