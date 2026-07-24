import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Facility from "../models/facility.model.js";
import Booking from "../models/booking.model.js";
import { email } from "zod";

const getDashboard = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied.");
  }

  const [
    totalUsers,
    totalFacilityOwners,
    totalFacilities,
    activeFacilities,
    totalBookings,
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    User.countDocuments({ role: "facilityOwner" }),
    Facility.countDocuments(),
    Facility.countDocuments({ isActive: true }),
    Booking.countDocuments(),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalUsers,
        totalFacilityOwners,
        totalFacilities,
        activeFacilities,
        totalBookings,
      },
      "Dashboard Fetched Successfully.",
    ),
  );
});

const getAllUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied.");
  }

  const { fullName, email, role } = req.validatedQuery;

  const filters = {};
  if (fullName) filters.fullName = fullName;
  if (email) filters.email = email;
  if (role) filters.role = role;

  const users = await User.find(filters).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully."));
});

const changeUserRole = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied.");
  }

  const { userId } = req.validatedParams;
  const { role } = req.validatedBody;

  const user = await User.findByIdAndUpdate(
    userId,
    { role: role },
    {
      returnDocument: true,
      runValidators: true,
    },
  );

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User role updated successfully."));
});

export { getDashboard, getAllUsers, changeUserRole };
