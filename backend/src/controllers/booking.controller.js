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
  if (validatedQuery.slotIndex !== undefined) {
    filters.slotIndex = validatedQuery.slotIndex;
  }
  if (validatedQuery.status) filters.status = validatedQuery.status;
  return filters;
}

const createBooking = asyncHandler(async (req, res) => {
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
    throw new ApiError(
      400,
      "partySize",
      "Party size exceeds facility capacity.",
    );
  }

  const totalSlots = Math.floor(
    (facility.closingTime - facility.openingTime) / facility.slotDuration,
  );

  if (bookingInfo.slotIndex < 0 || bookingInfo.slotIndex >= totalSlots) {
    throw new ApiError(
      400,
      "slotIndex",
      "Can not book this slot. The selected slot is not available in this facility.",
    );
  }

  // Resolving Same day expired slot booking bug
  const now = new Date();

  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();

  const currentPossibleSlot = Math.floor(
    (minutesSinceMidnight - facility.openingTime) / facility.slotDuration,
  );

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Midnight

  if (
    bookingInfo.date.getTime() === today.getTime() &&
    currentPossibleSlot >= bookingInfo.slotIndex
  ) {
    // Midnight timestamp match means same day
    throw new ApiError(409, "slotIndex", "Slot expired.");
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
    throw new ApiError(400, "slotIndex", "This selected slot is full.");
  }

  for (const booking of slotBookings) {
    if (booking.user.equals(req.user._id)) {
      throw new ApiError(
        400,
        "slotIndex",
        "You have already booked this slot.",
      );
    }
  }

  const booking = await Booking.create(bookingInfo);

  const populatedBooking = await Booking.findById(booking._id)
    .populate("user", "fullName email")
    .populate("facility", "name slotDuration address.city openingTime");

  return res
    .status(201)
    .json(new ApiResponse(201, populatedBooking, "Slot booked successfully."));
});

const getFacilityBookings = asyncHandler(async (req, res) => {
  const facility = await Facility.findById(req.validatedParams.facilityId);

  if (!facility) {
    throw new ApiError(404, "Facility not found.");
  }

  if (!req.user.isFacilityOwner) {
    throw new ApiError(403, "Access denied. You are not a facility owner.");
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
    .populate("facility", "name slotDuration address.city openingTime");

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "Facility Bookings fetched successfully."),
    );
});

const getMyBookings = asyncHandler(async (req, res) => {
  let filters = buildBookingFilters(req.validatedQuery);
  filters.user = req.user._id;

  const bookings = await Booking.find(filters)
    .populate("user", "fullName email")
    .populate("facility", "name slotDuration address.city openingTime");

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
  if (booking.user.equals(req.user._id)) {
    // Allow (their own booking)
  } else if (req.user.isFacilityOwner) {
    const facility = await Facility.findById(booking.facility);

    if (!facility) {
      throw new ApiError(404, "Associated facility not found.");
    }

    if (!facility.owner.equals(req.user._id)) {
      throw new ApiError(403, "Access denied.");
    }
  } else {
    throw new ApiError(403, "Access denied.");
  }

  await booking
    .populate("user", "fullName email")
    .populate("facility", "name slotDuration address.city openingTime");

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking fetched successfully."));
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.validatedParams;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  if (!booking.user.equals(req.user._id)) {
    throw new ApiError(403, "Access denied.");
  }

  booking.status = "CANCELLED";
  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking cancelled successfully."));
});

export {
  createBooking,
  getFacilityBookings,
  getMyBookings,
  getSingleBooking,
  cancelBooking,
};
