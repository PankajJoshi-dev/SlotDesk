import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useHome } from "../../../contexts/HomeContext";
import { useMyBooking } from "../../../contexts/MyBookingContext";
import formatDate from "../../../utils/formatDate";
import BookingCard from "../MyBookings/components/BookingCard";
import Schedule from "./components/Schedule";
import { bookingRequest } from "../../../api/bookingApi";

function Home() {
  const { user } = useAuth();
  const {
    todayBookings,
    upcomingBookings,
    loading,
    getTodayBookings,
    getUpcomingBookings,
  } = useHome();
  const { setFilters } = useMyBooking();

  useEffect(() => {
    getTodayBookings();
    getUpcomingBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  const upcomingBookingCards = upcomingBookings.map((booking) => {
    return (
      <div key={booking?._id} className="min-w-80">
        <BookingCard booking={booking} />
      </div>
    );
  });

  return (
    <div className="m-4 space-y-6">
      <div className="flex flex-row justify-between items-center border-b border-border p-1">
        <h1 className="text-3xl font-medium text-center">
          Hi {user?.fullName.split(" ")[0]}
        </h1>
        <p>{formatDate(new Date())}</p>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Your Next Booking</h2>
          <div className="w-full max-h-70">
            <BookingCard booking={todayBookings[0]} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Today's Schedule</h2>
          <div className="w-full max-h-70 overflow-y-auto rounded-2xl bg-card transition-all hover:scale-101">
            <Schedule />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-medium">Upcoming Bookings</h2>
          <Link
            to="/bookings"
            onClick={() => setFilters({ status: "BOOKED" })}
            className="text-sm hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="flex flex-row overflow-x-auto gap-4 py-2">
          {upcomingBookingCards}
        </div>
      </div>
    </div>
  );
}

export default Home;
