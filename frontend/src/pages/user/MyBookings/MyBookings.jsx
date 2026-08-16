import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingCard from "./components/BookingCard";
import BookingFilters from "./components/BokingFilters";
import { useMyBooking } from "../../../contexts/MyBookingContext";

function MyBookings() {
  const { bookingId } = useParams();
  const { filters, setFilters, mybookings, loading, getMyBookings } =
    useMyBooking();

  // Fetch bookings whenever filters are changed
  useEffect(() => {
    getMyBookings();
  }, [filters]);

  useEffect(() => {
    if (!bookingId || !mybookings?.length) return;

    const element = document.getElementById(bookingId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [bookingId, mybookings]);

  useEffect(() => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    return () => {
      setFilters({
        status: "BOOKED",
      });
    };
  }, [setFilters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <p className="text-lg font-semibold uppercase tracking-[0.16em] text-primary mt-4">
        Your Bookings
      </p>

      <BookingFilters />

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
    </div>
  );
}

export default MyBookings;
