import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Booking from "../models/booking.model.js";
import Facility from "../models/facility.model.js";

function buildBookingFilters(validatedQuery) {
  const filters = {};

  if (validatedQuery.user) filters.user = validatedQuery.user;
  if (validatedQuery.facility) filters.facility = validatedQuery.facility;
  if (validatedQuery.date) filters.date = validatedQuery.date;
  if (validatedQuery.slotIndex !== undefined)
    filters.slotIndex = validatedQuery.slotIndex;

  return filters;
}

const createBooking = asyncHandler(async (req, res) => {
  if (req.user.role !== "user") {
    throw new ApiError(403, "Access denied. Only users can make bookings.");
  }

  const facility = await Facility.findById(req.validatedParams.facilityId);

  if (!facility) {
    throw new ApiError(404, "Facility not found.");
  }

  const bookingInfo = {
    ...req.validatedBody,
    user: req.user._id,
    facility: req.validatedParams.facilityId,
  };

  if (bookingInfo.partySize > facility.capacity) {
    throw new ApiError(400, "Party size exceeds facility capacity.");
  }

  const totalSlots =
    (facility.endTime - facility.startTime) / facility.slotDuration;

  if (bookingInfo.slotIndex < 0 || bookingInfo.slotIndex >= totalSlots) {
    throw new ApiError(
      400,
      "Can not book this slot. The selected slot is not available in this facility.",
    );
  }

  const slotBookings = await Booking.find({
    facility: req.validatedParams.facilityId,
    date: bookingInfo.date,
    slotIndex: bookingInfo.slotIndex,
    status: "BOOKED",
  });

  const bookedCapacity = slotBookings.reduce(
    (sum, booking) => sum + booking.partySize,
    0,
  );

  if (bookedCapacity + bookingInfo.partySize > facility.capacity) {
    throw new ApiError(400, "This selected slot is full.");
  }

  for (const booking of slotBookings) {
    if (booking.user.equals(req.user._id)) {
      throw new ApiError(400, "You have already booked this slot.");
    }
  }

  const booking = await Booking.create(bookingInfo);
  await booking.populate([
    { path: "user", select: "fullName email" },
    { path: "facility", select: "name" },
  ]);

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Slot booked successfully."));
});

const getAllBookings = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(
      403,
      "Access denied. Only the admin can perform this action.",
    );
  }

  const filters = buildBookingFilters(req.validatedQuery);

  const bookings = await Booking.find(filters)
    .populate("user", "fullName email")
    .populate("facility", "name");

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "Bookings fetched successfully."));
});

const getFacilityBookings = asyncHandler(async (req, res) => {
  const facility = await Facility.findById(req.validatedParams.facilityId);

  if (!facility) {
    throw new ApiError(404, "Facility not found.");
  }

  if (!facility.owner.equals(req.user._id)) {
    throw new ApiError(
      403,
      "Access denied. You are not the owner of this facility.",
    );
  }

  const filters = buildBookingFilters(req.validatedQuery);

  filters.facility = req.validatedParams.facilityId;

  const bookings = await Booking.find(filters)
    .populate("user", "fullName email")
    .populate("facility", "name");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        bookings,
        "Facilities' Bookings fetched successfully.",
      ),
    );
});

const getMyBookings = asyncHandler(async (req, res) => {
  if (req.user.role !== "user") {
    throw new ApiError(
      403,
      "Access denied. Only a user can perform this action.",
    );
  }

  const filters = buildBookingFilters(req.validatedQuery);
  filters.user = req.user._id;

  const bookings = await Booking.find(filters)
    .populate("user", "fullName email")
    .populate("facility", "name");

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "User's Bookings fetched successfully."),
    );
});

const getSingleBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.validatedParams;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  // Authority check
  if (req.user.role === "user") {
    if (!booking.user.equals(req.user._id)) {
      throw new ApiError(403, "Access denied.");
    }
  } else if (req.user.role === "facilityOwner") {
    const facility = await Facility.findById(booking.facility);

    if (!facility) {
      throw new ApiError(404, "Associated facility not found.");
    }

    if (!facility.owner.equals(req.user._id)) {
      throw new ApiError(403, "Access denied.");
    }
  }

  await booking.populate([
    { path: "user", select: "fullName email" },
    { path: "facility", select: "name" },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking fetched successfully."));
});

export {
  createBooking,
  getAllBookings,
  getFacilityBookings,
  getMyBookings,
  getSingleBooking,
};
