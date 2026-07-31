import React from "react";
import { useBooking } from "../../../../contexts/BookingContext";

function DateSelector() {
  const { bookingDate, setBookingDate } = useBooking();

  const dates = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generates 9 next dates from today
  for (let i = 0; i < 10; i++) {
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
        className={`shrink-0 rounded-xl border p-3 transition-all cursor-pointer ${isSelected ? "bg-primary/20 border-primary" : "bg-card hover:bg-card/80"}`}
      >
        <p className="text-xs font-semibold">{day}</p>
        <p className="mt-1 text-lg font-bold">{monthDay}</p>
      </button>
    );
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Select Date</h1>
      <div className="w-full grid grid-cols-5 gap-2">{dateCard}</div>
    </>
  );
}

export default DateSelector;
