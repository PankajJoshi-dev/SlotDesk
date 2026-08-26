import { Link } from "react-router-dom";

import formatDate from "../../../../utils/formatDate";

function UpcomingBookings({ bookings, loading, isToday, getBookingTime }) {
  return (
    <section className="rounded-2xl border border-border-light bg-surface">
      <div className="border-b border-border-light px-5 py-4">
        <h2 className="font-semibold">Upcoming bookings</h2>
      </div>

      {loading ? (
        <p className="px-5 py-10 text-center text-sm text-text-secondary">
          Loading your bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-text-secondary">
          No upcoming bookings yet.
        </p>
      ) : (
        <div className="divide-y divide-border-light">
          {bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`/owner/facilities/${booking.facility?._id}/bookings`}
              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-card"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {booking.user?.fullName ?? "Guest"}
                </p>

                <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-text-secondary">
                  <span>{booking.facility?.name ?? "Facility"}</span>

                  <span className="text-text-muted">/</span>

                  <span>
                    {booking.partySize}{" "}
                    {booking.partySize === 1 ? "guest" : "guests"}
                  </span>
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-medium">
                  {isToday(booking.date) ? "Today" : formatDate(booking.date)}
                </p>

                <p className="mt-1 text-xs text-primary">
                  {getBookingTime(booking)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default UpcomingBookings;
