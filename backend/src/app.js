import express from "express";
const app = express();

import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middleware.js";

import authRouter from "../src/routes/auth.routes.js";
import facilitiesRouter from "./routes/facilities.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import paymentRouter from "./routes/payment.routes.js";

import cors from "cors";

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: isProduction ? allowedOrigins : true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/facilities", facilitiesRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/payments", paymentRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SlotDesk!",
  });
});

app.use(errorHandler);

export default app;
