import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import getFacilityIcon from "../../../../utils/FacilityIcons";
import formatDate from "../../../../utils/formatDate";
import formatTime from "../../../../utils/formatTime";

function NextBooking({ booking, isHomeReady }) {
  if (isHomeReady && !booking) {
    return (
      <div className="rounded-2xl border border-border-light bg-card p-8 min-h-80">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Your next booking
        </p>

        <div className="mt-8 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CalendarDays size={25} />
          </div>

          <h2 className="mt-5 text-xl font-semibold">No upcoming bookings</h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">
            Find a facility and book a time that works for you.
          </p>

          <Link
            to="/facilities"
            className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/60 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-text"
          >
            Browse Facilities
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    );
  }

  const Icon =
    (isHomeReady && getFacilityIcon(booking?.facility?.category)) || Building2;

  let startTime = "-";
  let endTime = "-";

  if (isHomeReady && booking?.facility) {
    const rawStart =
      booking.facility.openingTime +
      (booking.slotIndex || 0) * (booking.facility.slotDuration || 0);
    const rawEnd = rawStart + (booking.facility.slotDuration || 0);

    startTime = formatTime(rawStart);
    endTime = formatTime(rawEnd);
  }

  return (
    <div className="rounded-2xl border border-border-light bg-card p-6 min-h-80">
      <div className="flex items-center justify-between border-b border-border-light pb-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Your next booking
        </p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <CalendarDays size={20} />
        </div>
      </div>

      <div className="mt-2 rounded-xl border border-border-light bg-surface p-5">
        <div className="mt-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold">
              {isHomeReady ? booking?.facility?.name : "-"}
            </h2>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary">
              <MapPin size={15} />
              <span className="truncate">
                {isHomeReady ? booking?.facility?.address?.city : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-border-light pt-4">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-primary" />
              <span>
                {isHomeReady && booking?.date ? formatDate(booking.date) : "-"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} className="text-primary" />
              <span>
                {startTime} - {endTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} className="text-primary" />
              <span>
                {isHomeReady && booking?.partySize
                  ? `${booking.partySize} ${booking.partySize === 1 ? "Person" : "People"}`
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <Link
          to={isHomeReady && booking?._id ? `/bookings/${booking._id}` : "#"}
          className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          View booking
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

export default NextBooking;
