import {
  CalendarDays,
  Clock3,
  Users,
  CircleCheck,
  Repeat,
  Mail,
  IndianRupee,
} from "lucide-react";

import formatTime from "../../../../utils/formatTime";
import formatDate from "../../../../utils/formatDate";

import { useFacility } from "../../../../contexts/FacilityContext";

function OwnerBookingCard({ booking }) {
  const { checkingInBookingId, checkIn, refundBookingId, refund } =
    useFacility();

  const statusStyles = {
    BOOKED: "bg-green-300 text-green-700 border-green-200",
    COMPLETED: "bg-blue-300 text-blue-700 border-blue-200",
    CANCELLED: "bg-gray-300 text-gray-600 border-gray-200",
  };

  const paymentStatusStyles = {
    CONFIRMED: "text-green-400",
    FAILED: "text-red-400",
    REFUNDING: "text-amber-400",
    REFUNDED: "text-blue-400",
  };

  const slotDuration = booking?.facility?.slotDuration || 0;
  const openingTime = booking?.facility?.openingTime || 0;
  const startTime = openingTime + (booking?.slotIndex || 0) * slotDuration;
  const endTime = startTime + slotDuration;

  const bookingDate = new Date(booking?.date);
  bookingDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = bookingDate.getTime() === today.getTime();

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const slotActive =
    isToday && startTime <= currentTime && currentTime < endTime;

  const canCheckIn = booking?.status === "BOOKED";
  const isCheckingIn = checkingInBookingId === booking?._id;

  const canRefund =
    booking?.status === "CANCELLED" && booking?.payment?.status === "CONFIRMED";

  const isRefunding =
    refundBookingId === booking?._id ||
    booking?.payment?.status === "REFUNDING";

  return (
    <div className="relative w-full rounded-2xl bg-card p-5 shadow-sm hover:shadow-md">
      <span
        className={`absolute top-5 right-5 min-w-24 rounded-full border px-3 py-1.5 text-center text-xs font-semibold ${statusStyles[booking?.status] || "bg-gray-300 text-gray-600 border-gray-200"}`}
      >
        {booking?.status}
      </span>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1 pr-28 lg:pr-0">
          <h2 className="truncate text-lg font-semibold">
            {booking?.user?.fullName}
          </h2>

          <div className="mt-1 flex items-center gap-2 text-sm text-text-secondary">
            <Mail className="h-4 w-4" />
            <span className="truncate">{booking?.user?.email}</span>
          </div>

          <p className="mt-2 text-xs text-text-muted">
            Booking ID: {booking?.bookingId}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-5 md:flex-row">
          <div className="flex flex-wrap gap-5">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{formatDate(booking?.date)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock3 className="h-4 w-4 text-primary" />
              <span>
                {formatTime(startTime)} – {formatTime(endTime)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>
                {booking?.partySize}{" "}
                {booking?.partySize === 1 ? "Person" : "People"}
              </span>
            </div>

            {booking?.payment?.status && (
              <div className="flex items-center gap-2 text-sm">
                <IndianRupee className="h-4 w-4 text-primary" />
                <span>{booking?.payment?.amount}</span>
                <span
                  className={`text-xs font-semibold ${paymentStatusStyles[booking?.payment?.status] || ""}`}
                >
                  {booking?.payment?.status === "CONFIRMED"
                    ? "PAID"
                    : booking?.payment?.status}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-text-muted">
          Booked on {formatDate(booking?.createdAt)}
        </p>

        {booking?.checkedIn ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-green-500">
            <CircleCheck className="h-5 w-5" />
            Checked In
          </div>
        ) : canCheckIn && slotActive ? (
          <button
            type="button"
            disabled={isCheckingIn}
            onClick={() => checkIn(booking?._id)}
            className="flex items-center gap-2 rounded-lg border border-green-300 px-4 py-2 text-sm font-semibold text-green-500 hover:bg-green-300 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCheckingIn ? "Checking In..." : "Check In"}
          </button>
        ) : canRefund || isRefunding ? (
          <button
            type="button"
            disabled={isRefunding}
            onClick={() => refund(booking?._id)}
            className="flex items-center gap-2 rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-400 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRefunding ? (
              "Refunding..."
            ) : (
              <>
                <Repeat className="h-4 w-4" />
                Refund
              </>
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default OwnerBookingCard;
