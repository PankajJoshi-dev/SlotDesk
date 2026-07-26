import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Facility from "../models/facility.model.js";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";

const createFacility = asyncHandler(async (req, res) => {
  const { ...facilityData } = req.validatedBody;

  const existingFacility = await Facility.findOne({
    name: facilityData.name,
    address: facilityData.address,
  });

  if (existingFacility) {
    throw new ApiError(
      409,
      "A facility with this name already exists in this locality, please choose a different name.",
    );
  }

  if (
    (!req.user.roles.includes("user") &&
      !req.user.roles.includes("facilityOwner")) ||
    req.user.isAdmin
  ) {
    throw new ApiError(403, "Access denied. You can not create a facility.");
  }

  facilityData.owner = req.user._id;

  const facility = await Facility.create(facilityData);

  if (!req.user.roles.includes("facilityOwner")) {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: {
          roles: "facilityOwner",
        },
      },
      { new: true },
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, facility, "Facility created successfully"));
});

const filterFacilities = asyncHandler(async (req, res) => {
  const filters = {};

  if (req.validatedQuery.address?.city) {
    filters["address.city"] = req.validatedQuery.address.city;
  }

  if (req.validatedQuery.facilityType) {
    filters.facilityType = req.validatedQuery.facilityType;
  }

  const facilities = await Facility.find(filters);

  return res
    .status(200)
    .json(new ApiResponse(200, facilities, "Facilities fetched successfully."));
});

const getFacility = asyncHandler(async (req, res) => {
  const { facilityId } = req.validatedParams;

  const facility = await Facility.findById(facilityId);

  if (!facility) {
    throw new ApiError(404, "Facility not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, facility, "Facility fetched successfully."));
});

const editFacility = asyncHandler(async (req, res) => {
  const { facilityId } = req.validatedParams;

  const targetFacility = await Facility.findById(facilityId);

  if (!targetFacility) {
    throw new ApiError(404, "Facility not found.");
  }

  if (!targetFacility.owner.equals(req.user._id)) {
    throw new ApiError(403, "Only the facility owner can edit this facility.");
  }

  if (req.validatedBody.name || req.validatedBody.address) {
    const newName = req.validatedBody.name ?? targetFacility.name;
    const newAddress = req.validatedBody.address ?? targetFacility.address;

    const existingFacility = await Facility.findOne({
      name: newName,
      address: newAddress,
      _id: { $ne: facilityId }, // Exclude current facility
    });

    if (existingFacility) {
      throw new ApiError(
        409,
        "A facility with this name already exists in this locality, please choose a different name.",
      );
    }
  }

  const updatedFacility = await Facility.findByIdAndUpdate(
    facilityId,
    req.validatedBody,
    {
      returnDocument: "after",
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
  const { facilityId } = req.validatedParams;

  const targetFacility = await Facility.findById(facilityId);

  if (!targetFacility) {
    throw new ApiError(404, "Facility not found.");
  }

  if (!targetFacility.owner.equals(req.user._id)) {
    throw new ApiError(
      403,
      "Only the facility owner can delete this facility.",
    );
  }

  await Facility.findByIdAndDelete(facilityId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Facility deleted successfully."));
});

const getFacilitySlots = asyncHandler(async (req, res) => {
  const { facilityId } = req.validatedParams;
  const { date } = req.validatedQuery;

  const facility = await Facility.findById(facilityId);

  if (!facility) {
    throw new ApiError(404, "Facility not found.");
  }

  const totalSlots = Math.floor(
    (facility.closingTime - facility.openingTime) / facility.slotDuration,
  );

  const bookings = await Booking.find({
    facility: facilityId,
    date,
    status: "BOOKED",
  });

  const slots = {};
  for (let i = 0; i < totalSlots; i++) {
    slots[i] = {
      remaining: facility.capacity,
      available: true,
    };
  }

  for (const booking of bookings) {
    slots[booking.slotIndex].remaining =
      slots[booking.slotIndex].remaining - booking.partySize;
    slots[booking.slotIndex].available = slots[booking.slotIndex].remaining > 0;
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        slots,
        "Facility slot availability fetched successfully.",
      ),
    );
});

export {
  createFacility,
  filterFacilities,
  getFacility,
  editFacility,
  deleteFacility,
  getFacilitySlots,
};
