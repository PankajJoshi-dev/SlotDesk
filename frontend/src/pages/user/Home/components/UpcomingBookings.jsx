import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Users } from "lucide-react";
import getFacilityIcon from "../../../../utils/FacilityIcons";
import formatTime from "../../../../utils/formatTIme";

function UpcomingBookings({ bookings }) {
  const statusStyles = {
    BOOKED: "bg-green-300 text-green-700 border-green-200",
    TODAY: "bg-orange-300 text-orange-700 border-orange-200",
    COMPLETED: "bg-blue-300 text-blue-700 border-blue-200",
    CANCELLED: "bg-gray-300 text-gray-600 border-gray-200",
  };

  if (bookings.length === 0) {
    return (
      <section className="border-t border-border-light pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Upcoming bookings
        </p>

        <div className="py-10 text-center">
          <p className="text-sm font-medium">No other upcoming bookings</p>

          <p className="mt-1 text-sm text-text-secondary">
            Your next booking is shown above.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border-light pt-8">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Upcoming bookings
        </p>

        <Link
          to="/bookings"
          className="group flex items-center gap-1 text-sm font-medium text-primary"
        >
          View all
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="mt-5">
        {/* Desktop header */}
        <div className="hidden sm:grid sm:grid-cols-[0.25fr_2fr_1.5fr_1fr_0.5fr] gap-4 border-b border-border-light px-3 pb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
          <span>Date</span>
          <span>Facility</span>
          <span>Time</span>
          <span>People</span>
          <span>Status</span>
        </div>

        {bookings.map((booking) => {
          const Icon = getFacilityIcon(booking);
          const startTime =
            booking.facility.openingTime +
            booking.slotIndex * booking.facility.slotDuration;
          const endTime = startTime + booking.facility.slotDuration;

          return (
            <Link
              key={booking._id}
              to={`/bookings/${booking._id}`}
              className="group grid gap-4 border-b border-border-light px-3 py-5 transition hover:bg-card/60 grid-cols-2 sm:grid-cols-[0.25fr_2fr_1.5fr_1fr_0.5fr] items-center"
            >
              {/* Date */}
              <div>
                <p className="font-semibold">
                  {new Date(booking.date).getDate()}
                </p>

                <p className="text-xs uppercase text-primary">
                  {new Date(booking.date).toLocaleDateString("en-IN", {
                    month: "short",
                  })}
                </p>
              </div>

              {/* Facility */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={19} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {booking.facility.name}
                  </p>

                  <p className="truncate text-sm text-text-secondary">
                    {booking.facility.address?.city}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 text-sm">
                <Clock3 size={16} className="text-primary" />
                <span>
                  {formatTime(startTime)} – {formatTime(endTime)}
                </span>
              </div>

              {/* People */}
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-primary" />
                <span>
                  {booking.partySize}{" "}
                  {booking.partySize === 1 ? "Person" : "People"}
                </span>
              </div>

              {/* Status */}
              <span
                className={`rounded-full self-start ml-0 mr-auto border px-3 py-1 text-xs font-semibold ${statusStyles[booking?.status]}`}
              >
                {booking?.status}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default UpcomingBookings;
