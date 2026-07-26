import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Facility from "../models/facility.model.js";
import Booking from "../models/booking.model.js";

const getDashboard = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(403, "Access denied.");
  }

  const [
    totalUsers,
    totalFacilityOwners,
    totalFacilities,
    activeFacilities,
    totalBookings,
  ] = await Promise.all([
    User.countDocuments({ roles: "user" }),
    User.countDocuments({ roles: "facilityOwner" }),
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
  if (!req.user.isAdmin) {
    throw new ApiError(403, "Access denied.");
  }

  const { fullName, email, roles } = req.validatedQuery;

  const filters = {};
  if (fullName) filters.fullName = fullName;
  if (email) filters.email = email;
  if (roles) filters.roles = roles;

  const users = await User.find(filters).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully."));
});

export { getDashboard, getAllUsers };
