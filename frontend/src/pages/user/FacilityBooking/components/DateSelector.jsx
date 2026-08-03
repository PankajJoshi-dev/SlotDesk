import React from "react";
import { useBooking } from "../../../../contexts/BookingContext";

function DateSelector() {
  const { bookingDate, setBookingDate, errors } = useBooking();

  const dates = [];

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Generates 6 next dates from today
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  const dateCard = dates.map((date, idx) => {
    const day =
      idx === 0
        ? "TODAY"
        : date.toLocaleDateString("en-IN", { weekday: "short" }).toUpperCase();

    const monthDay = date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });

    const isSelected = bookingDate && date.getTime() === bookingDate.getTime();

    return (
      <button
        key={date.toISOString()}
        onClick={() => setBookingDate(date)}
        className={`shrink-0 rounded-xl border p-3 transition-all cursor-pointer
  ${
    isSelected
      ? errors?.date
        ? "border-red-500 bg-red-500"
        : "bg-primary/20 text-primary-foreground border-primary"
      : "bg-card hover:bg-card/80 border-border"
  }`}
      >
        <p className="text-xs font-semibold">{day}</p>
        <p className="mt-1 text-xs font-bold">{monthDay}</p>
      </button>
    );
  });

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-bold">Select Date</h1>

      <div className="w-full grid grid-cols-4 lg:grid-cols-7 gap-2">
        {dateCard}
      </div>

      {errors?.date && <p className="text-sm text-error">{errors.date}</p>}
    </div>
  );
}

export default DateSelector;
