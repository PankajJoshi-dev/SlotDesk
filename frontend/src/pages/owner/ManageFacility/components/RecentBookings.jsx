import { Link } from "react-router-dom";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTIme";

function RecentBoookings({ facilityId, activeBookings, loading }) {
  const getBookingTime = (booking) => {
    const facility = booking.facility;
    if (!facility) return "Time unavailable";

    return formatTime(
      facility.openingTime + booking.slotIndex * facility.slotDuration,
    );
  };

  return (
    <section className="rounded-2xl border border-border-light bg-surface">
      <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
        <h2 className="font-semibold">Recent bookings</h2>
        <Link
          to={`/owner/facilities/${facilityId}/bookings`}
          className="text-sm text-primary hover:text-primary-hover"
        >
          View all
        </Link>
      </div>
      {!loading && activeBookings.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-text-secondary">
          No bookings yet.
        </p>
      ) : loading ? (
        <p className="px-5 py-10 text-center text-sm text-text-secondary">
          Loading Bookings...
        </p>
      ) : (
        <div className="divide-y divide-border-light">
          {activeBookings.slice(0, 5).map((booking) => (
            <div
              key={booking._id}
              className="flex items-center justify-between gap-3 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {booking.user?.fullName ?? "Guest"}
                </p>
                <p className="mt-1 truncate text-xs font-medium text-primary">
                  {booking.bookingId}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  {booking.partySize}{" "}
                  {booking.partySize === 1 ? "guest" : "guests"}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm">{formatDate(booking.date)}</p>
                <p className="mt-1 text-xs text-primary">
                  {getBookingTime(booking)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentBoookings;
