import React, { useEffect } from "react";
import BookingCard from "./components/BookingCard";
import BookingFilters from "./components/BokingFilters";
import { useMyBooking } from "../../../contexts/MyBookingContext";

function MyBookings() {
  const { filters, mybookings, loading, getMyBookings } = useMyBooking();

  // Fetch bookings whenever the selected filter changes.
  useEffect(() => {
    getMyBookings();
  }, [filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold m-4">Your Bookings</h1>

      <BookingFilters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 mx-4">
        {mybookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
