import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Facility from "../models/facility.model.js";
import User from "../models/user.model.js";

const createFacility = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(
      403,
      "Access denied. Only admins can create facilities.",
    );
  }

  const { ownerEmail, ...facilityData } = req.validatedData;

  const existingFacility = await Facility.findOne({
    name: facilityData.name,
    location: facilityData.location,
  });

  if (existingFacility) {
    throw new ApiError(
      409,
      "A facility with this name already exists in this locality, please choose a different name.",
    );
  }

  const owner = await User.findOne({ email: ownerEmail });

  if (!owner) {
    throw new ApiError(404, "No facility owner found for the provided email.");
  }

  if (owner.role !== "facilityOwner") {
    throw new ApiError(
      400,
      "The selected user must have the facilityOwner role.",
    );
  }

  facilityData.owner = owner._id;

  const facility = await Facility.create(facilityData);

  return res
    .status(201)
    .json(new ApiResponse(201, facility, "Facility created successfully"));
});

const filterFacilities = asyncHandler(async (req, res) => {
  const filters = {};

  if (req.query.location) {
    filters.location = req.query.location;
  }

  if (req.query.facilityType) {
    filters.facilityType = req.query.facilityType;
  }

  const facilities = await Facility.find(filters);

  return res
    .status(200)
    .json(new ApiResponse(200, facilities, "Facilities fetched successfully."));
});

const getFacility = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const facility = await Facility.findById(id);

  if (!facility) {
    throw new ApiError(404, "Facility not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, facility, "Facility fetched successfully."));
});

const editFacility = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const targetFacility = await Facility.findById(id);

  if (!targetFacility) {
    throw new ApiError(404, "Facility not found.");
  }

  if (!targetFacility.owner.equals(req.user._id) && req.user.role !== "admin") {
    throw new ApiError(
      403,
      "Only the facility owner or an admin can edit this facility.",
    );
  }

  if (req.validatedData.name || req.validatedData.location) {
    const newName = req.validatedData.name ?? targetFacility.name;
    const newLocation = req.validatedData.location ?? targetFacility.location;

    const existingFacility = await Facility.findOne({
      name: newName,
      location: newLocation,
      _id: { $ne: id },
    });

    if (existingFacility) {
      throw new ApiError(
        409,
        "A facility with this name already exists in this locality, please choose a different name.",
      );
    }
  }

  const updatedFacility = await Facility.findByIdAndUpdate(
    id,
    req.validatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedFacility, "Facility updated successfully."),
    );
});

const deleteFacility = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const targetFacility = await Facility.findById(id);

  if (!targetFacility) {
    throw new ApiError(404, "Facility not found.");
  }

  if (!targetFacility.owner.equals(req.user._id) && req.user.role !== "admin") {
    throw new ApiError(
      403,
      "Only the facility owner or an admin can delete this facility.",
    );
  }

  await Facility.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Facility deleted successfully."));
});

export {
  createFacility,
  filterFacilities,
  getFacility,
  editFacility,
  deleteFacility,
};
