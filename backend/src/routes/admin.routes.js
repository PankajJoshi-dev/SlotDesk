import { Router } from "express";
import {
  changeUserRole,
  getAllUsers,
  getDashboard,
} from "../controllers/admin.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { objectIdParamsSchema } from "../validators/common.validator.js";
import {
  changeUserRoleSchema,
  getAllUsersSchema,
} from "../validators/admin.validator.js";

const adminRouter = Router();

adminRouter.route("/dashboard").get(verifyJWT, getDashboard);
adminRouter
  .route("/users")
  .get(verifyJWT, validate(getAllUsersSchema, "query"), getAllUsers);
adminRouter
  .route("/users/:userId/role")
  .patch(
    verifyJWT,
    validate(objectIdParamsSchema("userId"), "params"),
    validate(changeUserRoleSchema),
    changeUserRole,
  );

export default adminRouter;
