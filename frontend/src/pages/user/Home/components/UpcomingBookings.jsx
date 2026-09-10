import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Users } from "lucide-react";
import getFacilityIcon from "../../../../utils/FacilityIcons";
import formatTime from "../../../../utils/formatTime";

function UpcomingBookings({ bookings }) {
  if (bookings.length === 0) {
    return (
      <section className="border-t border-border-light pt-8 min-h-50">
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
    <section className="border-t border-border-light pt-8 min-h-50">
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
        <div className="hidden sm:grid sm:grid-cols-[0.25fr_2fr_1.5fr_1fr] gap-4 border-b border-border-light px-3 pb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
          <span>Date</span>
          <span>Facility</span>
          <span>Time</span>
          <span>People</span>
        </div>

        {bookings.map((booking) => {
          const Icon = getFacilityIcon(booking?.facility?.category);
          const startTime =
            booking.facility.openingTime +
            booking.slotIndex * booking.facility.slotDuration;
          const endTime = startTime + booking.facility.slotDuration;

          return (
            <Link
              key={booking._id}
              to={`/bookings/${booking._id}`}
              className="group grid gap-4 border-b border-border-light px-3 py-5 transition hover:bg-card/60 grid-cols-2 sm:grid-cols-[0.25fr_2fr_1.5fr_1fr] items-center"
            >
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

              <div className="flex items-center gap-2 text-sm">
                <Clock3 size={16} className="text-primary" />
                <span>
                  {formatTime(startTime)} – {formatTime(endTime)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-primary" />
                <span>
                  {booking.partySize}{" "}
                  {booking.partySize === 1 ? "Person" : "People"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default UpcomingBookings;
