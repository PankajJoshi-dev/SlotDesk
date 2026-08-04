import React, { useEffect, useState } from "react";
import { useMyBooking } from "../../../../contexts/MyBookingContext";

function BookingFilters() {
  const { filters, setFilters } = useMyBooking();

  const handleClick = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: status,
    }));
  };

  const filterClass = (status) =>
    `self-start shrink-0 rounded-full px-3 py-1 text-md text-text transition-all ${
      filters.status === status
        ? "bg-primary"
        : "bg-primary/20 hover:bg-primary/30 hover:scale-102"
    }`;

  return (
    <div className="overflow-x-auto mx-4 p-4 border-b border-border">
      <div className="flex flex-row justify-start content-center gap-4">
        <span
          onClick={() => handleClick(undefined)}
          className={filterClass(undefined)}
        >
          All
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
