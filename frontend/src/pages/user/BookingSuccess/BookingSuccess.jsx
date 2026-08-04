import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Users,
  MapPin,
  CircleCheckBig,
} from "lucide-react";
import formatTime from "../../../utils/formatTIme";
import formatDate from "../../../utils/formatDate";

function BookingSuccess() {
  const navigate = useNavigate();

  const { state } = useLocation();

  const booking = state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate("/bookings", { replace: true });
    }
  }, [booking, navigate]);

  if (!booking) {
    return null;
  }

  const statusStyles = {
    BOOKED: "bg-green-300 text-green-700 border-green-200",
    TODAY: "bg-orange-300 text-orange-700 border-orange-200",
    COMPLETED: "bg-blue-300 text-blue-700 border-blue-200",
    CANCELLED: "bg-gray-300 text-gray-600 border-gray-200",
  };

  const startTime =
    booking?.facility?.openingTime +
    booking?.slotIndex * booking?.facility?.slotDuration;

  return (
    <div className="h-screen flex flex-col justify-start items-center gap-y-6 mt-24">
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <CircleCheckBig className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-center">Booking Confirmed!</h1>

        <p className="text-text-secondary text-center">
          Your booking has been successfully reserved.
        </p>
      </div>
      <div className="w-full max-w-xl rounded-2xl bg-card shadow-sm transition-all">
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {booking?.facility?.name}
            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{booking?.facility?.address?.city}</span>
            </div>
          </div>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[booking?.status]}`}
          >
            {booking?.status}
          </span>
        </div>

        <div className="space-y-4 border-y px-6 py-5">
          <div className="flex flex-wrap justify-between items-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{formatDate(booking?.date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary" />
              <span>{formatTime(startTime)}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>
                {booking?.partySize}{" "}
                {booking?.partySize === 1 ? "Person" : "People"}
              </span>
            </div>

            <span className="text-muted-foreground">
              • {booking?.facility?.slotDuration} min
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-3 p-6 items-center justify-between">
          <p className="w-full text-sm text-text-secondary text-center">
            Booked on {formatDate(booking?.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
        <button
          onClick={() => navigate("/bookings")}
          className="flex-1 rounded-xl border-border bg-card px-5 py-3 text-sm font-semibold text-text transition-all hover:opacity-90 hover:scale-101 active:scale-95"
        >
          View My Bookings
        </button>

        <button
          onClick={() => navigate("/facilities")}
          className="flex-1 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-text transition-all hover:opacity-90 hover:scale-101 active:scale-95"
        >
          Browse Facilities
        </button>
      </div>
    </div>
  );
}

export default BookingSuccess;
