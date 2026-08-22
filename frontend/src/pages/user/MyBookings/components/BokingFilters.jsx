import { useEffect } from "react";
import { useMyBooking } from "../../../../contexts/MyBookingContext";

function BookingFilters() {
  const { filters, setFilters } = useMyBooking();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  useEffect(() => {
    return () => {
      setFilters({
        status: "BOOKED",
      });
    };
  }, [setFilters]);

  const handleClick = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: status,
      date: undefined,
    }));
  };

  const filterClass = (status) =>
    `self-start shrink-0 rounded-full px-3 py-1 text-md text-text transition-all ${
      filters?.status === status
        ? "bg-primary"
        : "bg-primary/20 hover:bg-primary/30 hover:scale-102"
    }`;

  return (
    <div className="overflow-x-auto mx-4 p-4 border-b border-border">
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
