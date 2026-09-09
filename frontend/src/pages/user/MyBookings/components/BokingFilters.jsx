import { useEffect } from "react";
import { useMyBooking } from "../../../../contexts/MyBookingContext";

import { dayjs, APP_TIMEZONE } from "../../../../utils/dayjs";

function BookingFilters() {
  const { filters, setFilters } = useMyBooking();

  // Construct today's Indian calendar date
  const today = dayjs().tz(APP_TIMEZONE).format("YYYY-MM-DD");

  useEffect(() => setFilters({}), [setFilters]);

  const handleClick = (status) => {
    setFilters({
      status: status,
      date: undefined,
    });
  };

  const filterClass = (status) =>
    `self-start shrink-0 rounded-full px-3 py-1 text-md text-text transition-all ${
      (status !== undefined || filters?.date) && filters?.status === status
        ? "bg-primary"
        : "bg-primary/20 hover:bg-primary/30 hover:scale-102"
    }`;

  return (
    <div className="overflow-x-auto py-4 border-b border-border">
      <div className="flex flex-row justify-center-safe content-center gap-4">
        <span
          onClick={() =>
            setFilters((prev) => ({ ...prev, status: undefined, date: today }))
          }
          className={filterClass(undefined)}
        >
          Today
        </span>
        <span
          onClick={() => handleClick("BOOKED")}
          className={filterClass("BOOKED")}
        >
          Upcoming
        </span>
        <span
          onClick={() => handleClick("COMPLETED")}
          className={filterClass("COMPLETED")}
        >
          Completed
        </span>
        <span
          onClick={() => handleClick("CANCELLED")}
          className={filterClass("CANCELLED")}
        >
          Cancelled
        </span>
      </div>
    </div>
  );
}

export default BookingFilters;
