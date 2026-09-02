import Booking from "../models/booking.model.js";

const updatePendingBookings = async () => {
  const bookings = await Booking.find({ status: "PENDING" }).populate(
    "payment",
  );

  for (const booking of bookings) {
    if (!booking.payment) {
      continue;
    }

    const verificationStatus = booking.payment.verificationStatus;
    const paymentStatus = booking.payment.status;

    let bookingStatus;
    if (verificationStatus) {
      if (paymentStatus === "FAILED") {
        bookingStatus = "REJECTED";
      } else if (paymentStatus === "CONFIRMED") {
        bookingStatus = "BOOKED";
      } else {
        bookingStatus = "PENDING";
      }
    } else {
      if (paymentStatus === "FAILED") {
        bookingStatus = "REJECTED";
      } else if (paymentStatus === "CAPTURED") {
        bookingStatus = "REJECTED";
      } else {
        bookingStatus = "PENDING";
      }
    }

    await Booking.findByIdAndUpdate(
      booking._id,
      {
        $set: { status: bookingStatus },
      },
      { runValidators: true },
    );
  }

  console.log("Pending bookings updated successfully.");
};

const completeBookings = async () => {
  const bookings = await Booking.find({ status: "BOOKED" }).populate(
    "facility",
  );

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const now = new Date();
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();

  for (const booking of bookings) {
    if (!booking.facility) {
      continue;
    }

    const isToday = booking.date.getTime() == today.getTime();

    if (!isToday) {
      continue;
    }

    const slotStart =
      booking.facility.openingTime +
      booking.slotIndex * booking.facility.slotDuration;

    const slotEnd = slotStart + booking.facility.slotDuration;

    if (minutesSinceMidnight >= slotEnd) {
      await Booking.findByIdAndUpdate(
        booking._id,
        {
          $set: { status: "COMPLETED" },
        },
        { runValidators: true },
      );
    }
  }

  console.log("Bookings completed successfully.");
};

const cleanupRejectedBookings = async () => {
  const bookings = await Booking.find({ status: "REJECTED" }).populate(
    "payment",
  );

  for (const booking of bookings) {
    if (!booking.payment) {
      continue;
    }
    const paymentStatus = booking.payment.status;

    if (paymentStatus === "FAILED" || paymentStatus === "REFUNDED") {
      await Booking.findByIdAndDelete(booking._id);
    }
  }

  console.log("Rejected bookings deleted successfully.");
};

export { updatePendingBookings, completeBookings, cleanupRejectedBookings };
