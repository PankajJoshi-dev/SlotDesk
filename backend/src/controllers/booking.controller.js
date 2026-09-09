import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Booking from "../models/booking.model.js";
import Facility from "../models/facility.model.js";
import generateBookingId from "../utils/generateBookingId.js";
import { dayjs, APP_TIMEZONE, todayCheck } from "../utils/dayjs.js";

const bookingPopulate = [
  {
    path: "user",
    select: "fullName email",
  },
  {
    path: "facility",
    select: "name slotDuration address.city openingTime category owner",
  },
  {
    path: "payment",
    select: "status amount",
  },
];

function buildBookingFilters(validatedQuery) {
  const filters = {};

  if (validatedQuery.bookingId) filters.bookingId = validatedQuery.bookingId;
  if (validatedQuery.date) filters.date = validatedQuery.date;
  if (validatedQuery.user) filters.user = validatedQuery.user;
  if (validatedQuery.slotIndex !== undefined) {
    filters.slotIndex = validatedQuery.slotIndex;
  }
  if (validatedQuery.status) filters.status = validatedQuery.status;

  return filters;
}

const createBooking = asyncHandler(async (req, res) => {
  const facility = await Facility.findById(req.validatedParams.facilityId);

  if (!facility) {
    throw new ApiError(404, "facility", "Facility not found.");
  }

  const bookingInfo = {
    ...req.validatedBody,
    user: req.user._id,
    facility: req.validatedParams.facilityId,
  };

  const bookingDay = bookingInfo.date.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  if (!facility.workingDays.includes(bookingDay)) {
    throw new ApiError(400, "date", "The facility is closed on this date.");
  }

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

  // Use India's current time
  const now = dayjs().tz(APP_TIMEZONE);
  const minutesSinceMidnight = now.hour() * 60 + now.minute();

  const currentPossibleSlot = Math.floor(
    (minutesSinceMidnight - facility.openingTime) / facility.slotDuration,
  );

  const isToday = todayCheck(bookingInfo.date);

  if (isToday && currentPossibleSlot >= bookingInfo.slotIndex) {
    throw new ApiError(409, "slotIndex", "Slot expired.");
  }

  const slotBookings = await Booking.find({
    facility: req.validatedParams.facilityId,
    date: bookingInfo.date,
    slotIndex: bookingInfo.slotIndex,
    status: { $in: ["PENDING", "BOOKED"] },
  });

  const bookedCapacity = slotBookings.reduce(
    (sum, booking) => sum + booking.partySize,
    0,
  );

  if (bookedCapacity + bookingInfo.partySize > facility.capacity) {
    throw new ApiError(400, "slotIndex", "This selected slot is full.");
  }

  for (const booking of slotBookings) {
    if (booking.user.equals(req.user._id) && booking.status !== "PENDING") {
      throw new ApiError(
        400,
        "slotIndex",
        "You have already reserved this slot.",
      );
    }
  }

  // Add custom bookingId
  bookingInfo.bookingId = generateBookingId();

  const booking = await Booking.create(bookingInfo);

  const populatedBooking = await Booking.findById(booking._id).populate(
    bookingPopulate,
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        populatedBooking,
        "Booking created. Complete payment to confirm your booking.",
      ),
    );
});

const getAllBookings = asyncHandler(async (req, res) => {
  if (!req.user.isFacilityOwner) {
    throw new ApiError(
      403,
      "user",
      "Access denied. You are not a facility owner.",
    );
  }

  const facilities = await Facility.find({ owner: req.user._id }).select("_id");
  const allBookings = await Booking.find({
    facility: { $in: facilities.map((facility) => facility._id) },
  }).populate(bookingPopulate);

  return res
    .status(200)
    .json(
      new ApiResponse(200, allBookings, "All bookings fetched successfully."),
    );
});

const getFacilityBookings = asyncHandler(async (req, res) => {
  const facility = await Facility.findById(req.validatedParams.facilityId);

  if (!facility) {
    throw new ApiError(404, "facilityId", "Facility not found.");
  }

  if (!req.user.isFacilityOwner) {
    throw new ApiError(
      403,
      "user",
      "Access denied. You are not a facility owner.",
    );
  }

  if (!facility.owner.equals(req.user._id)) {
    throw new ApiError(
      403,
      "facilityId",
      "Access denied. You are not the owner of this facility.",
    );
  }

  const filters = buildBookingFilters(req.validatedQuery);

  filters.facility = req.validatedParams.facilityId;

  const bookings = await Booking.find(filters).populate(bookingPopulate);

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "Facility bookings fetched successfully."),
    );
});

const getMyBookings = asyncHandler(async (req, res) => {
  const filters = buildBookingFilters(req.validatedQuery);

  filters.user = req.user._id;

  const bookings = await Booking.find(filters).populate(bookingPopulate);

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "User's bookings fetched successfully."),
    );
});

const getSingleBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.validatedParams;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "bookingId", "Booking not found.");
  }

  // Authority check
  if (booking.user.equals(req.user._id)) {
    // Allow (their own booking)
  } else if (req.user.isFacilityOwner) {
    const facility = await Facility.findById(booking.facility);

    if (!facility) {
      throw new ApiError(404, "facility", "Associated facility not found.");
    }

    if (!facility.owner.equals(req.user._id)) {
      throw new ApiError(403, "bookingId", "Access denied.");
    }
  } else {
    throw new ApiError(403, "bookingId", "Access denied.");
  }

  await booking.populate(bookingPopulate);

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking fetched successfully."));
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.validatedParams;

  const booking = await Booking.findById(bookingId).populate("facility");

  if (!booking) {
    throw new ApiError(404, "bookingId", "Booking not found.");
  }

  if (!booking.user.equals(req.user._id)) {
    throw new ApiError(403, "bookingId", "Access denied.");
  }

  if (booking.status !== "BOOKED") {
    throw new ApiError(
      409,
      "bookingId",
      "Only booked reservations can be cancelled.",
    );
  }

  if (booking.checkedIn) {
    throw new ApiError(
      409,
      "bookingId",
      "Checked-in bookings cannot be cancelled.",
    );
  }

  const bookingDate = new Date(booking.date);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (bookingDate < today) {
    throw new ApiError(409, "bookingId", "Past bookings cannot be cancelled.");
  }

  const isToday = todayCheck(bookingDate);

  if (isToday) {
    const startTime =
      booking.facility.openingTime +
      booking.slotIndex * booking.facility.slotDuration;

    // Use India's current time
    const now = dayjs().tz(APP_TIMEZONE);
    const currentTime = now.hour() * 60 + now.minute();

    if (currentTime >= startTime - 30) {
      throw new ApiError(
        409,
        "bookingId",
        "Bookings can only be cancelled at least 30 minutes before the slot.",
      );
    }
  }

  booking.status = "CANCELLED";

  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking cancelled successfully."));
});

const checkIn = asyncHandler(async (req, res) => {
  const { bookingId } = req.validatedParams;

  if (!req.user.isFacilityOwner) {
    throw new ApiError(
      403,
      "user",
      "Access denied. You are not a facility owner.",
    );
  }

  const booking = await Booking.findById(bookingId).populate(bookingPopulate);

  if (!booking) {
    throw new ApiError(404, "booking", "Booking not found.");
  }

  if (!booking.facility.owner.equals(req.user._id)) {
    throw new ApiError(
      403,
      "facilityId",
      "Access denied. You are not the owner of this facility.",
    );
  }

  if (booking.status === "CANCELLED") {
    throw new ApiError(
      409,
      "booking",
      "Cancelled bookings cannot be checked in.",
    );
  }

  if (booking.status === "COMPLETED") {
    throw new ApiError(
      409,
      "booking",
      "This booking has already been completed.",
    );
  }

  if (booking.checkedIn) {
    return res
      .status(200)
      .json(new ApiResponse(200, booking, "Already checked in."));
  }

  const dueDate = new Date(booking?.date);

  const isToday = todayCheck(dueDate);

  if (!isToday) {
    throw new ApiError(
      409,
      "booking",
      "Booking can only be checked in on the scheduled day.",
    );
  }

  // Use India's current time
  const now = dayjs().tz(APP_TIMEZONE);
  const minutesSinceMidnight = now.hour() * 60 + now.minute();

  const currentOngoingSlot = Math.floor(
    (minutesSinceMidnight - booking.facility.openingTime) /
      booking.facility.slotDuration,
  );

  if (currentOngoingSlot !== booking.slotIndex) {
    throw new ApiError(
      409,
      "booking",
      "Booking can only be checked in during the scheduled slot.",
    );
  }

  booking.checkedIn = true;
  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Checked in successfully."));
});

export {
  createBooking,
  getAllBookings,
  getFacilityBookings,
  getMyBookings,
  getSingleBooking,
  cancelBooking,
  checkIn,
};
