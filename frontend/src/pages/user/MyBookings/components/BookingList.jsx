import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useMyBooking } from "../../../../contexts/MyBookingContext";

import BookingCard from "./BookingCard";

function BookingList() {
  const { bookingId } = useParams();

  const { filters, getMyBookings, loading, mybookings } = useMyBooking();

  // Fetch bookings whenever filters are changed
  useEffect(() => {
    getMyBookings();
  }, [filters]);

  // Scroll into view
  useEffect(() => {
    if (!bookingId || !mybookings?.length) return;

    const element = document.getElementById(bookingId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [bookingId, mybookings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 my-6 mx-4">
      {mybookings.map((booking) => {
        const isSelected = booking._id === bookingId;

        return (
          <div
            key={booking._id}
            id={booking._id}
            className={isSelected ? "ring-2 ring-primary rounded-2xl" : ""}
          >
            <BookingCard booking={booking} />
          </div>
        );
      })}
    </div>
  );
}

export default BookingList;
