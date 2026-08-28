import { CalendarDays, Clock3, Users, MapPin, CircleCheck } from "lucide-react";

import getFacilityIcon from "../../../../utils/FacilityIcons";
import formatTime from "../../../../utils/formatTIme";
import formatDate from "../../../../utils/formatDate";
import { useFacility } from "../../../../contexts/FacilityContext";

function BookingCard({ booking }) {
  const { checkIn, checkingIn } = useFacility();

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

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const slotActive = startTime <= currentTime && currentTime < endTime;
  const canCheckIn = booking.status === "BOOKED";

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

      <div className=" mt-4 md:mt-0 flex flex-row justify-between items-center">
        <p className="text-xs text-text-secondary py-2 lg:ml-14">
          Booked on {formatDate(booking?.createdAt)}
        </p>

        {booking?.checkedIn ? (
          <CircleCheck size={20} className="text-green-500" />
        ) : canCheckIn && slotActive ? (
          <button
            disabled={checkingIn}
            onClick={() => checkIn(booking._id)}
            className="flex items-center gap-2 rounded-lg border border-green-300 px-4 py-2 text-sm font-semibold text-green-500 transition-colors hover:bg-green-300 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check In
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default BookingCard;
