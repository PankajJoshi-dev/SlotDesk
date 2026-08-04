import React from "react";
import BookingCard from "./components/BookingCard";
import { useMyBooking } from "../../../contexts/MyBookingContext";
import BookingFilters from "./components/BokingFilters";

function MyBookings() {
  const { mybookings, loading } = useMyBooking();

  const bookingCards = mybookings.map((booking) => {
    return <BookingCard key={booking?._id} booking={booking} />;
  });

  return (
    <div>
      <h1 className="text-xl font-semibold m-4">Your Bookings</h1>
      <BookingFilters />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 mx-4">
        {bookingCards}
      </div>
    </div>
  );
}

export default MyBookings;
