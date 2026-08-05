import {
  CalendarDays,
  Clock3,
  Users,
  MapPin,
  Trash2,
  Dumbbell,
} from "lucide-react";
import formatTime from "../../../../utils/formatTIme";
import formatDate from "../../../../utils/formatDate";

function BookingCard({ booking }) {
  const statusStyles = {
    BOOKED: "bg-green-300 text-green-700 border-green-200",
    TODAY: "bg-orange-300 text-orange-700 border-orange-200",
    COMPLETED: "bg-blue-300 text-blue-700 border-blue-200",
    CANCELLED: "bg-gray-300 text-gray-600 border-gray-200",
  };

  const startTime =
    booking?.facility?.openingTime +
    booking?.slotIndex * booking?.facility?.slotDuration;

  const canCancel = booking?.status === "BOOKED";

  return (
    <div className="w-full h-full rounded-2xl bg-card shadow-sm transition-all hover:shadow-md hover:scale-101">
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
        <p className="text-sm text-text-secondary text-center">
          Booked on <br /> {formatDate(booking?.createdAt)}
        </p>

        {canCancel ? (
          <button className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
            <Trash2 className="h-4 w-4" />
            Cancel Booking
          </button>
        ) : (
          <span className="text-sm text-muted-foreground">
            {booking?.status === "COMPLETED" ? "Completed" : "Cancelled"}
          </span>
        )}
      </div>
    </div>
  );
}

export default BookingCard;
