import { CalendarDays, Clock3, Users, MapPin, Trash2 } from "lucide-react";

import getFacilityIcon from "../../../../utils/FacilityIcons";
import formatTime from "../../../../utils/formatTIme";
import formatDate from "../../../../utils/formatDate";

import { useMyBooking } from "../../../../contexts/MyBookingContext";

function BookingCard({ booking }) {
  const { cancelBooking, cancellingBookingId } = useMyBooking();

  const statusStyles = {
    BOOKED: "bg-green-300 text-green-700 border-green-200",
    COMPLETED: "bg-blue-300 text-blue-700 border-blue-200",
    CANCELLED: "bg-gray-300 text-gray-600 border-gray-200",
  };

  const Icon = getFacilityIcon(booking?.facility?.category);

  const startTime =
    booking?.facility?.openingTime +
    booking?.slotIndex * booking?.facility?.slotDuration;

  const endTime = startTime + booking?.facility?.slotDuration;

  const bookingDate = new Date(booking?.date);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const isToday = bookingDate.getTime() === today.getTime();
  const isFutureDate = bookingDate.getTime() > today.getTime();

  const canCancel =
    booking?.status === "BOOKED" &&
    !booking.checkedIn &&
    (isFutureDate || (isToday && currentTime < startTime - 30));
  const isCancelling = cancellingBookingId === booking?._id;

  return (
    <div className="w-full rounded-2xl bg-card px-6 py-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-foreground">
              {booking?.facility?.name}
            </h2>

            <p className="mt-1 text-xs font-medium text-text-secondary">
              Booking ID: {booking?.bookingId}
            </p>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{booking?.facility?.address?.city}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-start gap-5">
          <div className="flex flex-wrap flex-row sm:justify-start gap-5">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{formatDate(booking?.date)}</span>
            </div>

            <div className="flex  items-center gap-2 text-sm">
              <Clock3 className="h-4 w-4 text-primary" />
              <span>
                {formatTime(startTime)} – {formatTime(endTime)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap flex-row justify-start gap-5">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>
                {booking?.partySize}{" "}
                {booking?.partySize === 1 ? "Person" : "People"}
              </span>
            </div>

            <span
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[booking?.status]}`}
            >
              {booking?.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex items-center justify-between ">
        <p className="text-xs text-text-secondary py-2 lg:ml-14">
          Booked on {formatDate(booking?.createdAt)}
        </p>

        {canCancel && (
          <button
            type="button"
            disabled={isCancelling}
            className="flex items-center gap-2 rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-400 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => cancelBooking(booking._id)}
          >
            <Trash2 className="h-4 w-4" />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;
