import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.route("/register").post(validate(registerSchema), registerUser);
authRouter.route("/login").post(validate(loginSchema), loginUser);
authRouter.route("/logout").post(logoutUser);

// Protected routes:
authRouter.route("/getUser").get(verifyJWT, getCurrentUser);

export default authRouter;
