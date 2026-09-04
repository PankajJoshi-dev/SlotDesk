import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

function TodaySchedule({ bookings, isHomeReady }) {
  const statusStyles = {
    BOOKED: "bg-green-300 text-green-700 border-green-200",
    COMPLETED: "bg-blue-300 text-blue-700 border-blue-200",
    CANCELLED: "bg-gray-300 text-gray-600 border-gray-200",
  };

  return (
    <div className="rounded-2xl border border-border-light bg-card p-6 max-h-80 overflow-y-auto min-h-80">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Today's schedule
          </p>

          <p className="mt-1 text-sm text-text-secondary">
            {formatDate(new Date())}
          </p>
        </div>

        {isHomeReady && bookings.length > 0 && (
          <Link
            to="/bookings"
            className="group hidden items-center gap-1 text-sm font-medium text-primary sm:flex"
          >
            View full day
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>
      {!isHomeReady ? (
        <p className="py-10 text-center text-sm text-text-secondary">
          Loading...
        </p>
      ) : bookings.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center text-center">
          <p className="text-sm font-medium">No bookings scheduled today</p>
          <p className="mt-1 text-sm text-text-secondary">
            You're all clear for today.
          </p>
        </div>
      ) : (
        <div className="mt-2">
          {bookings.map((booking, index) => {
            const startTime =
              booking.facility.openingTime +
              booking.slotIndex * booking.facility.slotDuration;
            const endTime = startTime + booking.facility.slotDuration;

            return (
              <div
                key={booking._id}
                className={`flex gap-4 py-4 ${
                  index !== bookings.length - 1
                    ? "border-b border-border-light"
                    : ""
                }`}
              >
                <div className="w-20 text-sm font-medium">
                  <p>{formatTime(startTime)}</p>
                  <p className="text-sm text-text-secondary">
                    &nbsp;&nbsp;-{formatTime(endTime)}
                  </p>
                </div>

                <div className="relative min-w-0 flex-1 border-l border-border-light pl-5">
                  <span className="absolute -left-1.5 top-1 h-2.5 w-2.5 rounded-full bg-primary" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold truncate">
                        {booking.facility.name}
                      </p>

                      <p className="mt-1 truncate text-sm text-text-secondary">
                        {booking.facility.address?.city} · {booking.partySize}{" "}
                        {booking.partySize === 1 ? "Person" : "People"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[booking?.status]}`}
                    >
                      {booking?.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TodaySchedule;
